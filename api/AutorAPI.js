const AutorRepository = require('../repository/mysql2/AutorRepository');

exports.getAutor = (req, res, next) =>{
    AutorRepository.getAutor()
        .then( autors => {
            res.status(200).json(autors);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getAutorById = (req, res, next) => {
    const autorId = req.params.autorId;
    AutorRepository.getAutorById(autorId)
        .then(autor => {
            if(!autor){
                res.status(404).json({
                    message: 'Autor with id: ' + autorId + ' not found'
                })
            } else {
                res.status(200).json(autor);
            }
        });
};
exports.createAutor = (req, res, next) => {
    AutorRepository.createAutor(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.updateAutor = (req, res, next) => {
    const autorId = req.params.autorId;
    AutorRepository.updateAutor(autorId, req.body)
        .then(result => {
            res.status(200).json({message: 'Autor updated!', autor: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteAutor = (req, res, next) => {
    const autorId = req.params.autorId;
    AutorRepository.deleteAutor(autorId)
        .then(result =>{
            res.status(200).json({message: 'Removed autor', autor: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};