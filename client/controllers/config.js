(function() {
  "use strict";

  angular
    .module('config', ['theApp'])
    .config(myAppConfig)

  myAppConfig.$inject = ['$routeProvider'];

  function myAppConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/board.html',
        controller: 'mainController'
      })
  }
})();
