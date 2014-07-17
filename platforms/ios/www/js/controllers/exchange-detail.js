angular.module('starter.controllers')
.controller('ExchangeDetailCtrl', function($scope, $stateParams, $firebase, $firebaseSimpleLogin, $omatesMessageAppender) {
  var eid = $stateParams.exchangeId;
  
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

    var exchangeRef = new Firebase("https://omates.firebaseio.com/exchanges/"+eid);
    $scope.exchange = $firebase(exchangeRef);  
    var ref = new Firebase("https://omates.firebaseio.com/exchanges/"+eid+"/messages").limit(50);
    $scope.exchange_messages = $firebase(ref);
    $scope.newMessage = $omatesMessageAppender.register($scope.exchange_messages, $scope.user);
  });



})
