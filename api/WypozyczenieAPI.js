const WypozyczenieRepository = require('../repository/mysql2/WypozyczenieRepository');

exports.getWypozyczenie = (req, res, next) =>{
    WypozyczenieRepository.getWypozyczenie()
        .then( wypozyczenie => {
            res.status(200).json(wypozyczenie);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getWypozyczenieById = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.getWypozyczenieId(wypozyczenieId)
        .then(wypozyczenie => {
            if(!wypozyczenie){
                res.status(404).json({
                    message: 'Wypozyczenie with id: ' + wypozyczenieId + ' not found'
                })
            } else {
                res.status(200).json(wypozyczenie);
            }
        });
};
exports.createWypozyczenie = (req, res, next) => {
    WypozyczenieRepository.createWypozyczenie(req.body)
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
exports.updateWypozyczenie = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.updateWypozyczenie(wypozyczenieId, req.body)
        .then(result => {
            res.status(200).json({message: 'Wypozyczenie updated!', wypozyczenie: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteWypozyczenie = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.deleteWypozyczenie(wypozyczenieId)
        .then(result =>{
            res.status(200).json({message: 'Removed wypozyczenie', wypozyczenie: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};