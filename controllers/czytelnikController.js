const CzytelnikRepository = require('../repository/mysql2/CzytelnikRepository');
const KsiazkaRepository = require("../repository/mysql2/KsiazkaRepository");
exports.showCzytelnikList = (req, res, next) => {
    CzytelnikRepository.getCzytelnik()
        .then(czytelnik => {
            res.render('pages/czytelnik/list',{
                czytelnik: czytelnik,
                navLocation: 'czytelnik'
            });
        });
}
exports.showAddCzytelnikForm = (req, res, next) => {
    res.render('pages/czytelnik/form', {
        czytelnik: {},
        pageTitle: 'Nowy czytelnik',
        formMode: 'createNew',
        btnLabel: 'Dodaj czytelnika',
        formAction: '/czytelnik/add',
        navLocation: 'czytelnik',
        validationErrors:[]
    });
};
exports.showEditCzytelnikForm = (req, res, next) => {
    const czytelnikId = req.params.czytelnikId;
    CzytelnikRepository.getCzytelnikId(czytelnikId)
        .then(czytelnik => {
            res.render('pages/czytelnik/form', {
                czytelnik: czytelnik,
                formMode: 'edit',
                pageTitle: 'Edycja czytelnika',
                btnLabel: 'Edytuj czytelnika',
                formAction: '/czytelnik/edit',
                navLocation: 'czytelnik',
                validationErrors:[]
            });
        });

};
exports.showCzytelnikDetails = (req, res, next) => {
    const czytelnikId = req.params.czytelnikId;
    CzytelnikRepository.getCzytelnikId(czytelnikId)
        .then(czytelnik => {
            res.render('pages/czytelnik/form', {
                czytelnik: czytelnik,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły czytelnika',
                formAction: '',
                navLocation: 'czytelnik',
                validationErrors: []

        })
     });
};
exports.addCzytelnik = (req, res, next) => {
    const czytelnikData = { ...req.body};
    CzytelnikRepository.createCzytelnik(czytelnikData)
        .then( result => {
            res.redirect('/czytelnik');
        })
        .catch( err => {
            console.log(err);
            res.render('pages/czytelnik/form', {
                czytelnik: czytelnikData,
                formMode: 'createNew',
                pageTitle: 'Dodawanie czytelnika',
                btnLabel: 'Dodaj czytelnika',
                formAction: '/czytelnik/add',
                navLocation: 'czytelnik',
                validationErrors: err.details
            });
        });
};
exports.updateCzytelnik = (req, res, next) => {
    const czytelnikId = req.body._id;
    const czytelnikData = { ...req.body};
    CzytelnikRepository.updateCzytelnik(czytelnikId,czytelnikData)
        .then( result => {
            res.redirect('/czytelnik')
        })
        .catch( err => {
                res.render('pages/czytelnik/form', {
                    czytelnik: czytelnikData,
                    formMode: 'edit',
                    pageTitle: 'Edytowanie czytelnika',
                    btnLabel: 'Edycja czytelnika',
                    formAction: '/czytelnik/edit',
                    navLocation: 'czytelnik',
                    validationErrors: err.details
                })
        });
};
exports.deleteCzytelnik = (req, res, next) => {
    const czytelnikId = req.params.czytelnikId;
    CzytelnikRepository.deleteCzytelnik(czytelnikId)
        .then( result => {
            res.redirect('/czytelnik');
        })
};