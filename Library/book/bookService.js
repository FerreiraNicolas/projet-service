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
  return Book.count({ where: { author_id } })
    .then(count => {
      if (count > 0) {
        return Book.destroy({ where: { author_id } });
      } else {
        console.log('No books found for author');
        return 0;  // Return 0 to indicate no books were deleted
      }
    });
};

const deleteBooksByCategoryId = (category_id) => {
  return Book.count({ where: { category_id } })
    .then(count => {
      if (count > 0) {
        return Book.destroy({ where: { category_id } });
      } else {
        console.log('No books found for category');
        return 0;  // Return 0 to indicate no books were deleted
      }
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
