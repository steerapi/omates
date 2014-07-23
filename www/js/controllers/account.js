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
  
  $scope.signOut = function(user) {
    
    $scope.auth.$logout();
    $state.go('signin');
    
  };
  
  var creditsRef = new Firebase("https://omates.firebaseio.com/credits");
  $scope.credits = $firebase(creditsRef);

  var feedbacksRef = new Firebase("https://omates.firebaseio.com/feedbacks");
  
  $ionicModal.fromTemplateUrl('templates/credits.html', function(modal) {
      $scope.creditsModal = modal;
    }, {
      scope: $scope
    });

  $scope.openCredits = function() {
    $scope.creditsModal.show();
  };

  $scope.closeCredits = function() {
    $scope.creditsModal.hide();
  };

  $ionicModal.fromTemplateUrl('templates/feedback.html', function(modal) {
      $scope.feedbackModal = modal;
    }, {
      scope: $scope
    });

  $scope.openFeedback = function() {
    $scope.feedbackModal.show();
  };

  $scope.closeFeedback = function() {
    $scope.feedbackModal.hide();
  };
  
  $scope.submitFeedback = function(feedback) {
    feedbacksRef.push(feedback);
    $scope.feedbackModal.hide();
  };

});
