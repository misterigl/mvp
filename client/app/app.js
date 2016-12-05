var ethDapp = angular.module('ethDapp', []);


ethDapp.controller('EthListController', function EthListController($scope) {
  $scope.tests = ['hello', 'nice', 'world'];

});