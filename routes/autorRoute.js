const express = require('express');
const router = express.Router();

const autorController = require('../controllers/autorController');

router.get('/',autorController.showAutorList);
router.get('/add',autorController.showAddAutorForm);
router.get('/edit/:autorId',autorController.showEditAutorForm);
router.get('/details/:autorId', autorController.showAutorDetails);
router.post('/add', autorController.addAutor);
router.post('/edit', autorController.updateAutor);
router.get('/delete/:autorId', autorController.deleteAutor);


module.exports = router;