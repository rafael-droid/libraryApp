const express = require('express');
const router = express.Router();
const ksiazkaApiController = require('../../api/KsiazkaAPI');

router.get('/', ksiazkaApiController.getKsiazka);
router.get('/:ksiazkaId', ksiazkaApiController.getKsiazkaById);
router.post('/', ksiazkaApiController.createKsiazka);
router.put('/:ksiazkaId', ksiazkaApiController.updateKsiazka);
router.delete('/:ksiazkaId', ksiazkaApiController.deleteKsiazka);

module.exports = router;