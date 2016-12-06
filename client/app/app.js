let ethDapp = angular.module('ethDapp', ['ngMaterial']);


ethDapp.controller('EthListController', function EthListController($scope, $http) {
  $scope.dappList = [];
  $scope.tweetList = ['no tweets yet'];

  $scope.findTweets = (name) => {
    console.log('got clicked with ', name);
    $http({
      method: 'GET',
      url: '/gettweets',
      params: {searchQuery: name}
    }).then(function successCallback(response) {
      console.log('received response: ', response.data);
      $scope.tweetList = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
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