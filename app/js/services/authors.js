angular.module('Bookmark.services')
  .factory('Authors', ['$http', '$q', function ($http, $q) {
    var url = 'http://localhost:8000';

    return {
      all: function() {
        var deferred = $q.defer();
        $http
          .get(url + '/authors')
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
          return deferred.promise;
      },

      //add new author
      new: function (author) {
        var deferred = $q.defer();
        $http
          .post(url + '/authors', author)
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
