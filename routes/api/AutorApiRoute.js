const express = require('express');
const router = express.Router();
const autorApiController = require('../../api/AutorAPI');

router.get('/', autorApiController.getAutor);
router.get('/:autorId', autorApiController.getAutorById);
router.post('/', autorApiController.createAutor);
router.put('/:autorId', autorApiController.updateAutor);
router.delete('/:autorId', autorApiController.deleteAutor);

module.exports = router;