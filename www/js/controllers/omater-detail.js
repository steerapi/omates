angular.module('starter.controllers')
.controller('OmaterDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
