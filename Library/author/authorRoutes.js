const express = require('express');
const router = express.Router();
const authorController = require('./authorController');

router.get('/authors', authorController.getAllAuthors);
router.get('/authors/:id', authorController.getAuthorById);
router.post('/authors', authorController.addAuthor);
router.delete('/authors/:author_id', authorController.deleteAuthor);
router.put('/authors/:id', authorController.updateAuthor);


module.exports = router;
