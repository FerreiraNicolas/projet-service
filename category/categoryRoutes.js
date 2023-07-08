const express = require('express');
const router = express.Router();
const categoryController = require('./categoryController');

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', categoryController.addCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

router.get('/categories/:id/author', categoryController.getCategoryAndAuthor);

router.get('/categoriesBDD', categoryController.getAllCategoriesBDD);
router.get('/categoriesBDD/:id', categoryController.getCategoryByIdBDD);
router.post('/categoriesBDD', categoryController.createCategoryBDD);
router.delete('/categoriesBDD/:id', categoryController.deleteCategoryBDD);
router.put('/categoriesBDD/:id', categoryController.updateCategoryBDD);


module.exports = router;
