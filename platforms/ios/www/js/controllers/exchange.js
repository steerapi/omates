angular.module('starter.controllers')

.controller('ExchangeCtrl', function($scope, $state, $stateParams, $firebase, $firebaseSimpleLogin, $omatesMessageAppender) {
  
  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user===null){
      $state.go('signin');
      return;
    }
    var uid = user.id;
    var userRef = new Firebase("https://omates.firebaseio.com/users/"+uid);
    $scope.user = $firebase(userRef);
    var ref = new Firebase("https://omates.firebaseio.com/exchanges").limit(50);
    $scope.exchanges = $firebase(ref);
    $scope.newExchange = $omatesMessageAppender.register($scope.exchanges,$scope.user,function(obj,ref){
      var updateObj = {};
      obj.id = ref.name();
      // obj.$priority = new Date().getTime();
      updateObj[obj.id] = obj;
      $scope.exchanges.$update(updateObj)
    });
  });
})
