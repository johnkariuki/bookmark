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
      },
      delete: function(bookId) {
        var deffered = $q.defer();
        $http
          .delete(url + '/books/' + bookId)
          .then(function (response) {
            deffered.resolve(response.data);
          })
          .catch(function (error) {
            deffered.reject(error);
          });
        return deffered.promise;
      },
      update: function (book) {
        var deferred = $q.defer();
        $http
          .put(url + '/books/' + book.id, book)
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
