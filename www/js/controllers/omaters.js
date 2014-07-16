angular.module('starter.controllers')

.controller('OmatersCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
  
  $scope.friends = [
  {"name":"Jerry", "project":"Kickstarter", "school":"SEAS", "id":1},
  {"name":"Kramer", "project":"Dropbox", "school":"HBS", "id":2},
  ];

})






