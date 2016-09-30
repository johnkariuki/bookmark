angular.module('Bookmark.controllers')
  .controller('BookDialogCtrl', ['$rootScope', '$scope', '$mdDialog', 'Toast', 'Books', 'bookDetails',
  function ($rootScope, $scope, $mdDialog, Toast, Books, bookDetails) {
    $scope.book = bookDetails;
    if ($scope.book) {
      $scope.book.publication_date = new Date($scope.book.publication_date);
    }
    //create a new book
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
    };

    //Update a book's details
    $scope.updateBook = function (book) {
      Books
        .update(book)
        .then(function () {
          Toast.show('Book successfully updated', 'top right', 3000);
          $mdDialog.cancel();
        })
        .catch(function () {
          Toast.show('Error updating book', 'top right', 3000);
        });
    };
  }]);
