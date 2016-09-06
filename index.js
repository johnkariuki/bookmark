var express = require('express'),
  authors = require('./server/controllers/authors'),
  books = require('./server/controllers/books'),
  bodyParser = require('body-parser');;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/public'));

app.get('/authors', authors.index);
app.get('/authors/:id', authors.show);
app.post('/authors', authors.create);
app.put('/authors', authors.update);
app.delete('/authors/:id', authors.delete);

app.get('/books', books.index);
app.get('/books/:id', books.show);
app.post('/books', books.create);
app.delete('/books/:id', books.delete);

app.get('/*', function (req, res) {
  res.sendFile('index.html', {
    root: './public'
  });
});

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log("Magic happens on port", app.get('port'));
});
