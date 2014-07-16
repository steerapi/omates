angular.module('starter.controllers', [])
.controller('OmaterCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
