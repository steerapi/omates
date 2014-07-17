angular.module('starter.controllers')
.controller('ChangePasswordCtrl', function($scope, $state, $firebaseSimpleLogin) {

  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  
  $scope.changePassword = function(user) {
    
    $scope.auth.$changePassword(user.email, user.oldPassword, user.newPassword).then(function(newUser) {
       
      $scope.auth.$login('password', {
        email: user.email,
        password: user.password,
        rememberMe: true
      }).then(function(user) {
         $state.go('tab.omaters');
      }, function(error) {
         console.error('Login failed: ', error);
      });
      
    }, function(error) {
       console.error('Login failed: ', error);
    });
    
  };
  
});
