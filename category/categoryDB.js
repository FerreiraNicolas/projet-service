const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize('projet', 'dev', 'azerty', {
  host: 'localhost',
  dialect: 'mysql' 
});

const Category = sequelize.define('Category', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
    , {
    tableName: 'category'
    }
  );
  
  module.exports = Category;