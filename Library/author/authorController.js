const authorService = require("./authorService");
const Author = require("./authorDB.js");

const getAllAuthors = (req, res) => {
  Author.findAll()
    .then((authors) => {
      res.json(authors);
    })
    .catch((err) => {
      console.error("Error retrieving authors:", err);
      res.status(500).json({ error: "Error retrieving authors" });
    });
};

const getAuthorById = (req, res) => {
  const id = req.params.id;
  Author.findByPk(id)
    .then((author) => {
      if (author) {
        res.json(author);
      } else {
        res.status(404).json({ error: "Author not found" });
      }
    })
    .catch((err) => {
      console.error("Error finding author by ID:", err);
      res.status(500).json({ error: "Error finding author by ID" });
    });
};

const addAuthor = (req, res) => {
  const newAuthor = req.body;
  Author.create(newAuthor)
    .then((author) => {
      res.status(201).json(author);
    })
    .catch((err) => {
      console.error("Error creating author:", err);
      res.status(500).json({ error: "Error creating author" });
    });
};

const updateAuthor = (req, res) => {
  const id = req.params.id;
  const updatedAuthor = req.body;
  authorService
    .updateAuthor(id, updatedAuthor)
    .then((author) => {
      res.json({ message: "Author updated successfully" });
    })
    .catch((err) => {
      console.error("Error updating author:", err);
      res.status(500).json({ error: "Error updating author" });
    });
};

const deleteAuthor = (req, res) => {
  const author_id = req.params.author_id;
  authorService
    .deleteAuthor(author_id)
    .then(() => {
      res.json({ message: "Author and possible associated books deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting author and possible associated books:", err);
      res
        .status(500)
        .json({ error: "Error deleting author and possible associated books" });
    });
};
module.exports = {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  deleteAuthor,
  updateAuthor,
};
