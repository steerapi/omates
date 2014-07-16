angular.module('starter.controllers')
.controller('OmaterDetailCtrl', function($scope, $stateParams, $firebase, $firebaseSimpleLogin) {
  var id = $stateParams.detailId;
  var ids = id.split("-");
  
  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user===null){
      return;
    }
    var uid = user.id;
    var userRef = new Firebase("https://omates.firebaseio.com/users/"+uid);
    fid = ids.filter(function(id){ return id!==uid})[0];
    var friendRef = new Firebase("https://omates.firebaseio.com/users/"+fid);
    $scope.user = $firebase(userRef);
    $scope.friend = $firebase(friendRef);
  });
  
  var ref = new Firebase("https://omates.firebaseio.com/messages/"+id);
  $scope.messages = $firebase(ref);
  
  // $scope.friend = {"name":"Kramer", "project":"Dropbox", "school":"HBS", "id":2};
  // $scope.messages = [
  //   {"response":"Hi, how are you?", "uid":2},
  //   {"response":"Good thanks, how are you?", "uid":3},
  // ];

  $scope.newMessage = function(message) {
  	$scope.messages.$add({
  		response: message.response,
  		uid:$scope.user.id,
      name: $scope.user.name,
      email: $scope.user.email
  	});
  	message.response = "";
  };


})
