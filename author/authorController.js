const authorService = require('./authorService');
const Author = require('./authorDB.js');

const getAllAuthors = (req, res) => {
    const authors = authorService.getAllAuthors();
    res.json(authors);
};

const getAllAuthorsBDD = (req, res) => {
    Author.findAll()
      .then((authors) => {
        res.json(authors);
      })
      .catch((err) => {
        console.error('Error retrieving authors:', err);
        res.status(500).json({ error: 'Error retrieving authors' });
      });
  };

  const getAuthorByIdBDD = (req, res) => {
    const id = req.params.id;
    Author.findByPk(id)
      .then(author => {
        if (author) {
          res.json(author);
        } else {
          res.status(404).json({ error: 'Author not found' });
        }
      })
      .catch(err => {
        console.error('Error finding author by ID:', err);
        res.status(500).json({ error: 'Error finding author by ID' });
      });
  };
  
const addAuthorBDD = (req, res) => {
    const newAuthor = req.body;
    Author.create(newAuthor)
        .then((author) => {
            res.status(201).json(author);
        })
        .catch((err) => {
            console.error('Error creating author:', err);
            res.status(500).json({ error: 'Error creating author' });
        });
};

const deleteAuthorBDD = (req, res) => {
    const id = req.params.id;
    authorService.deleteAuthorBDD(id)
      .then(deletedRows => {
        if (deletedRows > 0) {
          res.status(200).json({ message: 'Author deleted' });
        } else {
          res.status(404).json({ error: 'Author not found' });
        }
      })
      .catch(err => {
        console.error('Error deleting author:', err);
        res.status(500).json({ error: 'Error deleting author' });
      });
  };

//   const updateAuthorBDD = (req, res) => {
//     const id = req.params.id;
//     authorService.updateAuthorBDD(id, req.body)
//       .then(updatedRows => {
//         if (updatedRows > 0) {
//           res.json({ message: 'Author updated' });
//         } else {
//           res.status(404).json({ error: 'Author not found' });
//         }
//       })
//       .catch(err => {
//         console.error('Error updating author:', err);
//         res.status(500).json({ error: 'Error updating author' });
//       });
//   };
const getAuthorById = (req, res) => {
    const id = parseInt(req.params.id);
    const author = authorService.getAuthorById(id);

    if (author) {
        res.json(author);
    } else {
        res.status(404).json({error: 'Author not found'});
    }
};
// Ajoutez ces contrôleurs à votre contrôleur d'auteur
const addAuthor = (req, res) => {
    const newAuthor = authorService.addAuthor(req.body);
    res.status(201).json(newAuthor);
};

const updateAuthor = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedAuthor = authorService.updateAuthor(id, req.body);

    if (updatedAuthor) {
        res.json(updatedAuthor);
    } else {
        res.status(404).json({error: 'Author not found'});
    }
};

const deleteAuthor = (req, res) => {
    const id = parseInt(req.params.id);
    const deletedAuthor = authorService.deleteAuthor(id);

    if (deletedAuthor) {
        res.json(deletedAuthor);
    } else {
        res.status(404).json({error: 'Author not found'});
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    getAllAuthorsBDD,
    getAuthorByIdBDD,
    addAuthorBDD,
    deleteAuthorBDD,
    // updateAuthorBDD

};
