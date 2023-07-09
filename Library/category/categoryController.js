const axios = require("axios");

const categoryService = require("./categoryService");

const getCategoryAndAuthor = async (req, res) => {
  const id = parseInt(req.params.id);
  const category = categoryService.getCategoryById(id);

  if (category) {
    try {
      const response = await axios.get(
        `http://localhost:3002/authors/${category.authorId}`
      );
      const author = response.data;

      res.json({
        ...category,
        author,
      });
    } catch (error) {
      res.status(500).json({ error: "Error getting author" });
    }
  } else {
    res.status(404).json({ error: "Category not found" });
  }
};

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

module.exports = {
  getCategoryAndAuthor,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
