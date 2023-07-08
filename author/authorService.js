const authors = require('./authorModel.js');
const Author = require('./authorDB.js');

const getAllAuthors = () => {
    return authors;
};

const getAuthorById = (id) => {
    return authors.find(author => author.id === id);
};

const addAuthor = (newAuthor) => {
    newAuthor.id = authors.length + 1;
    authors.push(newAuthor);
    return newAuthor;
};

const getAllAuthorsBDD = () => {
    return Author.findAll(); 
  };
  const getAuthorByIdBDD = (id) => {
    return Author.findByPk(id); 
  };
  
const addAuthorBDD = (newAuthor) => {
    return Author.create(newAuthor);
};
const deleteAuthorBDD = (id) => {
    return Author.destroy({ where: { id } });
  };
  

const updateAuthor = (id, updatedAuthor) => {
    const authorIndex = authors.findIndex(author => author.id === id);
    if(authorIndex !== -1) {
        authors[authorIndex] = {id, ...updatedAuthor};
        return authors[authorIndex];
    }
};

const deleteAuthor = (id) => {
    const authorIndex = authors.findIndex(author => author.id === id);
    if(authorIndex !== -1) {
        return authors.splice(authorIndex, 1);
    }
};
// const updateAuthorBDD = (id, updatedAuthor) => {
//     return Author.update(updatedAuthor, { where: { id } });
//   };

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
