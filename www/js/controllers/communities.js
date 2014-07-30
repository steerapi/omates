angular.module('starter.controllers')
.controller('CommunitiesCtrl', function($scope, $state, $stateParams, $firebase, $firebaseSimpleLogin, $timeout) {
  
  var ref = new Firebase("https://omates.firebaseio.com/regions");
  $scope.items = $firebase(ref);
  
  // $scope.items = [{
  //   title: "hi",
  //   description: "hello",
  //   img: "./img/ilab.jpg"
  // },
  // {
  //   title: "hi2",
  //   description: "hello2",
  //   img: "./img/ilab.jpg"
  // },
  // {
  //   title: "hi3",
  //   description: "hello3",
  //   img: "./img/ilab.jpg"
  // },
  // {
  //   title: "hi4",
  //   description: "hello4",
  //   img: "./img/ilab.jpg"
  // },
  // {
  //   title: "hi2",
  //   description: "hello2",
  //   img: "./img/ilab.jpg"
  // },
  // {
  //   title: "hi3",
  //   description: "hello3",
  //   img: "./img/ilab.jpg"
  // },
  // {
  //   title: "hi4",
  //   description: "hello4",
  //   img: "./img/ilab.jpg"
  // }];
  
  $scope.toggleEdit = function(){
    $scope.shouldShowReorder = !$scope.shouldShowReorder;
    if(!$scope.shouldShowReorder){
      console.log("save");
      console.log("items",$scope.items);
    }
  }
  
  $scope.listCanSwipe = true;
  $scope.deleteItem = function(item){
    item.$remove();
  }
  $scope.reorderItem = function(item, fromIndex, toIndex){
    // console.log("items",$scope.items,item,fromIndex, toIndex);
    // $scope.items.$remove(fromIndex,1);
    // $scope.items.splice(toIndex,0,item);
    // console.log("items",$scope.items,item,fromIndex, toIndex);
  }
  
  $scope.selectItem = function(item){
    $state.go('tab.omaters',{roomId: item.id});
  }
})
