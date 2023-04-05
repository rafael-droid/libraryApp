const CzytelnikRepository = require('../repository/mysql2/CzytelnikRepository');

exports.getCzytelnik = (req, res, next) =>{
    CzytelnikRepository.getCzytelnik()
        .then( czytelnik => {
            res.status(200).json(czytelnik);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getCzytelnikById = (req, res, next) => {
    const czytelnikId = req.params.czytelnikId;
    CzytelnikRepository.getCzytelnikId(czytelnikId)
        .then(czytelnik => {
            if(!czytelnik){
                res.status(404).json({
                    message: 'Czytelnik with id: ' + czytelnikId + ' not found'
                })
            } else {
                res.status(200).json(czytelnik);
            }
        });
};
exports.createCzytelnik = (req, res, next) => {
    CzytelnikRepository.createCzytelnik(req.body)
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
exports.updateCzytelnik = (req, res, next) => {
    const czytelnikId = req.params.czytelnikId;
    CzytelnikRepository.updateCzytelnik(czytelnikId, req.body)
        .then(result => {
            res.status(200).json({message: 'Czytelnik updated!', czytelnik: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteCzytelnik = (req, res, next) => {
    const czytelnikId = req.params.czytelnikId;
    CzytelnikRepository.deleteCzytelnik(czytelnikId)
        .then(result =>{
            res.status(200).json({message: 'Removed czytelnik', czytelnik: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};