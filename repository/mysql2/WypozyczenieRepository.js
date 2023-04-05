const db = require('../../config/mysql2/db');
const wypozyczenieSchema = require("../../model/joi/Wypozyczenie");

exports.getWypozyczenie = () => {
    const query = `Select Wypozyczenie._id as wypoId, Wypozyczenie.data_wypozyczenia, Wypozyczenie.data_zwrotu,
        Czytelnik._id as czytId, Czytelnik.imie, Czytelnik.nazwisko, Czytelnik.numerTel, Czytelnik.email,
        Ksiazka._id as ksiaId, Ksiazka.tytul, Ksiazka.wydawnictwo, Ksiazka.dziedzina,
        Autor._id as autId, Autor.imie as autImie, Autor.nazwisko as autNazwisko
        From Wypozyczenie
        Left Join Czytelnik On Czytelnik._id = Wypozyczenie.czytelnik_id
        Left Join Ksiazka On Ksiazka._id = Wypozyczenie.ksiazka_id
        Left Join Autor On Autor._id = Ksiazka.autor_id`;
    return db.promise().query(query)
        .then( (results, fields) => {

            const wypozyczenia = [];

            for( let i=0; i<results[0].length; i++){
                const row = results[0][i];
                const wypozyczenie = {
                    _id: row.wypoId,
                    ksiazka: {
                        _id: row.ksiaId,
                        tytul: row.tytul,
                        autor: {
                            _id: row.autId,
                            imie: row.autImie,
                            nazwisko: row.autNazwisko
                        },
                        wydawnictwo: row.wydawnictwo,
                        dziedzina: row.dziedzina
                    },
                    czytelnik: {
                        _id: row.czytId,
                        imie: row.imie,
                        nazwisko: row.nazwisko,
                        numerTel: row.numerTel,
                        email: row.email
                    },
                    data_wypozyczenia: row.data_wypozyczenia,
                    data_zwrotu: row.data_zwrotu,
                    }
                wypozyczenia.push(wypozyczenie);
            }

            console.log(wypozyczenia);
            return wypozyczenia

        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};
exports.getWypozyczenieId = (wypozyczenieId) => {
    const query = `Select Wypozyczenie._id, Wypozyczenie.data_wypozyczenia, Wypozyczenie.data_zwrotu,
        Czytelnik._id as czytId, Czytelnik.imie, Czytelnik.nazwisko, Czytelnik.numerTel, Czytelnik.email,
        Ksiazka._id as ksiaId, Ksiazka.tytul, Ksiazka.wydawnictwo, Ksiazka.dziedzina,
        Autor._id as autId, Autor.imie as autImie, Autor.nazwisko as autNazwisko
        From Wypozyczenie
        Left Join Czytelnik On Czytelnik._id = Wypozyczenie.czytelnik_id
        Left Join Ksiazka On Ksiazka._id = Wypozyczenie.ksiazka_id
        Left Join Autor On Autor._id = Ksiazka.autor_id
        Where Wypozyczenie._id = ?`

    return db.promise().query(query, [wypozyczenieId])
        .then((results, fields) => {
            const row = results[0][0];
            if(!row){
                return {};
            }
            const wypozyczenie = {
                _id: parseInt(wypozyczenieId),
                ksiazka: {
                    _id: row.ksiaId,
                    tytul: row.tytul,
                    wydawnictwo: row.wydawnictwo,
                    dziedzina: row.dziedzina,
                    autor: {
                        _id: row.autId,
                        imie: row.autImie,
                        nazwisko: row.autNazwisko
                    }
                },
                czytelnik: {
                    _id: row.czytId,
                    imie: row.imie,
                    nazwisko: row.nazwisko,
                    numerTel: row.numerTel,
                    email: row.email
                },
                data_wypozyczenia: row.data_wypozyczenia,
                data_zwrotu: row.data_zwrotu,

            };
            console.log(wypozyczenie);
            return wypozyczenie;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};
exports.createWypozyczenie = (newWypozeczenieData) => {
    const vRes = wypozyczenieSchema.validate(newWypozeczenieData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    console.log('wypo-----------------');
    console.log(newWypozeczenieData);
    const czytelnik_id = newWypozeczenieData.czytelnik;
    const ksiazka_id = newWypozeczenieData.ksiazka;
    const data_wypozyczenia = newWypozeczenieData.data_wypozyczenia;
    let data_zwrotu = newWypozeczenieData.data_zwrotu;
    if(data_zwrotu === ''){
        data_zwrotu = null;
    }
    const sql = 'INSERT into Wypozyczenie (czytelnik_id, ksiazka_id, data_wypozyczenia, data_zwrotu) VALUES (?, ?, ?, ?)'

    return db.promise().execute(sql, [czytelnik_id, ksiazka_id, data_wypozyczenia, data_zwrotu]);
};
exports.updateWypozyczenie = (wypozeczenieId, wypozeczenieData) => {
    const vRes = wypozyczenieSchema.validate(wypozeczenieData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    console.log('wypo-----------------');
    console.log(wypozeczenieData);
    const czytelnik_id = wypozeczenieData.czytelnik;
    const ksiazka_id = wypozeczenieData.ksiazka;
    const data_wypozyczenia =wypozeczenieData.data_wypozyczenia;
    let data_zwrotu = wypozeczenieData.data_zwrotu;
    if(data_zwrotu === ''){
        data_zwrotu = null;
    }
    const sql = 'UPDATE  Wypozyczenie set czytelnik_id = ?, ksiazka_id =?, data_wypozyczenia= ?, data_zwrotu=?'

    return db.promise().execute(sql, [czytelnik_id, ksiazka_id, data_wypozyczenia, data_zwrotu,wypozeczenieId]);

};
exports.deleteWypozyczenie = (wypozeczenieId) => {
    const sql1 = 'Delete from Wypozyczenie where _id = ?';

    return db.promise().execute(sql1, [wypozeczenieId]);
};