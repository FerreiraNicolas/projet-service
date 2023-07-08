const bookService = require('./bookService');

const getAllBooks = (req, res) => {
    const books = bookService.getAllBooks();
    res.json(books);
};

const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    const book = bookService.getBookById(id);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({error: 'Book not found'});
    }
};

const addBook = (req, res) => {
    const newAuthor = bookService.addBook(req.body);
    res.status(201).json(newAuthor);
};

const updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedAuthor = authorService.updateBook(id, req.body);

    if (updatedAuthor) {
        res.json(updatedAuthor);
    } else {
        res.status(404).json({error: 'Author not found'});
    }
};

const deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const deletedAuthor = authorService.deleteBook(id);

    if (deletedAuthor) {
        res.json(deletedAuthor);
    } else {
        res.status(404).json({error: 'Author not found'});
    }
};

const getAllBooksDB = (req, res) => {
    bookService.getAllBooksDB()
      .then(books => {
        res.json(books);
      })
      .catch(err => {
        console.error('Error retrieving books:', err);
        res.status(500).json({ error: 'Error retrieving books' });
      });
  };
  
  const getBookByIdDB = (req, res) => {
    const id = req.params.id;
    bookService.getBookByIdDB(id)
      .then(book => {
        if (book) {
          res.json(book);
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch(err => {
        console.error('Error finding book by ID:', err);
        res.status(500).json({ error: 'Error finding book by ID' });
      });
  };  
  
  const createBookDB = (req, res) => {
    bookService.createBookDB(req.body)
      .then(book => {
        res.status(201).json(book);
      })
      .catch(err => {
        console.error('Error creating book:', err);
        res.status(500).json({ error: 'Error creating book' });
      });
  };
  
  const updateBookDB = (req, res) => {
    const id = req.params.id;
    bookService.updateBookDB(id, req.body)
      .then(updatedRows => {
        if (updatedRows > 0) {
          res.json({ message: 'Book updated' });
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch(err => {
        console.error('Error updating book:', err);
        res.status(500).json({ error: 'Error updating book' });
      });
  };  
  
  const deleteBookDB = (req, res) => {
    const id = req.params.id;
    bookService.deleteBookDB(id)
      .then(deletedRows => {
        if (deletedRows > 0) {
          res.status(200).json({ message: 'Book deleted' });
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch(err => {
        console.error('Error deleting book:', err);
        res.status(500).json({ error: 'Error deleting book' });
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
