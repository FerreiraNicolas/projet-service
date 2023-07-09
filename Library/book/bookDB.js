const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize('projet', 'dev', 'azerty', {
  host: 'localhost',
  dialect: 'mysql' 
});

const Book = sequelize.define('Book', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    author_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }
    , {
    tableName: 'book'
    }
  );
  
  module.exports = Book;