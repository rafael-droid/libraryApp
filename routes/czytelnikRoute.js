const express = require('express');
const router = express.Router();

const czytelnikController = require('../controllers/czytelnikController');


router.get('/', czytelnikController.showCzytelnikList);
router.get('/add', czytelnikController.showAddCzytelnikForm);
router.get('/edit/:czytelnikId', czytelnikController.showEditCzytelnikForm);
router.get('/details/:czytelnikId', czytelnikController.showCzytelnikDetails);
router.post('/add', czytelnikController.addCzytelnik);
router.post('/edit', czytelnikController.updateCzytelnik);
router.get('/delete/:czytelnikId', czytelnikController.deleteCzytelnik);

module.exports = router;