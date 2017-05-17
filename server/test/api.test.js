var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../app.js');
var Solve = require('../solvers.js');

chai.use(require('chai-things'));

describe('RESTful API', function() {

  describe('/api/solve', function() {

    describe('POST', function() {

      var validQueenInput = {
        "chessPiece": "q",
        "n": "4"
      };


      it('responds with a 200 and correct results with valid queen input', function(done) {

        request(app)
          .post('/api/solve')
          .send(validQueenInput)
          .expect(200, {
            solutionNum: 2,
            chessPiece: 'q',
            solutions: [
              [1, 3, 0, 2],
              [2, 0, 3, 1]
            ]
          }, done);

      });

    });

    describe('POST', function() {

      var validRookInput = {
        "chessPiece": "r",
        "n": "2"
      };

      it('responds with a 200 and correct results with valid rook input', function(done) {

        request(app)
          .post('/api/solve')
          .send(validRookInput)
          .expect(200, {
            solutionNum: 2,
            chessPiece: 'r',
            solutions: [
              [0, 1],
              [1, 0]
            ]
          }, done);
      });

    });

    describe('POST', function() {

      var invalidQueenInput = {
        "chessPiece": "q",
        "n": "20"
      };


      it('responds with a 400 and has correct error response', function(done) {
        request(app)
          .post('/api/solve')
          .send(invalidQueenInput)
          .expect(400, "Solutions are not available", done);
      });
    });

    describe('POST', function() {

      var invalidRookInput = {
        "chessPiece": "r",
        "n": "0"
      };

      it('responds with a 400 and has correct error response', function(done) {

        request(app)
          .post('/api/solve')
          .send(invalidRookInput)
          .expect(400, "Solutions are not available", done);
      });
    });
  });
});