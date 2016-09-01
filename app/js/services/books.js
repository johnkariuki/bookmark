angular.module('Bookmark.services')
  .factory('Books', ['$http', '$q', function ($http, $q) {
    var url = 'http://localhost:8000';

    return {
      new: function (book) {
        var deferred = $q.defer();
        $http
          .post(url + '/books', book)
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
