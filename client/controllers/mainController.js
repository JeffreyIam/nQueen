(function() {
  "use strict";

  angular
    .module('theApp', ['ngRoute', 'config'])
    .controller('mainController', mainController);

  mainController.$inject = ['$scope'];

  function mainController($scope) {
    window.loop;
    $scope.queenPuzzle = queenPuzzle;
    $scope.solutionNum;
    $scope.addQueen = addQueen;
    $scope.hasConflict = hasConflict;
    $scope.updateBoard = updateBoard;
    $scope.createBoard = createBoard;
    $scope.boardOption = {
      availableOptions: [
          {id: '1', name: '8 x 8', value: 8},
          {id: '2', name: '7 x 7', value: 7},
          {id: '3', name: '6 x 6', value: 6},
          {id: '4', name: '5 x 5', value: 5},
          {id: '5', name: '4 x 4', value: 4},
          {id: '6', name: '3 x 3', value: 3},
          {id: '7', name: '2 x 2', value: 2}],
      selectedOption:
          {id: '1', value: 8}
    };

    var cfg = {
      position: {
        // d4: 'wR',
        // d1: 'bR',
        // e4: 'wQ'
      }
    };


    function createBoard(n) {
      var number = n;
      if(number === undefined) {
        number = 8;
      }
      clearLoop();
      clearBoard();
      var board1 = ChessBoard('board1', cfg, number)
    }

    function clearBoard() {
      cfg.position = {};
    }

    function clearLoop() {
      clearTimeout(window.loop);
    }

    function updateBoard(num) {
      console.log('getting here');
      function solutionLoop (x, boardSize){
        window.loop = setTimeout(function(){
                        createBoard();
                        answer[x].forEach(function(positionValue, index){
                          var coordinate = alphabet[index] + (boardSize - positionValue);
                          cfg.position[coordinate] = 'wQ';
                        });
                        board1 = ChessBoard('board1', cfg, boardSize);

                        if(++x < answer.length) solutionLoop(x, boardSize);
                      }, 1500);
      }

      var board1 = ChessBoard('board1', cfg, num.value);
      var answer = queenPuzzle(num.value, num.value);
      var alphabet = ['a','b','c','d','e','f','g','h'];
      var holder = {};

      $scope.solutionNum = answer.length;

      if(answer.length > 0){
        solutionLoop(0, num.value);
      }
    }

    function queenPuzzle(rows, columns) {
      if (rows <= 0) {
        return [[]];
      } else {
        return addQueen(rows - 1, columns);
      }
    }

    function addQueen(newRow, columns, prevSolution) {
      var newSolutions = [];
      var prev = queenPuzzle(newRow, columns);
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
        if (solution[i] == newColumn ||
          solution[i] + i == newColumn + newRow ||
          solution[i] - i == newColumn - newRow) {
          return true;
        }
      }
      return false;
    }
  }

})();
