angular.module('Bookmark.services')
  .factory('Authors', ['$http', '$q', function ($http, $q) {
    return {
      //Fetch all authors
      all: function() {
        var deferred = $q.defer();
        $http
          .get('/authors')
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
          .post('/authors', author)
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
