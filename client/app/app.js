let ethDapp = angular.module('ethDapp', []);


ethDapp.controller('EthListController', function EthListController($scope, $http) {
  $scope.tests = ['hello', 'nice', 'world'];
  $http({
  method: 'GET',
  url: '/ethdapps',
  params: {searchQuery: 'searchQuery123'}
}).then(function successCallback(response) {
  console.log('client', response);
  }, function errorCallback(response) {
    console.log(response);
  });
});