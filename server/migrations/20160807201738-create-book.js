'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    //Define the Books table
    return queryInterface.createTable('Books', {

      //Define the Books's fields properties
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.INTEGER
      },
      publication_date: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      author_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    //Define the dropTable command used while rolling back migrations
    return queryInterface.dropTable('Books');
  }
};
