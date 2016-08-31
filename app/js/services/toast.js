angular.module('Bookmark.services')
  .factory('Toast', ['$mdToast', function ($mdToast) {
    return {
      show: function (text, position, delay) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(text)
            .position(position)
            .hideDelay(delay)
          );
      }
    };
  }]);
