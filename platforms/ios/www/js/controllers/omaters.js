angular.module('starter.controllers')
.controller('OmatersCtrl', function($scope, $stateParams, $firebase, $firebaseSimpleLogin) {
  
  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user===null){
      return;
    }
  }, function(error) {
     console.error('CurrentUser failed: ', error);
  });
  
  var usersRef = new Firebase("https://omates.firebaseio.com/users");
  // Automatically syncs everywhere in realtime
  $scope.friends = $firebase(usersRef);
  $scope.getThreadId = function(uid,fid){
    ids = [+uid,+fid]
    return ids.sort().reverse().join("-")
  }
})






