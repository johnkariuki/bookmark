angular.module('Bookmark.services')
  .factory('Books', ['$http', '$q', function ($http, $q) {

    return {
      //Create a new book.
      new: function (book) {
        var deferred = $q.defer();
        $http
          .post('/books', book)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      },

      //Delete an existing book.
      delete: function(bookId) {
        var deffered = $q.defer();
        $http
          .delete('/books/' + bookId)
          .then(function (response) {
            deffered.resolve(response.data);
          })
          .catch(function (error) {
            deffered.reject(error);
          });
        return deffered.promise;
      },

      //Update an existing book.
      update: function (book) {
        var deferred = $q.defer();
        $http
          .put('/books/' + book.id, book)
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
