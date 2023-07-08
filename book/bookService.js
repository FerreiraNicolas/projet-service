const books = require('./bookModel');
const Book = require('./bookDB');
// const Author = require('../author/authorDB');
// const Category = require('../category/categoryDB');
const authorService = require('../author/authorService');
const categoryService = require('../category/categoryService');

const getAllBooks = () => {
    return books;
};

const getBookById = (id) => {
    return books.find(book => book.id === id);
};

const addBook = (newBook) => {
    newBook.id = books.length + 1;
    books.push(newBook);
    return newBook;
};

const updateBook = (id, updatedBook) => {
    const bookIndex = books.findIndex(book => book.id === id);
    if(bookIndex !== -1) {
        books[bookIndex] = {id, ...updatedBook};
        return books[bookIndex];
    }
};

const deleteBook = (id) => {
    const bookIndex = books.findIndex(book => book.id === id);
    if(bookIndex !== -1) {
        return books.splice(bookIndex, 1);
    }
}; 

const getAllBooksDB = () => {
  return Book.findAll()
    .then(books => {
      return Promise.all(books.map(book => {
        return Promise.all([
          authorService.getAuthorByIdBDD(book.author_id),
          categoryService.getCategoryByIdBDD(book.category_id)
        ])
        .then(([author, category]) => {
          book = book.toJSON();
          book.author = author;
          book.category = category;
          return book;
        });
      }));
    });
};

  
  const createBookDB = (book) => {
    return Book.create(book);
  };
  
  const updateBookDB = (id, updatedBook) => {
    return Book.update(updatedBook, { where: { id } }); 
  };
  
  const deleteBookDB = (id) => {
    return Book.destroy({ where: { id } });
  };

  const getBookByIdDB = (id) => {
    return Book.findByPk(id)
    .then(book => {
      return Promise.all([
        authorService.getAuthorByIdBDD(book.author_id),
        categoryService.getCategoryByIdBDD(book.category_id)
      ])
      .then(([author, category]) => {
        book = book.toJSON();
        book.author = author;
        book.category = category;
        return book;
      });
    }); 
  };
  


  
  
module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    getAllBooksDB,
    getBookByIdDB,
    createBookDB,
    updateBookDB,
    deleteBookDB
    

};
