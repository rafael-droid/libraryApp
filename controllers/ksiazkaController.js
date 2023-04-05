const KsiazkaRepository = require('../repository/mysql2/KsiazkaRepository');
const AutorRepository = require('../repository/mysql2/AutorRepository');
exports.showKsiazkaList = (req, res, next) =>{
    let allAutor;
    AutorRepository.getAutor()
        .then( autor => {
            allAutor = autor;
            return KsiazkaRepository.getKsiazka();
        })
        .then( ksiazka => {
            res.render('pages/ksiazka/list', {
                ksiazka: ksiazka,
                allAutor: allAutor,
                navLocation: 'ksiazka'
            });
        });
}
exports.showAddKsiazkaForm = (req, res, next) =>{
    let allAutor;
    AutorRepository.getAutor()
        .then( autor => {
            allAutor = autor;
            res.render('pages/ksiazka/form', {
                ksiazka: {},
                formMode: 'createNew',
                allAutor: allAutor,
                pageTitle: 'Nowa ksiazka',
                btnTitle: 'Dodaj ksiazke',
                formAction: '/ksiazka/add',
                navLocation: 'ksiazka',
                validationErrors: []
            });
        });
}

exports.showEditKsiazkaForm = (req, res, next) =>{
    const ksiazkaId = req.params.ksiazkaId;
    let allAutor;
    AutorRepository.getAutor()
        .then( autor => {
            allAutor = autor;
            return KsiazkaRepository.getKsiazkaId(ksiazkaId);
        })
        .then(ksiazka =>{
            res.render('pages/ksiazka/form', {
                ksiazka: ksiazka,
                pageTitle: 'Edycja ksiazki',
                formMode: 'edit',
                allAutor: allAutor,
                btnLabel: 'Edytuj ksiazke',
                formAction: '/ksiazka/edit',
                navLocation: 'ksiazka',
                validationErrors: []
            });
        })

}
exports.showKsiazkaDetails = (req, res, next) =>{
    const ksiazkaId = req.params.ksiazkaId;
    let allAutor;
    AutorRepository.getAutor()
        .then( autor => {
            allAutor = autor;
            return KsiazkaRepository.getKsiazkaId(ksiazkaId);
        })
        .then(ksiazka =>{
            res.render('pages/ksiazka/form', {
                ksiazka: ksiazka,
                allAutor: allAutor,
                pageTitle: 'Szczegóły ksiazki',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'ksiazka',
                validationErrors: []
            });
        })


};
exports.addKsiazka = (req, res, next) => {
    const ksiazkaData = { ...req.body};
    let allAutor;
    AutorRepository.getAutor()
        .then( autor => {
            allAutor = autor;
            return KsiazkaRepository.createKsiazka(ksiazkaData);
        })
        .then( result => {
            res.redirect('/ksiazka');
        })
        .catch( err => {
            res.render('pages/ksiazka/form', {
                ksiazka: ksiazkaData,
                allAutor: allAutor,
                formMode: 'createNew',
                pageTitle: 'Dodawanie ksiazki',
                btnLabel: 'Dodaj ksiazki',
                formAction: '/ksiazka/add',
                navLocation: 'ksiazka',
                validationErrors: err.details
            });
        })
};
exports.updateKsiazka = (req, res, next) => {
    const ksiazkaId = req.body._id;
    const ksiazkaData = { ...req.body};
    let allAutor;
    AutorRepository.getAutor()
        .then( autor => {
            allAutor = autor;
            return KsiazkaRepository.updateKsiazka(ksiazkaId, ksiazkaData);
        })
        .then( result => {
            res.redirect('/ksiazka');
        })
        .catch( err => {
            res.render('pages/ksiazka/form', {
                ksiazka: ksiazkaData,
                formMode: 'edit',
                pageTitle: 'Edytowanie ksiazki',
                btnLabel: 'Edycja ksiazki',
                formAction: '/ksiazka/edit',
                navLocation: 'ksiazka',
                validationErrors: err.details
            })
        });
};
exports.deleteKsiazka = (req, res, next) => {
    const ksiazkaId = req.params.ksiazkaId;
    KsiazkaRepository.deleteKsiazka(ksiazkaId)
        .then( result => {
            res.redirect('/ksiazka');
        })
};