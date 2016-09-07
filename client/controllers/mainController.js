(function() {
  "use strict";

  angular
  .module('theApp', [])
  .controller('mainController', mainController);

  mainController.$inject = ['$scope'];

  function mainController($scope) {
    $scope.message = 'Hello'
  }


})();