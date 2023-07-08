const express = require('express');
const router = express.Router();
const bookController = require('./bookController');

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);

// Utilisez bookController au lieu de authorController
router.post('/books', bookController.addBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

router.get('/booksBDD', bookController.getAllBooksDB);
router.get('/booksBDD/:id', bookController.getBookByIdDB);
router.post('/booksBDD', bookController.createBookDB);
router.delete('/booksBDD/:id', bookController.deleteBookDB);
router.put('/booksBDD/:id', bookController.updateBookDB);

module.exports = router;
