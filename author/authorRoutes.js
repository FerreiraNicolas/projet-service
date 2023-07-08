const express = require('express');
const router = express.Router();
const authorController = require('./authorController');

router.get('/authors', authorController.getAllAuthors);
router.get('/authors/:id', authorController.getAuthorById);
router.post('/authors', authorController.addAuthor);
router.put('/authors/:id', authorController.updateAuthor);
router.delete('/authors/:id', authorController.deleteAuthor);
router.get('/authorsBDD', authorController.getAllAuthorsBDD);
router.get('/authorsBDD/:id', authorController.getAuthorByIdBDD);
router.post('/authorsBDD', authorController.addAuthorBDD);
router.delete('/authorsBDD/:id', authorController.deleteAuthorBDD);
// router.put('/authorsBDD/:id', authorController.updateAuthorBDD);


module.exports = router;
