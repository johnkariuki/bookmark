angular.module('Bookmark.controllers')
.controller('MainCtrl', ['$rootScope', '$scope', '$mdSidenav', '$mdDialog', 'Authors', 'Books', 'Toast',
function ($rootScope, $scope, $mdSidenav, $mdDialog, Authors, Books, Toast) {
  
  //Fetch all authors
  Authors.all()
    .then(function (authors) {
      $rootScope.authors = authors;
      $rootScope.selectedAuthor = authors[0];
    });

  //set an author as selected
  $scope.selectAuthor = function (author) {
    $rootScope.selectedAuthor = author;
  };

  //toggle the visibility of the Sidenav
  $scope.toggleSidenav = function () {
    $mdSidenav('left').toggle();
  };

  //Dialog to create new author
  $scope.newAuthorDialog = function (ev) {
    $mdDialog.show({
      templateUrl: 'views/dialogs/new-author.html',
      controller: 'AuthorDialogCtrl',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true
    });
  };

  //Show An author's profile
  $scope.showAuthorProfile = function (ev) {
    $mdDialog.show({
      templateUrl: 'views/dialogs/author-profile.html',
      controller: 'AuthorDialogCtrl',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true
    });
  };

  //Dialog to create new book
  $scope.newBookDialog = function (ev) {
    $mdDialog.show({
      templateUrl: 'views/dialogs/new-book.html',
      controller: 'BookDialogCtrl',
      locals: {
        bookDetails: null
      },
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true
    });
  };

  //Delete an existing book
  $scope.deleteBook = function (ev, book) {
    var deleteBook = $mdDialog.confirm()
      .title('Delete ' + book.name + '?')
      .textContent(book.name + ' will be wiped off the face of the earth.')
      .ariaLabel('Delete book')
      .ok('Yes! do it!')
      .cancel('No');

    $mdDialog.show(deleteBook)
      .then(function () {
        Books.delete(book.id)
          .then(function () {
            $scope.selectedAuthor.Books = $scope.selectedAuthor.Books.filter(function (i) {
              return i.id !== book.id;
            });
            Toast.show(book.name + ' has been deleted.', 'top right', 3000);
          })
          .catch(function (error) {
            Toast.show('Error deleting ' + book.name + '. Please try again.', 'top right', 3000);
          });

      });
  };

  //Show modal to edit an existing book's details
  $scope.editBook = function (ev, book) {
    $mdDialog.show({
      templateUrl: 'views/dialogs/edit-book.html',
      controller: 'BookDialogCtrl',
      locals: {
        bookDetails: book
      },
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true
    });
  };
}]);
