angular.module('starter.controllers')
.controller('CommunitiesCtrl', function($scope, $stateParams, $firebase, $firebaseSimpleLogin, $timeout) {
  
  $scope.items = [{
    title: "hi",
    description: "hello",
    img: "./img/ilab.jpg"
  },
  {
    title: "hi2",
    description: "hello2",
    img: "./img/ilab.jpg"
  },
  {
    title: "hi3",
    description: "hello3",
    img: "./img/ilab.jpg"
  },
  {
    title: "hi4",
    description: "hello4",
    img: "./img/ilab.jpg"
  },
  {
    title: "hi2",
    description: "hello2",
    img: "./img/ilab.jpg"
  },
  {
    title: "hi3",
    description: "hello3",
    img: "./img/ilab.jpg"
  },
  {
    title: "hi4",
    description: "hello4",
    img: "./img/ilab.jpg"
  }];
  
  $scope.toggleEdit = function(){
    $scope.shouldShowReorder = !$scope.shouldShowReorder;
    if(!$scope.shouldShowReorder){
      console.log("save");
      console.log("items",$scope.items);
    }
  }
  
  $scope.listCanSwipe = true;
  $scope.deleteItem = function(){
    
  }
  $scope.reorderItem = function(item, fromIndex, toIndex){
    // console.log("items",$scope.items,item,fromIndex, toIndex);
    $scope.items.splice(fromIndex,1);
    $scope.items.splice(toIndex,0,item);
    // console.log("items",$scope.items,item,fromIndex, toIndex);
  }
  
  var ref = new Firebase("https://omates.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user){
    if(user===null){
      return;
    }
    var id = user.id;
    var userRef = new Firebase("https://omates.firebaseio.com/users/"+id);
    userRef.setPriority(-(new Date().getTime()));
  }, function(error) {
     console.error('CurrentUser failed: ', error);
  });
  
  var usersRef = new Firebase("https://omates.firebaseio.com/users").limit(100); //30 days
  // Automatically syncs everywhere in realtime
  $scope.friends = $firebase(usersRef);
  $scope.getThreadId = function(uid,fid){
    ids = [+uid,+fid]
    return ids.sort().reverse().join("-")
  }
  
  $scope.isInRegion = function(){
    return $omatesBeacon.isInRegion("E2C56DB5-DFFB-48D2-B060-D0F5A71096E0");
  }
  // $scope.$on("ibeacon:didEnterRegion", function(e,data){
  //   cordova.plugins.locationManager.appendToDeviceLog('[DOM] ibeacon:didEnterRegion: '
  //       + JSON.stringify(data));
  //   if(data.region.uuid.toUpperCase()==="E2C56DB5-DFFB-48D2-B060-D0F5A71096E0"){
  //     $timeout(function(){
  //       $scope.data = data.eventType;
  //     });
  //   }
  // });
  // $scope.$on("ibeacon:didExitRegion", function(e,data){
  //   cordova.plugins.locationManager.appendToDeviceLog('[DOM] ibeacon:didExitRegion: '
  //       + JSON.stringify(data));
  //   if(data.region.uuid.toUpperCase()==="E2C56DB5-DFFB-48D2-B060-D0F5A71096E0"){
  //     $timeout(function(){
  //       $scope.data = data.eventType;
  //     });
  //   }
  // });
  // $scope.$on("ibeacon:didRangeBeaconsInRegion", function(e,data){
  //   cordova.plugins.locationManager.appendToDeviceLog('[DOM] ibeacon:didRangeBeaconsInRegion: '
  //       + JSON.stringify(data));
  //   if(data.region.uuid.toUpperCase()==="E2C56DB5-DFFB-48D2-B060-D0F5A71096E0"){
  //     $timeout(function(){
  //       $scope.data = data.eventType;
  //     });
  //   }
  // });
})
