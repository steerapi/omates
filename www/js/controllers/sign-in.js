angular.module('starter.controllers')
.controller('SignInCtrl', function($scope, $state, $firebaseSimpleLogin, $ionicModal) {

  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user!==null){
      $state.go('communities');      
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
       $state.go('communities');   
    }, function(error) {
       console.error('Login failed: ', error);
    });
    user.password = "";
  };
  
$ionicModal.fromTemplateUrl('intromodal.html', function(modal) {
    $scope.introModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  // Open our new task modal
  $scope.openIntro = function() {
    $scope.introModal.show();
  };

  // Close the new task modal
  $scope.closeIntro = function() {
    $scope.introModal.hide();
  };


  // $ionicModal.fromTemplateUrl('intromodal.html', {
  //     scope: $scope,
  //     animation: 'slide-in-up'
  //   }).then(function(modal) {
  //     $scope.modal = modal;
  //   });
  //   $scope.openModal = function() {
  //     console.log('opening')
  //     $scope.modal.show();
  //   };
  //   $scope.closeModal = function() {
  //     $scope.modal.hide();
  //   };
  //   //Cleanup the modal when we're done with it!
  //   $scope.$on('$destroy', function() {
  //     $scope.modal.remove();
  //   });
  //   // Execute action on hide modal
  //   $scope.$on('modal.hidden', function() {
  //     // Execute action
  //   });
  //   // Execute action on remove modal
  //   $scope.$on('modal.removed', function() {
  //     // Execute action
  //   });


});
