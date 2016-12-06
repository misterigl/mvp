let ethDapp = angular.module('ethDapp', ['ngMaterial']);


ethDapp.controller('EthListController', function EthListController($scope, $http) {
  $scope.dappList = [];
  $scope.tweetList = [1,2,3,4];
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