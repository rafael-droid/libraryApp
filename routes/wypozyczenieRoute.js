const express = require('express');
const router = express.Router();
const wypozyczenieControler = require('../controllers/wypozyczenieController');



router.get('/',wypozyczenieControler.showWypozyczenieList);
router.get('/add',wypozyczenieControler.showAddWypozyczenieForm);
router.get('/edit/:wypozyczenieId',wypozyczenieControler.showEditWypozyczenieForm);
router.get('/details/:wypozyczenieId', wypozyczenieControler.showWypozyczenieDetails);
router.post('/add', wypozyczenieControler.addWypozyczenie);
router.post('/edit', wypozyczenieControler.updateWypozyczenie);
router.get('/delete/:wypozyczenieId', wypozyczenieControler.deleteWypozyczenie);

module.exports = router;