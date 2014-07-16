// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter.controllers', ['firebase'])
angular.module('starter.services', [])
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
    .state('signin', {
      url: "/sign-in",
      templateUrl: "templates/sign-in.html",
      controller: 'SignInCtrl'
    })
    .state('signup', {
      url: "/sign-up",
      templateUrl: "templates/sign-up.html",
      controller: 'SignUpCtrl'
    })
    .state('changepassword', {
      url: "/change-password",
      templateUrl: "templates/change-password.html",
      controller: 'ChangePasswordCtrl'
    })
    .state('forgotpassword', {
      url: "/forgot-password",
      templateUrl: "templates/forgot-password.html",
      controller: 'ForgotPasswordCtrl'
    })
    
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.omaters', {
      url: '/omaters',
      views: {
        'tab-omaters': {
          templateUrl: 'templates/tab-omaters.html',
          controller: 'OmatersCtrl'
        }
      }
    })
    .state('tab.omater-detail', {
      url: '/omaters/:detailId',
      views: {
        'tab-omaters': {
          templateUrl: 'templates/omater-detail.html',
          controller: 'OmaterDetailCtrl'
        }
      }
    })
    .state('tab.exchange', {
      url: '/exchange',
      views: {
        'tab-exchange': {
          templateUrl: 'templates/tab-exchange.html',
          controller: 'ExchangeCtrl'
        }
      }
    })
    .state('tab.exchange-detail', {
      url: '/exchange/:exchangeId',
      views: {
        'tab-exchange': {
          templateUrl: 'templates/exchange-detail.html',
          controller: 'ExchangeDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    
  $urlRouterProvider.otherwise("/sign-in");
  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/omaters');

});

