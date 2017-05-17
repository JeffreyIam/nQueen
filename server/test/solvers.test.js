var chai = require('chai');
var expect = chai.expect;
var Solve = require('../solvers.js');

chai.use(require('chai-things'));

describe('Solver Functions', function() {
  //index of array = n (ignore index 0), and value = number of solutions
  var answers = {
    q: [0, 1, 0, 0, 2, 10, 4, 40, 92],
    r: [0, 1, 2, 6, 24, 120, 720, 5040, 40320]
  };

  describe('Queens Solution Test', function() {

    it('responds with correct number of solutions for n queens', function(done) {
      var result = true;
      for (var i = 1; i < answers.q.length; i++) {
        if (Solve.solve('q', i).solutionNum !== answers.q[i]) {
          result = false;
        }
      }
      expect(result).to.equal(true);
      done();
    })

  })

  describe('Rooks Solution Test', function() {

    it('responds with correct number of solutions for n rooks', function(done) {
      var result = true;
      for (var i = 1; i < answers.r.length; i++) {
        if (Solve.solve('r', i).solutionNum !== answers.r[i]) {
          result = false;
        }
      }
      expect(result).to.equal(true);
      done();
    })

  })

});