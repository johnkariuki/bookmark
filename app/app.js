angular.module('Bookmark.controllers', []);
angular.module('Bookmark.services', []);

//Inject dependencies to the Bookmark module.
var Bookmark = angular.module('Bookmark', [
  'ngMaterial',
  'ngMdIcons',
  'Bookmark.controllers',
  'Bookmark.services'
]);

Bookmark
  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    //Set default theme
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
  }])
  .config(['$mdIconProvider', function ($mdIconProvider) {
    //Placeholder icon for author profile.
    $mdIconProvider
      .icon('author', './images/svg/person.svg');
  }]);
