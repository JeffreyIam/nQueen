(function() {
  "use strict";

  angular
    .module('theApp')
    .directive('boarddirective', boardDirective)

  function boardDirective() {
    return {
      restrict: 'E',
      templateUrl: '/board.html',
      controller: 'mainController'
    }
  }

  // myAppConfig.$inject = ['$routeProvider'];

  // function myAppConfig($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: '/board.html',
  //       controller: 'mainController'
  //     })
  // }
})();
