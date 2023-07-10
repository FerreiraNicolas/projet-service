const bookService = require("./bookService");

const getAllBooks = (req, res) => {
  bookService
    .getAllBooks()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      console.error("Error retrieving books:", err);
      res.status(500).json({ error: "Error retrieving books" });
    });
};

const getBookById = (req, res) => {
  const id = req.params.id;
  bookService
    .getBookById(id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((err) => {
      console.error("Error finding book by ID:", err);
      res.status(500).json({ error: "Error finding book by ID" });
    });
};

const createBook = (req, res) => {
  bookService
    .createBook(req.body)
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => {
      console.error("Error creating book:", err);
      res.status(500).json({ error: "Error creating book" });
    });
};

const updateBook = (req, res) => {
  const id = req.params.id;
  bookService
    .updateBook(id, req.body)
    .then((updatedRows) => {
      if (updatedRows > 0) {
        res.json({ message: "Book updated" });
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((err) => {
      console.error("Error updating book:", err);
      res.status(500).json({ error: "Error updating book" });
    });
};

const deleteBook = (req, res) => {
  const id = req.params.id;
  bookService
    .deleteBook(id)
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res.status(200).json({ message: "Book deleted" });
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((err) => {
      console.error("Error deleting book:", err);
      res.status(500).json({ error: "Error deleting book" });
    });
};

const deleteBooksByAuthorId = (req, res) => {
  const author_id = req.params.author_id;
  bookService
    .deleteBooksByAuthorId(author_id)
    .then(() => {
      res.json({ message: "Books deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting books by author ID:", err);
      res.status(500).json({ error: "Error deleting books by author ID" });
    });
};
const deleteBooksByCategoryId = (req, res) => {
  const category_id = req.params.category_id;
  bookService
    .deleteBooksByCategoryId(category_id)
    .then(() => {
      res.json({ message: "Books deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting books by category ID:", err);
      res.status(500).json({ error: "Error deleting books by category ID" });
    });
};

const searchBooks = (req, res) => {
  const query = req.query.query;
  bookService.searchBooks(query)
    .then(books => {
      if (books.length > 0) {
        res.json(books);
      } else {
        res.status(404).json({ message: 'No books found matching the provided query' });
      }
    })
    .catch(err => {
      console.error('Error searching books:', err);
      res.status(500).json({ error: 'Error searching books' });
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
  searchBooks
};
