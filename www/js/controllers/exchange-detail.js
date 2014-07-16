angular.module('starter.controllers')
.controller('ExchangeDetailCtrl', function($scope, $stateParams, $firebase, $firebaseSimpleLogin) {
  var eid = $stateParams.exchangeId;
  
  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user===null){
      return;
    }
    var uid = user.id;
    var userRef = new Firebase("https://omates.firebaseio.com/users/"+uid);
    $scope.user = $firebase(userRef);
  });

  var exchangeRef = new Firebase("https://omates.firebaseio.com/exchanges/"+eid);
  $scope.exchange = $firebase(exchangeRef);
  var ref = new Firebase("https://omates.firebaseio.com/exchanges/"+eid+"/messages");
  $scope.exchange_messages = $firebase(ref);

  $scope.newResponse = function(reply) {
    $scope.exchange_messages.$add({
  		response: reply.response,
  		uid: $scope.user.id,
      name: $scope.user.name,
      email: $scope.user.email,
      project: $scope.user.project,
      school: $scope.user.school
  	});
  	reply.response = "";
  };

})
