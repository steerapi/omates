angular.module('starter.controllers')
.controller('AccountCtrl', function($scope, $ionicModal) {

	$scope.account_info = {
		"name":"George", 
		"project":"Cool Business Ventures", 
		"email":"george@coolbusinessventures.com",
		"school":"SEAS",
		"password":"*********",
	};

	$ionicModal.fromTemplateUrl('changeaccountinfo.html', function(modal) {
	    $scope.changeAccountModal = modal;
	  }, {
	    scope: $scope
	  });


	$scope.openChangeAccount = function() {
		$scope.changeAccountModal.show();
	};

	$scope.closeChangeAccount = function() {
		$scope.changeAccountModal.hide();
	};

	$scope.changeAccountInfo = function(newinfo) {
		$scope.account_info.name = newinfo.name;
		$scope.account_info.project = newinfo.project;
		$scope.account_info.email = newinfo.email;
		$scope.account_info.school = newinfo.school;
		$scope.account_info.password = newinfo.password;

		$scope.changeAccountModal.hide();
	};
});
