angular.module('starter.controllers')

.controller('ExchangeCtrl', function($scope, $stateParams, $firebase, $firebaseSimpleLogin) {
  
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
  
  var ref = new Firebase("https://omates.firebaseio.com/exchanges");
  $scope.exchanges = $firebase(ref);

  $scope.newExchange = function(exchange) {
  	var obj = {
  		title: exchange.title,
  		uid: $scope.user.id,
      name: $scope.user.name,
      email: $scope.user.email,
      project: $scope.user.project,
      school: $scope.user.school
  	};
    $scope.exchanges.$add(obj).then(function(ref) {
      var updateObj = {};
      obj.id = ref.name();
      updateObj[ref.name()] = obj;
      $scope.exchanges.$update(updateObj)
    });
  	exchange.title = "";
  };

})
