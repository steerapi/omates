angular.module('starter.controllers')

.controller('ExchangeCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);

  $scope.exchanges = [
  	{"title":"Is there any coffee?", "id":1},
  	{"title":"Is room 102 reserved now?", "id":2},
  ];

})
