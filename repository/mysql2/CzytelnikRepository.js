const db = require('../../config/mysql2/db');
const czytelnikSchema = require("../../model/joi/Czytelnik");
const authUtil = require('../../util/authUtils');


exports.getCzytelnik = () => {
    return db.promise().query('Select * from Czytelnik')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};
exports.getCzytelnikId = (czytelnikId) => {
    const query = `SELECT Czytelnik._id, Czytelnik.imie as czytImie, Czytelnik.nazwisko as czytNazwisko, Czytelnik.numerTel, Czytelnik.email, Czytelnik.password,
	Wypozyczenie._id as wypoId, Wypozyczenie.data_wypozyczenia, Wypozyczenie.data_zwrotu, 
    Ksiazka._id as ksiaId, Ksiazka.tytul, 
    Autor._id as autId, Autor.imie, Autor.nazwisko 
    FROM Czytelnik 
    LEFT Join Wypozyczenie on Wypozyczenie.czytelnik_id = Czytelnik._id 
    LEFT Join Ksiazka on Ksiazka._id = Wypozyczenie.ksiazka_id 
    LEFT Join Autor on Autor._id = Ksiazka.autor_id 
    where  Czytelnik._id = ?;`

    return db.promise().query(query, [czytelnikId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow){
                return {};
            }
            const czytelnik = {
                _id: parseInt(czytelnikId),
                imie: firstRow.czytImie,
                nazwisko: firstRow.czytNazwisko,
                numerTel: firstRow.numerTel,
                email: firstRow.email,
                password: firstRow.password,
                wypozyczenia: []
            }
            for( let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                if (row.wypoId) {
                    const wypozyczenie = {
                        _id: row.wypoId,
                        data_wypozyczenia: row.data_wypozyczenia,
                        data_zwrotu: row.data_zwrotu,
                        ksiazka: {
                            _id : row.ksiaId,
                            tytul: row.tytul,
                            wydawnictwo: row.wydawnictwo,
                            dziedzina: row.dziedzina
                        },
                        autor:{
                            _id: row.autId,
                            imie: row.imie,
                            nazwisko: row.nazwisko
                        }


                    }
                    czytelnik.wypozyczenia.push(wypozyczenie);

                }
            }



            console.log(czytelnik);
            return czytelnik;

        })
        .catch(err => {
            console.log(err);
            throw err;
        })

};
exports.createCzytelnik = (newCzytelnikData) => {
    console.log(newCzytelnikData);
    const vRes = czytelnikSchema.validate(newCzytelnikData, { abortEarly: false});
    if(vRes.error){
        console.log('vRes errror');
        console.log(JSON.stringify(vRes.error));
        return Promise.reject(vRes.error);
    }

    if(newCzytelnikData.email===''){
        const imie = newCzytelnikData.imie;
        const nazwisko = newCzytelnikData.nazwisko;
        const numerTel = newCzytelnikData.numerTel;
        const email = newCzytelnikData.email;
        const password = newCzytelnikData.password;
        const passHash = authUtil.hashPassword(password)
        const sql = 'INSERT into Czytelnik (imie, nazwisko, numerTel, email, password) VALUES (?, ?, ?, ?,?)'
        return db.promise().execute(sql, [imie, nazwisko, numerTel, email, passHash]);
    }else {
        return checkEmailUnique(newCzytelnikData.email)
            .then(emailErr => {
                if (emailErr !== '') {
                    return Promise.reject(emailErr)
                } else {

                    const imie = newCzytelnikData.imie;
                    const nazwisko = newCzytelnikData.nazwisko;
                    const numerTel = newCzytelnikData.numerTel;
                    const email = newCzytelnikData.email;
                    const password = newCzytelnikData.password;
                    const passHash = authUtil.hashPassword(password);
                    const sql = 'INSERT into Czytelnik (imie, nazwisko, numerTel, email, password) VALUES (?, ?, ?, ?,?)'
                    return db.promise().execute(sql, [imie, nazwisko, numerTel, email, passHash]);
                }

            })
            .catch(err => {

                return Promise.reject(err)
            })
    }


};
exports.updateCzytelnik = (czytelnikId, czytelnikData) => {
    const vRes = czytelnikSchema.validate(czytelnikData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    if(czytelnikData.email===''){
        const imie = czytelnikData.imie;
        const nazwisko = czytelnikData.nazwisko;
        const numerTel = czytelnikData.numerTel;
        const email = czytelnikData.email;
        const sql = 'UPDATE Czytelnik set imie = ?, nazwisko = ?, numerTel = ?, email = ? where _id = ?';
        return db.promise().execute(sql, [imie, nazwisko, numerTel, email, czytelnikId])
    }else {
        return checkEmailUnique(czytelnikData.email)
            .then(emailErr => {
                if (emailErr !== '') {
                    return Promise.reject(emailErr)
                } else {

                    const imie = czytelnikData.imie;
                    const nazwisko = czytelnikData.nazwisko;
                    const numerTel = czytelnikData.numerTel;
                    const email = czytelnikData.email;
                    const sql = 'UPDATE Czytelnik set imie = ?, nazwisko = ?, numerTel = ?, email = ? where _id = ?';
                    return db.promise().execute(sql, [imie, nazwisko, numerTel, email, czytelnikId])
                }

            })
            .catch(err => {

                return Promise.reject(err)
            })
    }

};
exports.deleteCzytelnik = (czytelnikId) => {
    const sql1 = 'Delete from Wypozyczenie where czytelnik_id = ?';
    const sql2 = 'Delete from Czytelnik where _id = ?';

    return db.promise().execute(sql1, [czytelnikId])
        .then(() => {
            return db.promise().execute(sql2, [czytelnikId])
        })
};
exports.findByEmail = (email) => {
    return db.promise().execute('SELECT _id, imie, nazwisko, email ,password FROM Czytelnik WHERE email = ?', [email]).then( (results, fields) => {
        return results[0][0];
    });
}

checkEmailUnique = (email, czytelnikId) => {
    let sql, promise;
    console.log('----------------------------------------------------------------------');
    console.log(email);
        if(czytelnikId){
            sql = `SELECT COUNT(1) as c FROM Czytelnik where _id 1=? and email =?`;
            promise = db.promise().query(sql, [czytelnikId,email]);
        }else {
            sql = `SELECT COUNT(1) as c
                   FROM Czytelnik
                   where email = ? `;
            console.log('SQL ====== ' + sql);
            promise = db.promise().query(sql, [email]);
        }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        console.log('count-------- ' + count);
        if(count >0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'Podany adres email jest już używany'
                }]
            };
        }else{
            err = '';
        }
        return err;
    });
}