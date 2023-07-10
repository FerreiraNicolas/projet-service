const axios = require("axios");

const categoryService = require("./categoryService");

const getAllCategories = (req, res) => {
  categoryService
    .getAllCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      console.error("Error retrieving categories:", err);
      res.status(500).json({ error: "Error retrieving categories" });
    });
};

const getCategoryById = (req, res) => {
  const id = req.params.id;
  categoryService
    .getCategoryById(id)
    .then((category) => {
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    })
    .catch((err) => {
      console.error("Error finding category by ID:", err);
      res.status(500).json({ error: "Error finding category by ID" });
    });
};

const createCategory = (req, res) => {
  categoryService
    .createCategory(req.body)
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((err) => {
      console.error("Error creating category:", err);
      res.status(500).json({ error: "Error creating category" });
    });
};

const updateCategory = (req, res) => {
  const id = req.params.id;
  categoryService
    .updateCategory(id, req.body)
    .then((updatedRows) => {
      if (updatedRows > 0) {
        res.json({ message: "Category updated" });
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    })
    .catch((err) => {
      console.error("Error updating category:", err);
      res.status(500).json({ error: "Error updating category" });
    });
};

const deleteCategory = (req, res) => {
  const id = req.params.id;
  categoryService
    .deleteCategory(id)
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res.status(200).json({ message: "Category deleted" });
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    })
    .catch((err) => {
      console.error("Error deleting category:", err);
      res.status(500).json({ error: "Error deleting category" });
    });
};
const incrementCategoryWeight = (req, res) => {
  console.log('Request parameters:', req.params);
  const id = req.params.id;
  categoryService.incrementCategoryWeight(id)
    .then(() => {
      res.status(200).json({ message: 'Category weight incremented successfully' });
    })
    .catch(err => {
      if (err.message === 'Category not found') {
        res.status(404).json({ error: 'Category not found' });
      } else {
        console.error('Error incrementing category weight:', err);
        res.status(500).json({ error: 'Error incrementing category weight' });
      }
    });
};



module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  incrementCategoryWeight
};
