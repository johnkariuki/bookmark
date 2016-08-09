'use strict';
module.exports = function(sequelize, DataTypes) {
  //Define the Author model
  var Author = sequelize.define('Author', {
    //Define the data types of the Author fields
    name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    //set the timestamps to be underscored: (created_at, updated_at)
    underscored: true,
    classMethods: {
      associate: function(models) {
        //An author can have many books.
        Author.hasMany(models.Book, {
          onDelete: 'cascade'
        });
      }
    }
  });
  return Author;
};
