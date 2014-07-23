angular.module('starter.controllers')
.controller('ForgotPasswordCtrl', function($scope, $state, $firebaseSimpleLogin) {

  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  
  $scope.reset = function(user) {
    $scope.auth.$sendPasswordResetEmail(user.email)
    .then(function(user) {
       console.log('Logged in as: ', user.uid);
    }, function(error) {
       console.error('Login failed: ', error);
    });
  };
  
});
