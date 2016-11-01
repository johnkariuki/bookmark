angular.module('Bookmark.controllers')
  .controller('AuthorDialogCtrl', ['$rootScope', '$scope', '$mdDialog', 'Toast', 'Authors',
  function ($rootScope, $scope, $mdDialog, Toast, Authors) {
    //Save a new author
    $scope.saveAuthor = function (author) {
      Authors
        .new(author)
        .then(function (newAuthor) {
          //No books added yet. Set books array to empty.
          newAuthor.Books = [];
          $rootScope.authors.push(newAuthor);
          Toast.show('Author successfully created', 'top right', 3000);
          $mdDialog.cancel();
        })
        .catch(function () {
          Toast.show('Error creating author', 'top right', 3000);
        });
    };
  }]);
