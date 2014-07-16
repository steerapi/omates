angular.module('starter.controllers')
.controller('OmaterDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);


  $scope.friend = {"name":"Kramer", "project":"Dropbox", "school":"HBS", "id":2};
  $scope.messages = [
  	{"response":"Hi, how are you?", "friend_id":2},
  	{"response":"Good thanks, how are you?", "friend_id":3},
  ];
  $scope.myID = 3;


  $scope.newMessage = function(message) {
  	$scope.messages.push({
  		response: message.response,
  		friend_id:$scope.myID
  	});
  	message.response = "";
  };


})
