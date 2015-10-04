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

App.host_addr = "http://localhost:8000";

App.controllers.controller('AppCtrl', function($scope, $ionicPlatform, $ionicModal, $ionicPopup, $ionicHistory, $timeout, $location, User) {
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
  $scope.UserData = {};
  $scope.isLogged = function() {
    return $scope.UserData.hasOwnProperty('token');
  };
  $ionicModal.fromTemplateUrl('templates/social/login.html', {
    scope: $scope,
    backdropClickToClose: false
  }).then(function(modal) {
    $scope.modal = modal;
    if (!$scope.isLogged()) {
      $scope.login();
    }
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
    User.login($scope.loginData, function(data) {
      var alertPopup;
      if (data.hasOwnProperty('access_token')) {
        $scope.UserData.token = data.token_type + ' ' + data.access_token;
        $scope.closeLogin();
      } else {
        alertPopup = $ionicPopup.alert({
          title: 'Login Failed',
          template: 'The credentials are invalid'
        });
        alertPopup.show();
      }
    });
  };
  $scope.doLogout = function() {
    $scope.loginData.password = "";
    $scope.UserData = {};
    return $scope.login();
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
  $scope.likeEvent = function(id) {
    Event.likeEvent(id, function(response) {
      if (response === true) {
        return;
      } else {
        alert("fail");
      }
    });
  };
  $scope.registerEvent = function(id) {
    Event.registerEvent(id, function(response) {
      if (response === true) {
        return;
      } else {
        alert("fail");
      }
    });
  };
});

App.services.factory('Event', function($http) {
  var data, getEvent, getEvents, likeEvent, registerEvent;
  data = [
    {
      "id": 0,
      "name": "event1",
      "likes": 4
    }, {
      "id": 1,
      "name": "event2",
      "likes": 5
    }
  ];
  getEvents = function(filters, callback) {
    callback(data);
  };
  getEvent = function(id, callback) {
    callback(data[id]);
  };
  likeEvent = function(id, callback) {
    data[id].likes += 1;
    callback(true);
  };
  registerEvent = function(id, callback) {
    callback(false);
  };
  return {
    getEvents: getEvents,
    getEvent: getEvent,
    likeEvent: likeEvent,
    registerEvent: registerEvent
  };
});

App.services.factory('User', function($http) {
  var login;
  login = function(loginData, callback) {
    $http({
      url: App.host_addr + "/o/token/",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic aTJKQm1oVUN4QWMydDJIS1dscUhVMmxCV1U5UWZqZTNwdTFDMG5iRzpHbHFHc0RHZG4xWTBlREJQWW9idk84ZmZrRDJVQ0d4cllMR21rZE9ZalAwQTA4U01HVVI1Vnl4Y3d1bHBDZzF4RjUwVkw0ZExSUnR4cmZsOGZQbnNFQ21MdTB0eG11RDdkdGZ5WVhlS2tDQlE5SFBsQXM3WnZUTmh2a2VyYktBMA=="
      },
      transformRequest: function(obj) {
        var p, str;
        str = [];
        for (p in obj) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      },
      data: {
        "grant_type": "password",
        "username": loginData.username,
        "password": loginData.password,
        "scope": "read"
      }
    }).success((function(data, status, headers, config) {
      callback(data);
    })).error((function(data, status, headers, config) {
      console.log("Login failed");
      callback(data);
    }));
  };
  return {
    login: login
  };
});
