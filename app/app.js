angular.module('Bookmark.controllers', []);
angular.module('Bookmark.services', []);
var Bookmark = angular.module('Bookmark', [
  'ngMaterial',
  'ngMdIcons',
  'Bookmark.controllers',
  'Bookmark.services'
]);

Bookmark
  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
  }])
  .config(['$mdIconProvider', function ($mdIconProvider) {
    $mdIconProvider
      .icon('author', './images/svg/person.svg');
  }]);
