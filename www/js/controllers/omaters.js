angular.module('starter.controllers')
.controller('OmatersCtrl', function($scope, $stateParams, $firebase, $firebaseSimpleLogin) {
  
  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user===null){
      return;
    }
    var id = user.id;
    var userRef = new Firebase("https://omates.firebaseio.com/users/"+id);
    $scope.user = $firebase(userRef);
    $scope.user.$update({
      id: user.id,
      name: user.name,
      email: user.email,
      project: user.project,
      school: user.school
    });
    // since I can connect from multiple devices or browser tabs, we store each connection instance separately
    // any time that connectionsRef's value is null (i.e. has no children) I am offline
    var myConnectionsRef = new Firebase('https://omates.firebaseio.com/users/'+id+'/connections');

    // stores the timestamp of my last disconnect (the last time I was seen online)
    var lastOnlineRef = new Firebase('https://omates.firebaseio.com/users/'+id+'/lastOnline');

    var connectedRef = new Firebase('https://omates.firebaseio.com/.info/connected');
    connectedRef.on('value', function(snap) {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

        // add this device to my connections list
        // this value could contain info about the device or a timestamp too
        var con = myConnectionsRef.push(true);

        // when I disconnect, remove this device
        con.onDisconnect().remove();

        // when I disconnect, update the last time I was seen online
        lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
      }
    });
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






