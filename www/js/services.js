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
          school: sender.school,
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
});
