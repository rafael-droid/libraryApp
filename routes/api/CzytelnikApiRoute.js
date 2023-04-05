const express = require('express');
const router = express.Router();
const czytelnikApiController = require('../../api/CzytelnikAPI');

router.get('/', czytelnikApiController.getCzytelnik);
router.get('/:czytelnikId', czytelnikApiController.getCzytelnikById);
router.post('/', czytelnikApiController.createCzytelnik);
router.put('/:czytelnikId', czytelnikApiController.updateCzytelnik);
router.delete('/:czytelnikId', czytelnikApiController.deleteCzytelnik);

module.exports = router;