angular.module('starter.controllers')
.controller('ExchangeDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
