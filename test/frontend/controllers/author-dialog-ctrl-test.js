describe('Controller Tests', function () {
  var httpBackend,
    deferred,
    Authors,
    mockAuthor = {
    name: 'Test Author 1',
    bio: 'Test Author Description'
  };

  //Inject the mock Bookmark module.
  beforeEach(module('Bookmark'));

  //inject $controller, $scope, promise and Authors service.
  beforeEach(
    inject(function (_$controller_, _$rootScope_, _$q_, _Authors_) {
      $scope = _$rootScope_;
      Authors = _Authors_;

      //Create an instance of defer from the $q service.
      deferred = _$q_.defer();

      _$controller_('AuthorDialogCtrl', {
        $scope: $scope
      });

      spyOn(Authors, 'new').and.returnValue(deferred.promise);
    })
  );

  describe('AuthorDialogCtrl tests', function () {
    it('Should create a new author', function () {
      deferred.resolve({ id: 1, name: 'Test Author', bio: 'Test Bio'});

      $scope.authors = [];

      $scope.saveAuthor(mockAuthor);
      $scope.$apply();
      expect($scope.authors.length).toEqual(1);
    });

    it('Should not add author to when there is an error', function () {
      deferred.reject();

      $scope.authors = [];

      $scope.saveAuthor(mockAuthor);
      $scope.$apply();
      expect($scope.authors.length).toEqual(0);
    });
  });
});
