const KsiazkaRepository = require('../repository/mysql2/KsiazkaRepository');

exports.getKsiazka = (req, res, next) =>{
    KsiazkaRepository.getKsiazka()
        .then( ksiazka => {
            res.status(200).json(ksiazka);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getKsiazkaById = (req, res, next) => {
    const ksiazkaId = req.params.ksiazkaId;
    KsiazkaRepository.getKsiazkaId(ksiazkaId)
        .then(ksiazka => {
            if(!ksiazka){
                res.status(404).json({
                    message: 'Ksiazka with id: ' + ksiazkaId + ' not found'
                })
            } else {
                res.status(200).json(ksiazka);
            }
        });
};
exports.createKsiazka = (req, res, next) => {
    KsiazkaRepository.createKsiazka(req.body)
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
exports.updateKsiazka = (req, res, next) => {
    const ksiazkaId = req.params.ksiazkaId;
    KsiazkaRepository.updateKsiazka(ksiazkaId, req.body)
        .then(result => {
            res.status(200).json({message: 'Ksiazka updated!', ksiazka: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteKsiazka = (req, res, next) => {
    const ksiazkaId = req.params.ksiazkaId;
    KsiazkaRepository.deleteKsiazka(ksiazkaId)
        .then(result =>{
            res.status(200).json({message: 'Removed ksiazka', ksiazka: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};