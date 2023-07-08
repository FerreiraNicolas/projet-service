const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize('projet', 'dev', 'azerty', {
  host: 'localhost',
  dialect: 'mysql' 
});

const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
    
}, {
    tableName: 'author'

});

module.exports = Author;
