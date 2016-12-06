let ethDapp = angular.module('ethDapp', []);


ethDapp.controller('EthListController', function EthListController($scope, $http) {
  $scope.dappList = [];
  $http({
  method: 'GET',
  url: '/ethdapps',
  params: {searchQuery: 'all'}
}).then(function successCallback(response) {
  $scope.dappList = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
});