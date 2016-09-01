angular.module('Bookmark.controllers')
  .controller('AuthorDialogCtrl', ['$rootScope', '$scope', '$mdDialog', 'Toast', 'Authors', 'Books',
  function ($rootScope, $scope, $mdDialog, Toast, Authors, Books) {
    //Save a new author
    $scope.saveAuthor = function (author) {
      Authors
        .new(author)
        .then(function (newAuthor) {
          newAuthor.Books = [];
          $rootScope.authors.push(newAuthor);
          Toast.show('Author successfully created', 'top right', 3000);
          $mdDialog.cancel();
        })
        .catch(function () {
          Toast.show('Error creating author', 'top right', 3000);
        });
    };

    $scope.saveBook = function (book) {
      book['author_id'] = $rootScope.selectedAuthor.id;
      Books
        .new(book)
        .then(function (newBook) {
          Toast.show('Book successfully created', 'top right', 3000);
          $rootScope.selectedAuthor.Books.push(newBook);
          $mdDialog.cancel();
        })
        .catch(function () {
          Toast.show('Error creating book', 'top right', 3000);
        });
    }
  }]);
