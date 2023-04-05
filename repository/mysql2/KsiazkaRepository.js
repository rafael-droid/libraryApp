const db = require('../../config/mysql2/db');
const ksiazkaSchema = require("../../model/joi/Ksiazka");

exports.getKsiazka = () => {
    const query =`Select Ksiazka._id as ksiaId, Ksiazka.tytul, Ksiazka.wydawnictwo, Ksiazka.dziedzina, 
                Autor._id as autId, Autor.imie as autImie, Autor.nazwisko as autNazwisko 
                From Ksiazka 
                Left JOIN Autor ON Ksiazka.autor_id = Autor._id; `;
    return db.promise().query(query)
        .then( (results, fields) => {
            const ksiazki = [];
            for( let i=0; i<results[0].length; i++){
                const row = results[0][i];
                const ksiazka = {
                    _id: row.ksiaId,
                    tytul: row.tytul,
                    autor: {
                        _id: row.autId,
                        imie: row.autImie,
                        nazwisko: row.autNazwisko
                    },
                };
                ksiazki.push(ksiazka);
            }
            console.log(ksiazki);
            return ksiazki;
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};
exports.getKsiazkaId = (ksiazkaId) => {
        const query = `Select Ksiazka._id, Ksiazka.tytul, Ksiazka.wydawnictwo, Ksiazka.dziedzina,
        Autor._id as autId, Autor.imie as autImie, Autor.nazwisko as autNazwisko,
        Czytelnik._id as czytId, Czytelnik.imie as czytImie, Czytelnik.nazwisko as czytNazwisko, Czytelnik.numerTel,
        Wypozyczenie._id as wypoId, Wypozyczenie.data_wypozyczenia, Wypozyczenie.data_zwrotu
        From Ksiazka
        Left JOIN Wypozyczenie ON Ksiazka._id = Wypozyczenie.ksiazka_id
        Left JOIN Autor ON  Ksiazka.autor_id = Autor._id 
        Left JOIN Czytelnik On Czytelnik._id = Wypozyczenie.czytelnik_id
        Where Ksiazka._id = ?`
    return db.promise().query(query, [ksiazkaId])
        .then( (result, fields) => {
            const row = result[0][0];
            if(!row){
                return {};
            }
            const ksiazka = {
                _id: parseInt(ksiazkaId),
                tytul: row.tytul,
                autor: {
                    _id: row.autId,
                    imie: row.autImie,
                    nazwisko: row.autNazwisko
                },
                wydawnictwo: row.wydawnictwo,
                dziedzina: row.dziedzina,
                wypozyczenia: []
            }
            for(let i=0; i<result[0].length; i++) {
                const row = result[0][i];
                if (row.wypoId) {
                    const wypozyczenie= {
                        _id: row.wypoId,
                        czytelnik:{
                            _id: row.czytId,
                            imie: row.czytImie,
                            nazwisko: row.czytNazwisko,
                            numerTel: row.numerTel
                        },
                        data_wypozyczenia: row.data_wypozyczenia,
                        data_zwrotu: row.data_zwrotu
                    }
                    ksiazka.wypozyczenia.push(wypozyczenie);
                }
            }

            console.log(ksiazka);
            return ksiazka;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};
exports.createKsiazka = (newKsiazkaData) => {
    const vRes = ksiazkaSchema.validate(newKsiazkaData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    console.log('ksiazka-----------------');
    console.log(newKsiazkaData);
    const tytul = newKsiazkaData.tytul;
    const autor_id = newKsiazkaData.autor;
    const wydawnictwo = newKsiazkaData.wydawnictwo;
    const dziedzina = newKsiazkaData.dziedzina;
    const sql = 'INSERT into Ksiazka (tytul, autor_id, wydawnictwo, dziedzina) VALUES (?, ?, ?, ?)'

    return db.promise().execute(sql, [tytul, autor_id, wydawnictwo, dziedzina]);
};
exports.updateKsiazka = (ksiazkaId, ksiazkaData) => {
    const tytul = ksiazkaData.tytul;
    const autor_id = ksiazkaData.autor;
    const wydawnictwo = ksiazkaData.wydawnictwo;
    const dziedzina = ksiazkaData.dziedzina;
    const sql = 'UPDATE Ksiazka set tytul= ?, autor_id = ?,  wydawnictwo= ?, dziedzina = ? where _id = ?';
    return db.promise().execute(sql, [tytul, autor_id, wydawnictwo, dziedzina, ksiazkaId])
};
exports.deleteKsiazka = (ksiazkaId) => {
    const sql1 = 'Delete from Ksiazka where _id = ?'
    const sql2 = 'Delete from Wypozyczenie where ksiazka_id = ?'

    return db.promise().execute(sql2, [ksiazkaId])
        .then(() => {
            db.promise().execute(sql1, [ksiazkaId]);
        })
};