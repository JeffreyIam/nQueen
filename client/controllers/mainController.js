(function() {
  "use strict";

  angular
    .module('theApp', [])
    .controller('mainController', mainController);

  mainController.$inject = ['$scope', '$http'];

  function mainController($scope, $http) {
    window.loop;
    $scope.solutions;
    $scope.getSolution = getSolution;
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
      selectedOption: {
        id: '1',
        value: 8
      }
    };

    var cfg = {
      position: {
      }
    };

    var piece = "";

    function createBoard(n) {
      var number = n;
      if (number === undefined) {
        number = 8;
      }
      $scope.solutionNum = undefined;
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

    function getSolution(piece, boardSize) {
      $http({
        method: 'POST',
        url: '/api/solve',
        data: {chessPiece: piece, n: boardSize}
      }).then(function success(res) {
        updateBoard(boardSize, res.data);
      }, function error(res) {
        console.log(res.data);
      });
    }

    function updateBoard(num, dataObj) {
      var board1 = ChessBoard('board1', cfg, num);
      var answer = dataObj.solutions;
      var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      piece = dataObj.chessPiece;

      if (dataObj.chessPiece !== 'q' && dataObj.chessPiece !== 'r') {
        console.log('error with selected chess piece:', chessPiece);
        return;
      }

      function solutionLoop(x, boardSize) {
        window.loop = setTimeout(function() {
          createBoard();
          answer[x].forEach(function(positionValue, index) {
            var coordinate = alphabet[index] + (boardSize - positionValue);
            if (piece === 'q') {
              cfg.position[coordinate] = 'wQ';
            }
            if (piece === 'r') {
              cfg.position[coordinate] = 'wR';
            }
          });
          board1 = ChessBoard('board1', cfg, boardSize);
          $scope.solutionNum = x + 1;
          if (++x < answer.length) solutionLoop(x, boardSize);
        }, 1500);
      }

      $scope.solutions = dataObj.solutionNum;

      if (answer.length > 0) {
        solutionLoop(0, num);
      }
    }
  }
})();
