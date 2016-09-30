describe('Controller Tests', function () {
  var httpBackend,
    deferred,
    $mdDialog,
    Books,
    mockBook = {
    name: 'Test Author 1',
    isbn: 123,
    publication_date: new Date(),
    description: 'Test Author Description',
    author_id: 1
  },
  existingBook = {
    id: 1,
    name: 'Test Author',
    bio: 'Test Bio'
  };

  //Inject the mock Bookmark module.
  beforeEach(module('Bookmark'));

  //inject $controller, $scope, promise and Books service.
  beforeEach(
    inject(function (_$controller_, _$rootScope_, _$q_, _Books_, _Toast_, _$mdDialog_) {
      $scope = _$rootScope_;
      Books = _Books_;
      Toast = _Toast_;
      $mdDialog = _$mdDialog_;

      //Create an instance of defer from the $q service.
      deferred = _$q_.defer();

      _$controller_('BookDialogCtrl', {
        $scope: $scope,
        bookDetails: []
      });

      spyOn(Books, 'new').and.returnValue(deferred.promise);
      spyOn(Books, 'update').and.returnValue(deferred.promise);
    })
  );

  describe('BookDialogCtrl tests', function () {
    it('Should create a new book', function () {
      deferred.resolve({ id: 1, name: 'Test Author', bio: 'Test Bio'});

      $scope.selectedAuthor = {
        Books: []
      };

      $scope.saveBook(mockBook);
      $scope.$apply();
      expect($scope.selectedAuthor.Books.length).toEqual(1);
    });

    it('Should not add book to when there is an error', function () {
      deferred.reject();

      $scope.selectedAuthor = {
        Books: []
      };

      $scope.saveBook(mockBook);
      $scope.$apply();
      expect($scope.selectedAuthor.Books.length).toEqual(0);
    });

    it('Should update a book', function () {
      spyOn(Toast, 'show');
      spyOn($mdDialog, 'cancel');

      deferred.resolve();

      $scope.selectedAuthor = {
        Books: []
      };

      $scope.updateBook(existingBook);
      $scope.$apply();
      expect(Toast.show).toHaveBeenCalledWith('Book successfully updated', 'top right', 3000);
      expect($mdDialog.cancel).toHaveBeenCalled();
    });

    it('Should not add book to when there is an error', function () {
      spyOn(Toast, 'show');
      deferred.reject();

      $scope.selectedAuthor = {
        Books: []
      };

      $scope.updateBook(mockBook);
      $scope.$apply();
      expect(Toast.show).toHaveBeenCalledWith('Error updating book', 'top right', 3000);
    });
  });
});
