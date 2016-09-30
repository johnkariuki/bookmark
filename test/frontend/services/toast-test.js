describe('Service tests', function () {
  var Toast, $mdToast;

  //Load the mock application module.
  beforeEach(module('Bookmark'));

  //Inject the Toast and $httpBackend services to our tests.
  beforeEach(inject(function (_Toast_, _$mdToast_) {
    Toast = _Toast_;
    $mdToast = _$mdToast_;
    spyOn($mdToast, 'show');
  }));

  describe('Toast service', function () {
    it('Should call $mdToast.show method', function () {
      Toast.show('message', 'top right', 1000);
      expect($mdToast.show).toHaveBeenCalled();
    });
  });
});
