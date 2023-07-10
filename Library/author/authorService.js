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
  return axios
    .delete(`http://localhost:3003/books/author/${author_id}`)
    .then(() => {
      return Author.destroy({ where: { id: author_id } });
    })
    .catch((err) => {
      console.error("Error deleting books for author:", err);
    });
};
const updateAuthor = (id, updatedAuthor) => {
  return Author.update(updatedAuthor, { where: { id } });
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  deleteAuthor,
  updateAuthor,
};
