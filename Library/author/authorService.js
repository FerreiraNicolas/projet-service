const Author = require("./authorDB.js");
const axios = require("axios");

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
  return Author.findByPk(author_id)
    .then(author => {
      if (author) {
        return axios
          .delete(`http://localhost:3003/books/author/${author_id}`)
          .then(() => {
            return author.destroy();  
          });
      } else {
        throw new Error('Author not found');
      }
    })
    .catch(err => {
      console.error('Error deleting author:', err);
      throw err;
    });
};

const updateAuthor = (id, updatedAuthor) => {
  return Author.findByPk(id)
    .then(author => {
      if (author) {
        return author.update(updatedAuthor);  
      } else {
        throw new Error('Author not found');
      }
    })
    .catch(err => {
      console.error('Error updating author:', err);
      throw err;
    });
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  deleteAuthor,
  updateAuthor,
};
