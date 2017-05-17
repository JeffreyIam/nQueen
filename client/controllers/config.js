(function() {
  "use strict";

  angular
    .module('theApp')
    .directive('boarddirective', boardDirective);

  function boardDirective() {
    return {
      restrict: 'E',
      templateUrl: '/board.html',
      controller: 'mainController'
    }
  }
})();
