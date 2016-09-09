(function() {

  var piece;

  function puzzle(rows, columns){
    if (rows <= 0) {
      return [
        []
      ];
    } else {
      return addQueenOrRook(rows - 1, columns);
    }
  }

  function addQueenOrRook (newRow, columns, prevSolution){
    var newSolutions = [];
      var prev = puzzle(newRow, columns);
      for (var i = 0; i < prev.length; i++) {
        var solution = prev[i];
        for (var newColumn = 0; newColumn < columns; newColumn++) {
          if (!hasConflict(newRow, newColumn, solution))
            newSolutions.push(solution.concat([newColumn]));
        }
      }
      return newSolutions;
  }

  function hasConflict(newRow, newColumn, solution) {
    for (var i = 0; i < newRow; i++) {
      if (piece === 'q') {
        if (solution[i] == newColumn ||
          solution[i] + i == newColumn + newRow ||
          solution[i] - i == newColumn - newRow) {
          return true;
        }
      } else {
        if (
          solution[i] == newColumn
        ) {
          return true;
        }
      }
    }
    return false;
  }

  exports.solve = function(chessPiece, n) {
    piece = chessPiece;
    var solutions = puzzle(n, n);
    var obj = {
      solutions: solutions,
      solutionNum: solutions.length,
      chessPiece: chessPiece
    }
    return obj;
  }
})();

