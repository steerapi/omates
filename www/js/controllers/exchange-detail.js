angular.module('starter.controllers')
.controller('ExchangeDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
  $scope.exchange = 
  	{"title":"Is there any coffee?", "id":1};

  $scope.exchange_messages = [
  	{"response":"I'm not sure, let me check.", "associated_exchange_id":1, "friend_id":2},
  	{"response":"Yes!", "associated_exchange_id":1, "friend_id":2},
  ];

  $scope.newResponse = function(reply) {
  	$scope.exchange_messages.push({
  		response: reply.response,
  		associated_exchange_id: 1,
  		friend_id: 3
  	});
  	reply.response = "";
  };

})
