angular.module('starter.controllers')
.controller('SignUpCtrl', function($scope, $state, $firebase, $firebaseSimpleLogin) {

  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);

  var usersRef = new Firebase("https://omates.firebaseio.com/users");
  $scope.users = $firebase(usersRef);
  $scope.addPerson = function(id,user) {
    // AngularFire $add method
    var obj = {};
    obj[id] = {
      id: id,
      name: user.name,
      role: user.role,
      email: user.email,
      team: user.team
    };
    $scope.users.$update(obj);
  }
  
  $scope.signUp = function(userObj) {
    
    $scope.auth.$createUser(userObj.email, userObj.password).then(function(user) {
       $scope.addPerson(user.id, userObj);

       $scope.auth.$login('password', {
         email: userObj.email,
         password: userObj.password,
         rememberMe: true
       }).then(function(user) {
         $state.go('communities');
       }, function(error) {
          console.error('Login failed: ', error);
       });
       
    }, function(error) {
       console.error('Login failed: ', error);
    });
    
  };
  
});
