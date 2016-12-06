let ethDapp = angular.module('ethDapp', ['ngMaterial']);


ethDapp.controller('EthListController', function EthListController($scope, $http) {
  $scope.dappList = [];
  $scope.tweetList = [1,2,3,4];

  $scope.findTweets = (name) => {
    console.log('got clicked with ', name);
  }

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