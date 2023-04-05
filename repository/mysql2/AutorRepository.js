const db = require('../../config/mysql2/db');
const autorSchema = require('../../model/joi/Autor');

exports.getAutor = () => {
    const query = `Select * from Autor`;
    return db.promise().query(query)
        .then( (results, fields) => {
                    console.log(results[0]);
                    return results[0];
                })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};
exports.getAutorById = (autorId) => {
    const query = `Select Autor._id, Autor.imie, Autor.nazwisko,
                       Ksiazka._id as ksiaId, Ksiazka.tytul, Ksiazka.wydawnictwo, Ksiazka.dziedzina,
                       Wypozyczenie._id as wypoId, Wypozyczenie.data_wypozyczenia, Wypozyczenie.data_zwrotu,
                       Czytelnik._id as czytId, Czytelnik.imie as czytImie, Czytelnik.nazwisko as czytNazwisko
                   From Ksiazka
                       Left Join Autor
                   ON Autor._id = Ksiazka.autor_id
                       Left Join Wypozyczenie ON Ksiazka._id = Wypozyczenie.ksiazka_id
                       Left Join Czytelnik ON Wypozyczenie.czytelnik_id = Czytelnik._id
                   Where autor_id = ?`

    return db.promise().query(query, [autorId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow){
                return{};
            }
            const autor = {
                _id: parseInt(autorId),
                imie: firstRow.imie,
                nazwisko: firstRow.nazwisko,
                wypozyczenia: []
            }
            for( let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                if (row.wypoId) {
                    const wypozyczenie = {
                            _id: row.wypoId,
                            data_wypozyczenia: row.data_wypozyczenia,
                            data_zwrotu: row.data_zwrotu,
                            ksiazki: {
                            _id: row.ksiaId,
                            tytul: row.tytul,
                            wydawnictwo: row.wydawnictwo,
                            dziedzina: row.dziedzina
                            },
                            czytelnik:{
                            _id: row.czytId,
                            imie: row.czytImie,
                            nazwisko: row.czytNazwisko
                        }

                    }
                    autor.wypozyczenia.push(wypozyczenie);
                }
                ;
            }
            console.log(autor);
            return autor;
        })
        .catch(err => {
            console.log(err);
            return err;
        });


};
exports.createAutor = (newAutorData) => {
    const vRes = autorSchema.validate(newAutorData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    const imie = newAutorData.imie;
    const nazwisko = newAutorData.nazwisko;
    const sql = 'INSERT into Autor (imie, nazwisko) VALUES (?, ?)'

    return db.promise().execute(sql, [imie, nazwisko]);
};
exports.updateAutor = (autorId, autorData) => {
    const vRes = autorSchema.validate(autorData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    const imie = autorData.imie;
    const nazwisko = autorData.nazwisko;
    const sql = 'UPDATE Autor set imie = ?, nazwisko = ? where _id = ?';
    return db.promise().execute(sql, [imie, nazwisko, autorId])
};
exports.deleteAutor = (autorId) => {
    const sql1 = 'DELETE from Ksiazka where autor_id = ?';
    const sql2 = 'DELETE from Autor where _id = ?';

    return db.promise().execute(sql1, [autorId])
        .then(() => {
            return db.promise().execute(sql2, [autorId])
        });
};