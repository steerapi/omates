angular.module('starter.controllers')
.controller('SignUpCtrl', function($scope, $state, $firebase, $firebaseSimpleLogin) {

  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);

  var usersRef = new Firebase("https://omates.firebaseio.com/users");
  // Automatically syncs everywhere in realtime
  $scope.users = $firebase(usersRef);
  $scope.addPerson = function(id,user) {
    // AngularFire $add method
    var obj = {};
    obj[id] = {
      id: id,
      name: user.name, 
      school: user.school, 
      email: user.email, 
      project: user.project
    };
    $scope.users.$update(obj);
  }
  
  $scope.signUp = function(userObj) {
    
    $scope.auth.$createUser(userObj.email, userObj.password).then(function(user) {

       $scope.auth.$login('password', {
         email: userObj.email,
         password: userObj.password,
         rememberMe: true
       }).then(function(user) {
          console.log('Logged in as: ', user.uid);
       }, function(error) {
          console.error('Login failed: ', error);
       });
       
       $scope.addPerson(user.id, userObj);
       $state.go('tab.omaters');
    }, function(error) {
       console.error('Login failed: ', error);
    });
    
  };
  
});
