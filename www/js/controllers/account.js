angular.module('starter.controllers')
.controller('AccountCtrl', function($scope, $state, $ionicModal, $firebase, $firebaseSimpleLogin) {

  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user===null){
      $state.go('signin');
      return;
    }
    var id = user.id;
    var userRef = new Firebase("https://omates.firebaseio.com/users/"+id);
    $scope.account_info = $firebase(userRef);
  }, function(error) {
     console.error('CurrentUser failed: ', error);
  });
  
  $scope.editMode = false;
  $scope.editSave = function(){
    $scope.editMode = !$scope.editMode;
    if(!$scope.editMode){
      $scope.account_info.$save();
    }
  }

  // $ionicModal.fromTemplateUrl('changeaccountinfo.html', function(modal) {
  //     $scope.changeAccountModal = modal;
  //   }, {
  //     scope: $scope
  //   });
  //
  // $scope.openChangeAccount = function() {
  //   $scope.changeAccountModal.show();
  // };
  //
  // $scope.closeChangeAccount = function() {
  //   $scope.changeAccountModal.hide();
  // };
  //
  // $scope.changeAccountInfo = function(newinfo) {
  //   $scope.account_info.$update({
  //     name:newinfo.name
  //   });
  //   $scope.account_info.$update({
  //     team:newinfo.team
  //   });
  //   $scope.account_info.$update({
  //     email:newinfo.email
  //   });
  //   $scope.account_info.$update({
  //     school:newinfo.school
  //   });
  //
  //   $scope.changeAccountModal.hide();
  // };
});
