const AutorRepository = require('../repository/mysql2/AutorRepository');

exports.showAutorList = (req, res, next) => {
    AutorRepository.getAutor()
        .then(autor => {
            res.render('pages/autor/list',{
                autor: autor,
                navLocation: 'autor'
            });
        });

}




exports.showAddAutorForm = (req, res, next) => {
    res.render('pages/autor/form', {
        autor: {},
        pageTitle: req.__('aut.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: 'Dodaj autora',
        formAction: '/autor/add',
        navLocation: 'autor',
        validationErrors: []
    });
};
exports.showEditAutorForm = (req, res, next) => {
    const autorId = req.params.autorId;
    AutorRepository.getAutorById(autorId)
        .then(autor => {
            res.render('pages/autor/form', {
                autor: autor,
                formMode: 'edit',
                pageTitle: 'Edycja autora',
                btnLabel: 'Edytuj autora',
                formAction: '/autor/edit',
                navLocation: 'autor',
                validationErrors: []
            });
        });
};
exports.showAutorDetails = (req, res, next) => {
    const autorId = req.params.autorId;
    AutorRepository.getAutorById(autorId)
        .then(autor =>{
            res.render('pages/autor/form',{
                autor: autor,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły autora',
                formAction: '',
                navLocation: 'autor',
                validationErrors:[]
            });
        }) ;
}
exports.addAutor = (req, res, next) => {
    const autorData = { ...req.body};
    AutorRepository.createAutor(autorData)
        .then( result => {
            res.redirect('/autor');
        })
        .catch( err => {
            res.render('pages/autor/form', {
                autor: autorData,
                pageTitle: 'Dodawanie autora',
                formMode: 'createNew',
                btnLabel: 'Dodaj autora',
                formAction: '/autor/add',
                navLocation: 'autor',
                validationErrors: err.details
            });
        });
};
exports.updateAutor = (req, res, next) => {
    const autorId = req.body._id;
    const autorData = { ...req.body};
    AutorRepository.updateAutor(autorId,autorData)
        .then( result => {
            res.redirect('/autor')
        })
        .catch( err => {
            res.render('pages/autor/form', {
                autor: autorData,
                pageTitle: 'Edytowanie autora',
                formMode: 'edit',
                btnLabel: 'Edytuj pracownika',
                formAction: '/autor/edit',
                navLocation: 'autor',
                validationErrors: err.details
            });
        });
};
exports.deleteAutor = (req, res, next) => {
    const autorId = req.params.autorId;
    AutorRepository.deleteAutor(autorId)
        .then( () => {
            res.redirect('/autor');
        })
};