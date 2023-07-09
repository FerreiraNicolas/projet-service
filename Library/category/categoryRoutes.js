const express = require('express');
const router = express.Router();
const categoryController = require('./categoryController');

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
router.get('/categories/:id/author', categoryController.getCategoryAndAuthor);

module.exports = router;
