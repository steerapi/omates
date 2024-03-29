angular.module('starter.controllers')
.controller('SignInCtrl', function($scope, $state, $firebaseSimpleLogin) {

  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user!==null){
      $state.go('tab.omaters');      
    }
  }, function(error) {
     console.error('Login failed: ', error);
  });
  
  $scope.signIn = function(user) {
    $scope.auth.$login('password', {
      email: user.email,
      password: user.password,
      rememberMe: true
    }).then(function(user) {
       $state.go('tab.omaters');
    }, function(error) {
       console.error('Login failed: ', error);
    });
    user.password = "";
  };
  
});
