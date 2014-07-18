angular.module('starter.controllers')
.controller('OmatersCtrl', function($scope, $stateParams, $firebase, $firebaseSimpleLogin) {
  
  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user===null){
      return;
    }
    // $scope.user = user;
    $scope.isNoFriends = function(){
      var keys = Object.keys($scope.friends);
      var count = 0;
      for (var i = 0; i < keys.length; i++) {
        var fid = keys[i];
        if($scope.user.id!=fid && $scope.friends[fid].connections){
          count++;
        }
      }
      return count==0;
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
