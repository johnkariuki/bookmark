var authors = require('../controllers/authors'),
  books = require('../controllers/books');

module.exports = function (router) {
  router.get('/authors', authors.index);
  router.get('/authors/:id', authors.show);
  router.post('/authors', authors.create);
  router.put('/authors', authors.update);
  router.delete('/authors/:id', authors.delete);

  router.get('/books', books.index);
  router.get('/books/:id', books.show);
  router.post('/books', books.create);
  router.put('/books/:id', books.update);
  router.delete('/books/:id', books.delete);

  return router
};
