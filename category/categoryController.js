const axios = require('axios');

const categoryService = require('./categoryService');

const getAllCategories = (req, res) => {
    const categories = categoryService.getAllCategories();
    res.json(categories);
};

const getCategoryById = (req, res) => {
    const id = parseInt(req.params.id);
    const category = categoryService.getCategoryById(id);

    if (category) {
        res.json(category);
    } else {
        res.status(404).json({error: 'Category not found'});
    }
};

const getCategoryAndAuthor = async (req, res) => {
    const id = parseInt(req.params.id);
    const category = categoryService.getCategoryById(id);

    if (category) {
        try {
            const response = await axios.get(`http://localhost:3002/authors/${category.authorId}`);
            const author = response.data;

            res.json({
                ...category,
                author
            });
        } catch (error) {
            res.status(500).json({error: 'Error getting author'});
        }
    } else {
        res.status(404).json({error: 'Category not found'});
    }
};

// Ajoutez ces contrôleurs à votre contrôleur de catégorie
const addCategory = (req, res) => {
    const newCategory = categoryService.addCategory(req.body);
    res.status(201).json(newCategory);
};

const updateCategory = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCategory = categoryService.updateCategory(id, req.body);

    if (updatedCategory) {
        res.json(updatedCategory);
    } else {
        res.status(404).json({error: 'Category not found'});
    }
};

const deleteCategory = (req, res) => {
    const id = parseInt(req.params.id);
    const deletedCategory = categoryService.deleteCategory(id);

    if (deletedCategory) {
        res.json(deletedCategory);
    } else {
        res.status(404).json({error: 'Category not found'});
    }
};


const getAllCategoriesBDD = (req, res) => {
    categoryService.getAllCategoriesBDD()
      .then(categories => {
        res.json(categories);
      })
      .catch(err => {
        console.error('Error retrieving categories:', err);
        res.status(500).json({ error: 'Error retrieving categories' });
      });
  };
  
  const getCategoryByIdBDD = (req, res) => {
    const id = req.params.id;
    categoryService.getCategoryByIdBDD(id)
      .then(category => {
        if (category) {
          res.json(category);
        } else {
          res.status(404).json({ error: 'Category not found' });
        }
      })
      .catch(err => {
        console.error('Error finding category by ID:', err);
        res.status(500).json({ error: 'Error finding category by ID' });
      });
  };  
  
  const createCategoryBDD = (req, res) => {
    categoryService.createCategoryBDD(req.body)
      .then(category => {
        res.status(201).json(category);
      })
      .catch(err => {
        console.error('Error creating category:', err);
        res.status(500).json({ error: 'Error creating category' });
      });
  };
  
  const updateCategoryBDD = (req, res) => {
    const id = req.params.id;
    categoryService.updateCategoryBDD(id, req.body)
      .then(updatedRows => {
        if (updatedRows > 0) {
          res.json({ message: 'Category updated' });
        } else {
          res.status(404).json({ error: 'Category not found' });
        }
      })
      .catch(err => {
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'Error updating category' });
      });
  };  
  
  const deleteCategoryBDD = (req, res) => {
    const id = req.params.id;
    categoryService.deleteCategoryBDD(id)
      .then(deletedRows => {
        if (deletedRows > 0) {
          res.status(200).json({ message: 'Category deleted' });
        } else {
          res.status(404).json({ error: 'Category not found' });
        }
      })
      .catch(err => {
        console.error('Error deleting category:', err);
        res.status(500).json({ error: 'Error deleting category' });
      });
  };
  



module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryAndAuthor,
    getAllCategoriesBDD,
    getCategoryByIdBDD,
    createCategoryBDD,
    updateCategoryBDD,
    deleteCategoryBDD
    
};
