
const Author = require('./authorDB.js');
const axios = require('axios'); // Make sure to install axios if you haven't already

const getAllAuthors = () => {
    return Author.findAll(); 
  };
  const getAuthorById = (id) => {
    return Author.findByPk(id); 
  };
  
const addAuthor = (newAuthor) => {
    return Author.create(newAuthor);
};
const deleteAuthor = (author_id) => {
    // Replace 'http://localhost:3000' with the URL of your books service
    return axios.delete(`http://localhost:3003/books/author/${author_id}`)
      .then(() => {
        return Author.destroy({ where: { id: author_id } });
      });
  };
  


module.exports = {

    getAllAuthors,
    getAuthorById,
    addAuthor,
    deleteAuthor
};
