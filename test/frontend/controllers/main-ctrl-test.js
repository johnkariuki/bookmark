describe('Controller tests', function () {
  var $scope,
    httpBackend,
    deferred,
    $mdDialog,
    Authors,
    Books,
    Toast
    mockAuthors = [
      { name: 'Test Author 1', bio: 'Test Author Description', Books: [] },
      { name: 'Test Author 2', bio: 'Test Author Description', Books: [] }
    ]
    event = {};

  beforeEach(module('Bookmark'));

  beforeEach(
    inject(function (_$controller_, _$rootScope_, _$httpBackend_, _$mdDialog_, _Authors_, _Books_, _$q_, _Toast_) {
      $scope = _$rootScope_;
      httpBackend = _$httpBackend_;
      $mdDialog = _$mdDialog_;
      Authors = _Authors_;
      Books = _Books_;
      Toast= _Toast_;
      deferred = _$q_.defer();

      var $controller = _$controller_('MainCtrl', {
        $scope: $scope
      });

      httpBackend.when('GET', '/authors').respond(200, mockAuthors);
      spyOn(Books, 'delete').and.returnValue(deferred.promise);
      spyOn(Toast, 'show');
    })
  );

  describe('MainCtrl tests', function () {
    it('Should select an author', function () {
      httpBackend.flush();
      expect($scope.authors).toBeDefined();
      expect($scope.selectedAuthor).toBeDefined();
      expect($scope.selectedAuthor.name).toEqual('Test Author 1');

      $scope.selectAuthor(mockAuthors[1]);
      expect($scope.selectedAuthor.name).toEqual('Test Author 2');
    });

    it('Should delete a book', function () {
      spyOn($mdDialog, 'show').and.returnValue(deferred.promise);
      deferred.resolve({});

      $scope.selectedAuthor = {
        Books: [
          { id: 1, name: 'Sample Book 1'},
          { id: 2, name: 'Sample Book 2'}
        ]
      };

      expect($scope.selectedAuthor.Books.length).toEqual(2);

      $scope.deleteBook(null, { id: 1, name: 'Sample book'});
      $scope.$apply();

      expect($scope.selectedAuthor.Books.length).toEqual(1);
      expect(Toast.show).toHaveBeenCalledWith('Sample book has been deleted.', 'top right', 3000);
    });

    it('Should show error message if book is not deleted', function () {
      spyOn($mdDialog, 'show').and.returnValue(deferred.promise);
      deferred.reject();

      $scope.selectedAuthor = {
        Books: [
          { id: 1, name: 'Sample Book 1'},
          { id: 2, name: 'Sample Book 2'}
        ]
      };

      expect($scope.selectedAuthor.Books.length).toEqual(2);

      $scope.deleteBook(null, { id: 1, name: 'Sample book'});
      $scope.$apply();

      expect($scope.selectedAuthor.Books.length).toEqual(2);
    });

    it('Should call newAuthorDialog $mdDialog show method', function () {
      spyOn($mdDialog, 'show');
      $scope.newAuthorDialog();
      expect($mdDialog.show).toHaveBeenCalled();
    });

    it('Should call showAuthorProfile $mdDialog show method', function () {
      spyOn($mdDialog, 'show');
      $scope.showAuthorProfile();
      expect($mdDialog.show).toHaveBeenCalled();
    });

    it('Should call newBookDialog $mdDialog show method', function () {
      spyOn($mdDialog, 'show');
      $scope.newBookDialog();
      expect($mdDialog.show).toHaveBeenCalled();
    });

    it('Should call editBook $mdDialog show method', function () {
      spyOn($mdDialog, 'show');
      $scope.editBook();
      expect($mdDialog.show).toHaveBeenCalled();
    });
  });
});
