angular.module('Bookmark.controllers')
.controller('MainCtrl', ['$rootScope', '$scope', '$mdSidenav', '$mdDialog', 'Authors',
function ($rootScope, $scope, $mdSidenav, $mdDialog, Authors) {
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

  //Dialog to create new book
  $scope.newBookDialog = function (ev) {
    $mdDialog.show({
      templateUrl: 'views/dialogs/new-book.html',
      controller: 'AuthorDialogCtrl',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true
    });
  };
}]);
