const express = require('express');
const router = express.Router();
const wypozyczenieApiController = require('../../api/WypozyczenieAPI');

router.get('/', wypozyczenieApiController.getWypozyczenie);
router.get('/:wypozyczenieId', wypozyczenieApiController.getWypozyczenieById);
router.post('/', wypozyczenieApiController.createWypozyczenie);
router.put('/:wypozyczenieId', wypozyczenieApiController.updateWypozyczenie);
router.delete('/:wypozyczenieId', wypozyczenieApiController.deleteWypozyczenie);

module.exports = router;