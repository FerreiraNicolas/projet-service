const Category = require("./categoryDB");
const axios = require("axios");

const getAllCategories = () => {
  return Category.findAll();
};

const getCategoryById = (id) => {
  return Category.findByPk(id);
};

const createCategory = (category) => {
  return Category.create(category);
};

const updateCategory = (id, updatedCategory) => {
  return Category.update(updatedCategory, { where: { id } });
};

const deleteCategory = (category_id) => {
  return axios
    .delete(`http://localhost:3003/books/category/${category_id}`)
    .then(() => {
      return Category.destroy({ where: { id: category_id } });
    });
};
const incrementCategoryWeight = (id) => {
  try {
    return Category.increment('weight', { where: { id: id } }); 
  } catch (err) {
    console.error('Error incrementing category weight:', err);  
  }
};



module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  incrementCategoryWeight
};
