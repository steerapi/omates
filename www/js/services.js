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
  var myRegionsRef;
  auth.$getCurrentUser().then(function(user){
    if(user===null){
      setTimeout(checkLogin,1000);
      return;
    }
    var id = user.id;
    myRegionsRef = new Firebase('https://omates.firebaseio.com/users/'+id+'/regions');
  });
  
  var beacons = {};
  
  $ionicPlatform.ready(function() {
    
    if(!window.cordova || !window.cordova.plugins.locationManager) {
      return;
    }
  
    /**
     * Function that creates a BeaconRegion data transfer object.
     * 
     * @throws Error if the BeaconRegion parameters are not valid.
     */
    var createBeacon = function() {
        var uuid = 'e2c56db5-dffb-48d2-b060-d0f5a71096e0'.toUpperCase(); // mandatory
        var identifier = 'iBeacon'; // mandatory
        var major = 1; // optional, defaults to wildcard if left empty
        var minor = undefined; // optional, defaults to wildcard if left empty

        // throws an error if the parameters are not valid
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

        return beaconRegion;
    }
    var delegate = new cordova.plugins.locationManager.Delegate();
    delegate.didExitRegion = function (pluginResult) {
      var uuid = pluginResult.region.uuid.toUpperCase();
      beacons[uuid].firebaseRef.remove();
      delete beacons[uuid];
    };
    delegate.didEnterRegion = function (pluginResult) {
      var uuid = pluginResult.region.uuid.toUpperCase();
      if(beacons[uuid]){
        return;
      }
      var ref = myRegionsRef.push(uuid);
      // when I disconnect, remove this region
      ref.onDisconnect().remove();
      beacons[uuid] = {
        region: pluginResult.region,
        firebaseRef: ref
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
      return beacons[uuid];
    }
  }
});
