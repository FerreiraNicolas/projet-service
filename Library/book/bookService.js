const Book = require("./bookDB");
const axios = require("axios");
const { Sequelize, Op } = require('sequelize');


const getAllBooks = () => {
  let bookPromises = [];
  
  return Book.findAll().then(books => {
    books.forEach(book => {
      book = book.toJSON();
      bookPromises.push(
        axios.get(`http://localhost:3001/categories/${book.category_id}`)
          .then(res => {
            book.category = res.data;
            book.categoryWeight = res.data.weight;
            return axios.get(`http://localhost:3002/authors/${book.author_id}`);  
          })
          .then(res => {
            book.author = res.data;
            return book;
          })
      );
    });
    return Promise.all(bookPromises);
  })
  .then(books => {
    books.sort((a, b) => {   
      return b.categoryWeight - a.categoryWeight;  
    });
    return books;
  });
};


const getBookById = (id) => {
  return Book.findByPk(id).then(book => {
    book = book.toJSON();
    axios.post(`http://localhost:3001/categories/weight/${book.category_id}`);
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
    where: { author_id },
  });
};
const deleteBooksByCategoryId = (category_id) => {
  return Book.destroy({
    where: { category_id },
  });
};

const searchBooks = (query) => {
  return Book.findAll({ where: { title: { [Op.like]: `%${query}%` } } })
    .then(books => {
      if (books.length > 0) {
        return Promise.all(
          books.map(book => {
            book = book.toJSON();
            axios.post(`http://localhost:3001/categories/weight/${book.category_id}`); 
            return axios.get(`http://localhost:3002/authors/${book.author_id}`)
              .then(res => {
                book.author = res.data;
                return axios.get(`http://localhost:3001/categories/${book.category_id}`); 
              })
              .then(res => {
                book.category = res.data; 
                return book;
              });
          })
        );
      } else {
        throw new Error('No books found matching the provided query');
      }
    })
    .catch(err => {
      console.error('Error searching books:', err);
      throw err;
    });
};




module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  deleteBooksByAuthorId,
  deleteBooksByCategoryId,
  searchBooks,
};
