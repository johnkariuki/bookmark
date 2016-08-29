angular.module('Bookmark.services')
  .factory('Authors', ['$http', '$q', function ($http, $q) {
    var url = 'http://localhost:8000';
    var deferred = $q.defer();

    return {
      all: function() {
        $http
          .get(url + '/authors')
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
          return deferred.promise;
      }
    };
  }]);
