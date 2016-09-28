var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');

var models = require('../../server/models');
var ctrl = require('../../server/controllers/authors');

var res;

describe('Server controller tests', function () {
  before(function () {
    return models.sequelize
    .sync({ force: true })
    .then(function () {
      models.Author.bulkCreate([
        { name: 'Test author 1', bio: 'Test bio' },
        { name: 'Test author 2', bio: 'Test bio' }
      ]);
    });
  });

  beforeEach(function () {
    res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
  });

  describe('Author tests', function () {
    it('Should create a new author', function (done) {
      var req = httpMocks.createRequest({
        body: { name: 'Test Author', bio: 'Test Bio' }
      });

      ctrl.create(req, res);
      res.on('end', function () {
        var response = JSON.parse(res._getData());
        expect(res.statusCode).to.equal(200);
        expect(response.name).to.equal('Test Author');
        done();
      });
    });

    it('Should fetch all authors', function (done) {
      req = httpMocks.createRequest();
      ctrl.index(req, res);
      res.on('end', function () {
        var response = JSON.parse(res._getData());
        expect(res.statusCode).to.equal(200);
        expect(response.length).to.be.above(0);
        done();
      });
    });

    it('Should fetch author by ID', function (done) {
      req = httpMocks.createRequest({
        params: { id: 1 }
      });
      ctrl.show(req, res);
      res.on('end', function () {
        var response = JSON.parse(res._getData());
        expect(res.statusCode).to.equal(200);
        expect(response.name).to.equal('Test author 1');
        done()
      });
    });

    it('Should update an author', function (done) {
      req = httpMocks.createRequest({
        params: { id: 1 },
        body: { name: 'Updated name', bio: 'Updated Bio' }
      });

      ctrl.update(req, res);
      res.on('end', function () {
        models.Author.findById(1)
          .then(function (result) {
            var updatedAuthor = result.get({ plain: true });
            expect(updatedAuthor.name).to.equal('Updated name');
            expect(updatedAuthor.bio).to.equal('Updated Bio');
          });
          done();
      });
    });

    it('Should delete an author by ID', function (done) {
      req = httpMocks.createRequest({
        params: { id: 1 }
      });

      ctrl.delete(req, res);
      res.on('end', function () {
        //Ensure that the author does not exist.
        models.Author.findById(1)
          .then(function (response) {
            expect(response).to.equal(null);
          });
        done();
      });
    });
  });
});
