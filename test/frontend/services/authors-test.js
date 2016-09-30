describe('Service tests', function () {
  var Authors, httpBackend;

  //Load the mock application module.
  beforeEach(module('Bookmark'));

  //Inject the Authors and $httpBackend services to our tests.
  beforeEach(inject(function (_Authors_, _$httpBackend_) {
    Authors = _Authors_;
    httpBackend = _$httpBackend_;
  }));

  //Mock the post and get requests made by the all
  //and new methods respectively.
  beforeEach(function () {
    httpBackend.when('GET', '/authors').respond(200, [
      {
        name: 'Test Author',
        bio: 'Test Author Name'
      }
    ]);

    httpBackend.when('POST', '/authors').respond(200, {});
  });

  describe('Authors service', function () {
    it('Should return all authors', function (done) {
      Authors.all().then(function (response) {
        expect(response).toBeDefined();
        expect(Array.isArray(response)).toBeTruthy();
        expect(response[0].name).toEqual('Test Author');
        done();
      });

      //Run(flush) any pending requests
      httpBackend.flush();
    });

    it('Should create a new author', function (done) {
      Authors.new().then(function (response) {
        expect(response).toBeDefined();
        done();
      });

      httpBackend.flush();
    });
  });
});
