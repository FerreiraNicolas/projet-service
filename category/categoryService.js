const categories = require('./categoryModel');
const Category = require('./categoryDB');


const getAllCategories = () => {
    return categories;
};

const getCategoryById = (id) => {
    return categories.find(category => category.id === id);
};


const addCategory = (newCategory) => {
    newCategory.id = categories.length + 1;
    categories.push(newCategory);
    return newCategory;
};

const updateCategory = (id, updatedCategory) => {
    const categoryIndex = categories.findIndex(category => category.id === id);
    if(categoryIndex !== -1) {
        categories[categoryIndex] = {id, ...updatedCategory};
        return categories[categoryIndex];
    }
};

const deleteCategory = (id) => {
    const categoryIndex = categories.findIndex(category => category.id === id);
    if(categoryIndex !== -1) {
        return categories.splice(categoryIndex, 1);
    }
};

const getAllCategoriesBDD = () => {
    return Category.findAll();
  };
  
  const getCategoryByIdBDD = (id) => {
    return Category.findByPk(id);
  };
  
  const createCategoryBDD = (category) => {
    return Category.create(category);
  };
  
  const updateCategoryBDD = (id, updatedCategory) => {
    return Category.update(updatedCategory, { where: { id } }); 
  };
  
  const deleteCategoryBDD = (id) => {
    return Category.destroy({ where: { id } });
  };


module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategoriesBDD,
    getCategoryByIdBDD,
    createCategoryBDD,
    updateCategoryBDD,
    deleteCategoryBDD

};
