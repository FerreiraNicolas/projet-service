const express = require("express");
const router = express.Router();
const categoryController = require("./categoryController");

router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.post("/categories", categoryController.createCategory);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

router.post('/categories/weight/:id', categoryController.incrementCategoryWeight);


module.exports = router;
