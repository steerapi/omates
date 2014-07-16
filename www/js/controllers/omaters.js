angular.module('starter.controllers')
.controller('OmatersCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
