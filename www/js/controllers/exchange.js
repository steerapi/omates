angular.module('starter.controllers')
.controller('ExchangeCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
