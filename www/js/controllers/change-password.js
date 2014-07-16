angular.module('starter.controllers')
.controller('ChangePasswordCtrl', function($scope, $state, $firebaseSimpleLogin) {

  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  
  $scope.changePassword = function(user) {
    
    $scope.auth.$changePassword(user.email, user.oldPassword, user.newPassword).then(function(user) {
       console.log('Logged in as: ', user.uid);
    }, function(error) {
       console.error('Login failed: ', error);
    });
    
    $state.go('tab.omaters');
  };
  
});
