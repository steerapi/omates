angular.module('starter.services')

.factory('$omatesMessageAppender', function($ionicScrollDelegate) {
  return {
    register: function(messages,sender,appendCb) {
      messages.$on("loaded", function() {
        $ionicScrollDelegate.scrollBottom();
      });
      messages.$on("change", function() {
        $ionicScrollDelegate.scrollBottom();
      });
      return function(message){
        if(!message || !message.content){
          return;
        }
        var obj = {
      		content: message.content,
      		uid: sender.id,
          name: sender.name,
          email: sender.email,
          team: sender.team,
          role: sender.role,
          time: new Date().getTime()
      	};
      	messages.$add(obj).then(function(ref){
          if(appendCb){
        	  appendCb(obj,ref);
          }
      	});
        $ionicScrollDelegate.scrollBottom();
      	message.content = "";
      }
    }
  }
})
.factory('$omatesBeacon', function($ionicPlatform, $firebase, $firebaseSimpleLogin){
  var ref = new Firebase("https://omates.firebaseio.com/");
  var auth = $firebaseSimpleLogin(ref);
  var firebaseRefs = {};
  var beacons = {};
  
  var createBeacon = function(_uuid) {
      var uuid = _uuid.toUpperCase(); // mandatory
      var identifier = 'iBeacon'; // mandatory
      var major = 1; // optional, defaults to wildcard if left empty
      var minor = undefined; // optional, defaults to wildcard if left empty

      // throws an error if the parameters are not valid
      var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

      return beaconRegion;
  }

  $ionicPlatform.ready(function() {
    if(!window.cordova || !window.cordova.plugins.locationManager) {
      return;
    }
    
    var delegate = new cordova.plugins.locationManager.Delegate();
    delegate.didExitRegion = function (pluginResult) {
      var uuid = pluginResult.region.uuid.toUpperCase();
      if(firebaseRefs[uuid]){
        firebaseRefs[uuid].remove();
        delete firebaseRefs[uuid];
      }
      delete beacons[uuid];
    };
    delegate.didEnterRegion = function (pluginResult) {
      var uuid = pluginResult.region.uuid.toUpperCase();
      if(beacons[uuid]){
        return;
      }
      if(firebaseRefs[uuid]){
        var ref = firebaseRefs[uuid].push(uuid);
        // when I disconnect, remove this region
        ref.onDisconnect().remove();
      }
      beacons[uuid] = {
        region: pluginResult.region
      };
    };
    delegate.didRangeBeaconsInRegion = function (pluginResult) {
      if(pluginResult && pluginResult.beacons && pluginResult.beacons.length > 0){
        delegate.didEnterRegion(pluginResult);
      }else{
        delegate.didExitRegion(pluginResult);
      }
    };
    cordova.plugins.locationManager.setDelegate(delegate);

    var beaconRegion = createBeacon();
    if(ionic.Platform.isAndroid()){
      cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
                  .fail(console.error)
                  .done();
    }else if(ionic.Platform.isIOS()){
      cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
                  .fail(console.error)
                  .done();
      setTimeout(function(){
        cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
                    .fail(console.error)
                    .done();        
      },10000);
      cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
                  .fail(console.error)
                  .done();
    }    
  });
  
  return {
    isInRegion: function(uuid){
      if(!firebaseRefs[uuid]){         
        auth.$getCurrentUser().then(function(user){
          if(user===null){
            return;
          }
          var id = user.id;
          var ref = new Firebase('https://omates.firebaseio.com/'+uuid+'/users/'+id+'/regions');
          firebaseRefs[uuid] = ref;
        });
      }
      return beacons[uuid];
    }
  }
});
