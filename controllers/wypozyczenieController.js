const WypozyczenieRepository = require('../repository/mysql2/WypozyczenieRepository');
const AutorRepository = require('../repository/mysql2/AutorRepository');
const KsiazkaRepository = require('../repository/mysql2/KsiazkaRepository');
const CzytelnikRepository = require('../repository/mysql2/CzytelnikRepository');

exports.showWypozyczenieList = (req, res, next) =>{
    WypozyczenieRepository.getWypozyczenie()
        .then(wypozyczenie => {
            res.render('pages/wypozyczenie/list', {
                wypozyczenie: wypozyczenie,
                navLocation: 'wypozyczenie'
            });
        });

}
exports.showAddWypozyczenieForm = (req, res, next) =>{
    let allKsiazka;
    let allCzytelnik;
    let allAutor;
    KsiazkaRepository.getKsiazka()
        .then( ksiazka => {
            allKsiazka = ksiazka;
            return CzytelnikRepository.getCzytelnik();
        })
        .then(czytelnik => {
            allCzytelnik = czytelnik;
            return AutorRepository.getAutor();
        })
        .then(autor => {
            allAutor = autor;
            res.render('pages/wypozyczenie/form', {
                wypozyczenie: {},
                formMode: 'createNew',
                allAutor: allAutor,
                allCzytelnik: allCzytelnik,
                allKsiazka: allKsiazka,
                pageTitle: 'Nowe wypozyczenie',
                btnLabel: 'Dodaj wypozyczenie',
                formAction: '/wypozyczenie/add',
                navLocation: 'wypozyczenie',
                validationErrors: []
            });
        });
}
exports.showEditWypozyczenieForm = (req, res, next) =>{
    const wypozyczenieId = req.params.wypozyczenieId;
    let allKsiazka,allCzytelnik,allAutor;
    KsiazkaRepository.getKsiazka()
        .then( ksiazka => {
            allKsiazka = ksiazka;
            return CzytelnikRepository.getCzytelnik();
        })
        .then(czytelnik => {
            allCzytelnik = czytelnik;
            return AutorRepository.getAutor();
        })
        .then(autor => {
            allAutor = autor;
            return WypozyczenieRepository.getWypozyczenieId(wypozyczenieId);
        })
        .then(wypozyczenie => {
            res.render('pages/wypozyczenie/form', {
                allAutor: allAutor,
                allCzytelnik: allCzytelnik,
                allKsiazka: allKsiazka,
                wypozyczenie: wypozyczenie,
                formMode: 'createNew',
                pageTitle: 'Edycja wypozyczenia',
                btnLabel: 'Edytuj wypozyczenie',
                formAction: '/wypozyczenie/edit',
                navLocation: 'wypozyczenie',
                validationErrors: []
            });
        });
}

exports.showWypozyczenieDetails = (req, res, next) =>{
    const wypozyczenieId = req.params.wypozyczenieId;
    let allKsiazka,allCzytelnik,allAutor;
    KsiazkaRepository.getKsiazka()
        .then( ksiazka => {
            allKsiazka = ksiazka;
            return CzytelnikRepository.getCzytelnik();
        })
        .then(czytelnik => {
            allCzytelnik = czytelnik;
            return AutorRepository.getAutor();
        })
        .then(autor => {
            allAutor = autor;
            return WypozyczenieRepository.getWypozyczenieId(wypozyczenieId);
        })
        .then(wypozyczenie => {
            res.render('pages/wypozyczenie/form', {
                allAutor: allAutor,
                allCzytelnik: allCzytelnik,
                allKsiazka: allKsiazka,
                wypozyczenie: wypozyczenie,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły wypozyczenia',
                formAction: '',
                navLocation: 'wypozyczenie',
                validationErrors: []
            });
        });
};
exports.addWypozyczenie = (req, res, next) => {
    const wypozyczenieData = { ...req.body};
    let allKsiazka,allCzytelnik,allAutor;
    KsiazkaRepository.getKsiazka()
        .then(ksiazka => {
            allKsiazka = ksiazka;
            return CzytelnikRepository.getCzytelnik()
        })
        .then( czytelnik => {
            allCzytelnik = czytelnik;
            return WypozyczenieRepository.createWypozyczenie(wypozyczenieData)
        })
        .then(wypozyczenie => {
            res.redirect('/wypozyczenie');
        })
        .catch( err => {
            res.render('pages/wypozyczenie/form', {
            wypozyczenie: wypozyczenieData,
            formMode: 'createNew',
            allAutor: allAutor,
            allCzytelnik: allCzytelnik,
            allKsiazka: allKsiazka,
            pageTitle: 'Dodawanie wypozyczenia',
            btnLabel: 'Dodaj wypozyczenie',
            formAction: '/wypozyczenie/add',
            navLocation: 'wypozyczenie',
            validationErrors: err.details
             });
        })

};
exports.updateWypozyczenie = (req, res, next) => {
    const wypozyczenieId = req.body._id;
    const wypozyczenieData = { ...req.body};
    let allKsiazka,allCzytelnik;
    KsiazkaRepository.getKsiazka()
        .then(ksiazka => {
            allKsiazka = ksiazka;
            return CzytelnikRepository.getCzytelnik()
        })
        .then( czytelnik => {
            allCzytelnik = czytelnik;
            return WypozyczenieRepository.updateWypozyczenie(wypozyczenieId,wypozyczenieData)
        })
        .then( result => {
            res.redirect('/wypozyczenie');
        })
        .catch(err => {

            res.render('pages/wypozyczenie/form', {
                wypozyczenie: wypozyczenieData,
                allKsiazka: allKsiazka,
                allCzytelnik: allCzytelnik,
                formMode: 'createNew',
                pageTitle: 'Dodawanie wypozyczenia',
                btnLabel: 'Dodaj wypozyczenie',
                formAction: '/wypozyczenie/edit',
                navLocation: 'wypozyczenie',
                validationErrors: err.details
            });
        });
};
exports.deleteWypozyczenie = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.deleteWypozyczenie(wypozyczenieId)
        .then( result => {
            res.redirect('/wypozyczenie');
        })
};