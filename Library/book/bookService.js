const Book = require('./bookDB');
const axios = require('axios');

const getAllBooks = () => {
  return Book.findAll()
    .then(books => {
      return Promise.all(books.map(book => {
        book = book.toJSON();
        return axios.get(`http://localhost:3002/authors/${book.author_id}`)
          .then(res => {
            book.author = res.data;
            return axios.get(`http://localhost:3001/categories/${book.category_id}`);
          })
          .then(res => {
            book.category = res.data;
            return book;
          });
      }));
    });
};
const getBookById = (id) => {
  return Book.findByPk(id)
    .then(book => {
      book = book.toJSON();
      return axios.get(`http://localhost:3002/authors/${book.author_id}`)
        .then(res => {
          book.author = res.data;
          return axios.get(`http://localhost:3001/categories/${book.category_id}`);
        })
        .then(res => {
          book.category = res.data;
          return book;
        });
    });
};

const createBook = (book) => {
    return Book.create(book);
};
  
  const updateBook = (id, updatedBook) => {
    return Book.update(updatedBook, { where: { id } }); 
  };
  
  const deleteBook = (id) => {
    return Book.destroy({ where: { id } });
  };

  const deleteBooksByAuthorId = (author_id) => {
    return Book.destroy({
      where: { author_id }
    });
  };
  const deleteBooksByCategoryId = (category_id) => {
    return Book.destroy({
      where: { category_id }
    });
  };

  
  
module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    deleteBooksByAuthorId,
    deleteBooksByCategoryId
};
