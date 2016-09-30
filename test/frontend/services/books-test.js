describe('Service tests', function () {
  var Books, httpBackend;

  //Load the mock application module.
  beforeEach(module('Bookmark'));

  //Inject the Books and $httpBackend services to our tests.
  beforeEach(inject(function (_Books_, _$httpBackend_) {
    Books = _Books_;
    httpBackend = _$httpBackend_;
  }));

  //Mock the post and get requests made by the all
  //and new methods respectively.
  beforeEach(function () {
    httpBackend.when('POST', '/books').respond(200, {});
    httpBackend.when('PUT', '/books/1').respond(200, {});
    httpBackend.when('DELETE', '/books/1').respond(200, {});
  });

  describe('Books service', function () {
    it('Should create a new book', function (done) {
      Books.new().then(function (response) {
        expect(response).toBeDefined();
        done();
      });

      httpBackend.flush();
    });

    it('Should edit a book', function (done) {
      Books.update({ id: 1 }).then(function (response) {
        expect(response).toBeDefined();
        done();
      });

      //Run(flush) any pending requests
      httpBackend.flush();
    });

    it('Should delete a book', function (done) {
      Books.delete(1).then(function (response) {
        expect(response).toBeDefined();
        done();
      });

      //Run(flush) any pending requests
      httpBackend.flush();
    });

  });
});
