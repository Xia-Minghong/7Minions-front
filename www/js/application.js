angular.module('starter', ['ionic', 'starter.controllers', 'starter.services']).run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/social/menu.html',
    controller: 'AppCtrl'
  }).state('app.events', {
    url: '/events',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/events.html',
        controller: 'eventsCtrl'
      }
    }
  }).state('app.eventdetails', {
    url: '/eventdetails/{eventId}',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/event-details.html',
        controller: 'eventsCtrl'
      }
    }
  }).state('app.start', {
    url: '/start',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/start-fullscreen.html'
      }
    }
  }).state('app.fgrid', {
    url: '/fgrid',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/friend-grid.html'
      }
    }
  }).state('app.flist', {
    url: '/flist',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/friends.html'
      }
    }
  }).state('app.newpost', {
    url: '/newpost',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/new-post.html'
      }
    }
  }).state('app.email', {
    url: '/email',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/send-email.html'
      }
    }
  }).state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/profile.html'
      }
    }
  }).state('app.timeline', {
    url: '/timeline',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/timeline.html'
      }
    }
  }).state('app.editprofile', {
    url: '/editprofile',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/profile-edit.html'
      }
    }
  }).state('app.profiletwo', {
    url: '/profiletwo',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/profile2.html'
      }
    }
  }).state('app.profilethree', {
    url: '/profilethree',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/profile3.html'
      }
    }
  }).state('app.news', {
    url: '/news',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/news.html'
      }
    }
  }).state('app.eventdetails2', {
    url: '/eventdetails2',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/view-post.html'
      }
    }
  }).state('app.invite', {
    url: '/invite',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/social-invite-friend.html'
      }
    }
  });
  $urlRouterProvider.otherwise('/app/events');
});

window.App = {};

App.controllers = angular.module('starter.controllers', []);

App.services = angular.module('starter.services', []);

App.services.factory('Event', function($http) {
  var data, getEvent, getEvents;
  data = [
    {
      "id": 0,
      "name": "event1"
    }, {
      "id": 1,
      "name": "event2"
    }
  ];
  getEvents = function(filters, callback) {
    callback(data);
  };
  getEvent = function(id, callback) {
    callback(data[id]);
  };
  return {
    getEvents: getEvents,
    getEvent: getEvent
  };
});

App.services.factory('User', function($http) {
  var login;
  login = function(loginData, callback) {
    alert("do something");
    callback(true);
  };
  return {
    login: login
  };
});

App.controllers.controller('AppCtrl', function($scope, $ionicModal, $ionicHistory, $timeout, $location, User) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  $scope.go = function(path) {
    return $location.path(path);
  };
  $scope.control = {
    showLogin: true
  };
  $scope.loginData = {};
  $ionicModal.fromTemplateUrl('templates/social/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.login = function() {
    $scope.modal.show();
  };
  $scope.backLogin = function() {
    return $scope.control.showLogin = true;
  };
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    User.login($scope.loginData, function(isLogin) {
      if (isLogin === true) {
        $scope.closeLogin();
      } else {
        alert("1");
      }
    });
  };
  $scope.signUp = function() {
    $scope.control.showLogin = false;
  };
  $scope.doSignUp = function() {
    $timeout((function() {
      $scope.closeLogin();
    }), 1000);
  };
});

App.controllers.controller('eventsCtrl', function($scope, $stateParams, Event) {
  $scope.initEvents = function() {
    Event.getEvents([], function(data) {
      $scope.events = data;
    });
  };
  $scope.initEvent = function() {
    Event.getEvent($stateParams.eventId, function(data) {
      $scope.event = data;
    });
  };
});
