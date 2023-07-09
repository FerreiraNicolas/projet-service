const express = require('express');
const router = express.Router();
const bookController = require('./bookController');



router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);
router.delete('/books/:id', bookController.deleteBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/author/:author_id', bookController.deleteBooksByAuthorId);
router.delete('/books/category/:category_id', bookController.deleteBooksByCategoryId);

module.exports = router;
