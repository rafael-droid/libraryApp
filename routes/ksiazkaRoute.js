const express = require('express');
const router = express.Router();
const ksiazkaControler = require('../controllers/ksiazkaController');



router.get('/',ksiazkaControler.showKsiazkaList);
router.get('/add',ksiazkaControler.showAddKsiazkaForm);
router.get('/edit/:ksiazkaId',ksiazkaControler.showEditKsiazkaForm);
router.get('/details/:ksiazkaId', ksiazkaControler.showKsiazkaDetails);
router.post('/add', ksiazkaControler.addKsiazka);
router.post('/edit', ksiazkaControler.updateKsiazka);
router.get('/delete/:ksiazkaId', ksiazkaControler.deleteKsiazka);

module.exports = router;