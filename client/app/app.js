let ethDapp = angular.module('ethDapp', []);


ethDapp.controller('EthListController', function EthListController($scope, $http) {
  $scope.dappList = [];
  $http({
  method: 'GET',
  url: '/ethdapps',
  params: {searchQuery: 'Ethereum'}
}).then(function successCallback(response) {
  console.log('got response', response.data)
  $scope.dappList = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
});