angular.module('starter.controllers')
.controller('OmaterDetailCtrl', function($scope, $state, $stateParams, $firebase, $firebaseSimpleLogin, $omatesMessageAppender) {
  var id = $stateParams.detailId;
  var ids = id.split("-");
  
  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user===null){
      $state.go('signin');
      return;
    }
    var uid = user.id;
    var userRef = new Firebase("https://omates.firebaseio.com/users/"+uid);
    var fid = ids.filter(function(id){ return id!==uid})[0];
    var friendRef = new Firebase("https://omates.firebaseio.com/users/"+fid);
    $scope.user = $firebase(userRef);
    $scope.friend = $firebase(friendRef);
    var msgRef = new Firebase("https://omates.firebaseio.com/messages/"+id);
    
    var funread = friendRef.child("unread-by-"+uid);
    funread.remove();
    var funreadOnValue = function(){
      funread.remove();
    };
    funread.on('value',funreadOnValue);
    
    $scope.messages = $firebase(msgRef.limit(50));
    var numMsgs = 0;
    
    var unread = userRef.child("unread-by-"+fid);
    var unreadOnValue = function(snap) {
      if(snap.val()==null){
        numMsgs = 0;
      }else{
        numMsgs = +snap.val();
      }
    };
    unread.on('value', unreadOnValue);
    
    $scope.$on('$destroy', function cleanup() {
      funread.off('value',funreadOnValue);
      funread.off('value',unreadOnValue);
    });
    
    $scope.newMessage = $omatesMessageAppender.register($scope.messages, $scope.user, function(obj,ref){
      numMsgs++;
      unread.set(numMsgs);
    });
  });

})
