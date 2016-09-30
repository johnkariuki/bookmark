Book = require('../models/').Book;

module.exports= {
  //Get a list of all books using model.findAll()
  index(req, res) {
    Book.findAll()
      .then(function (books) {
        res.status(200).json(books);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Get a book by it's unique ID using model.findById()
  show(req, res) {
    Book.findById(req.params.id)
    .then(function (book) {
      res.status(200).json(book);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new book using model.create()
  create(req, res) {
    Book.create(req.body)
      .then(function (newBook) {
        res.status(200).json(newBook);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Edit an existing book using model.update()
  update(req, res) {
    Book.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  //Delete an existing book by it's unique ID using model.destroy()
  delete(req, res) {
    Book.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }
};
