'use strict';
module.exports = function(sequelize, DataTypes) {
  //Define the Book model
  var Book = sequelize.define('Book', {
    //Define the data types of the Book fields
    name: DataTypes.STRING,
    isbn: DataTypes.INTEGER,
    publication_date: DataTypes.DATE,
    description: DataTypes.TEXT,
    author_id: DataTypes.INTEGER
  }, {
    //set the timestamps to be underscored: (created_at, updated_at)
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Book;
};
