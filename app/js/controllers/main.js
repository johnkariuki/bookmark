angular.module('Bookmark.controllers')
.controller('MainCtrl', ['$scope', '$mdSidenav', 'Authors', function ($scope, $mdSidenav, Authors) {
  //Fetch all authors
  Authors.all()
    .then(function (authors) {
      $scope.authors = authors;
      $scope.selectedAuthor = authors[0];
    });

  //set an author as selected
  $scope.selectAuthor = function (author) {
    $scope.selectedAuthor = author;
  };

  //toggle the visibility of the Sidenav
  $scope.toggleSidenav = function () {
    $mdSidenav('left').toggle();
  };
}]);
