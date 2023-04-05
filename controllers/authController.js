const CzytelnikRepository = require('../repository/mysql2/CzytelnikRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email + "<----- email2")

    CzytelnikRepository.findByEmail(email)
        .then(czyt => {
            if(!czyt) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if(authUtil.comparePasswords(password,czyt.password) === true) {

                req.session.loggedUser = czyt;
                res.redirect('/');
            } else {
                console.log(czyt + "<----------------- czyt3");
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch( err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}