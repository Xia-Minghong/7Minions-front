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
    url: '/profile/{userId}',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/profile.html',
        controller: 'userCtrl'
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
        templateUrl: 'templates/social/profile-edit.html',
        controller: 'userCtrl'
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
        templateUrl: 'templates/social/social-invite-friend.html',
        controller: 'userCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/app/start');
});

window.App = {};

App.controllers = angular.module('starter.controllers', []);

App.services = angular.module('starter.services', []);

App.host_addr = "http://localhost:8000";

App.controllers.controller('AppCtrl', function($scope, $ionicPlatform, $ionicModal, $ionicPopup, $ionicHistory, $state, $timeout, $location, User) {
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
  $scope.signUpData = {};
  $scope.userData = {};
  $scope.isLogged = function() {
    return $scope.userData.hasOwnProperty('token');
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
        $scope.userData.token = data.token_type + ' ' + data.access_token;
        User.getProfile($scope.userData.token, "0", function(data) {
          var token;
          token = $scope.userData.token;
          $scope.userData = data;
          $scope.userData.token = token;
          $state.go('app.events');
        });
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
    $scope.userData = {};
    return $scope.login();
  };
  $scope.signUp = function() {
    $scope.control.showLogin = false;
  };
  $scope.doSignUp = function() {
    console.log('Doing signup', $scope.signUpData);
    User.signUp($scope.signUpData, function(data) {
      var alertPopup;
      if (data.hasOwnProperty('user')) {
        $scope.control.showLogin = true;
        alertPopup = $ionicPopup.alert({
          title: 'Sign Up Successful',
          template: 'Please login'
        });
        alertPopup.show();
      } else {
        alertPopup = $ionicPopup.alert({
          title: 'Sign Up Failed',
          template: 'Please retry'
        });
        alertPopup.show();
      }
    });
  };
});

App.controllers.controller('eventsCtrl', function($scope, $stateParams, Event) {
  $scope.initEvents = function() {
    Event.getEvents($scope.userData.token, [], function(data) {
      $scope.events = data;
      console.log($scope.userData.token);
    });
  };
  $scope.initEvent = function() {
    Event.getEvent($scope.userData.token, $stateParams.eventId, function(data) {
      $scope.event = data;
    });
  };
  $scope.likeEvent = function(id) {
    Event.likeEvent($scope.userData.token, id, function(response) {
      if (response === true) {
        $scope.initEvents();
        $scope.initEvent();
        return;
      } else {
        console.log("like fail");
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
  $scope.parseDate = function(timestamp) {
    var date, datetime, i, suffix, time;
    datetime = new Date(timestamp);
    date = [datetime.getDate(), datetime.getMonth() + 1, datetime.getFullYear()];
    time = [datetime.getHours(), datetime.getMinutes()];
    suffix = time[0] < 12 ? 'AM' : 'PM';
    time[0] = time[0] < 12 ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;
    i = 1;
    while (i < 3) {
      if (time[i] < 10) {
        time[i] = '0' + time[i];
      }
      i++;
    }
    return date.join('/') + ' ' + time.join(':') + ' ' + suffix;
  };
});

App.controllers.controller('userCtrl', function($scope, $stateParams, $ionicHistory, User) {
  $scope.inviteFriend = function() {
    User.inviteFriend($scope.userData.token, 1, function(data) {
      alert(data);
    });
  };
  $scope.initProfile = function() {
    User.getProfile($scope.userData.token, $stateParams.userId, function(data) {
      $scope.profileData = data;
    });
  };
});

App.services.factory('Event', function($http) {
  var getEvent, getEvents, likeEvent, registerEvent;
  getEvents = function(token, filters, callback) {
    $http({
      url: App.host_addr + "/events/",
      method: "GET",
      headers: {
        "Authorization": token
      }
    }).success((function(data, status, headers, config) {
      callback(data);
    })).error((function(data, status, headers, config) {
      console.log("Process failed");
      callback(data);
    }));
  };
  getEvent = function(token, id, callback) {
    $http({
      url: App.host_addr + "/events/" + id + "/",
      method: "GET",
      headers: {
        "Authorization": token
      }
    }).success((function(data, status, headers, config) {
      callback(data);
    })).error((function(data, status, headers, config) {
      console.log("Process failed");
      callback(data);
    }));
  };
  likeEvent = function(token, id, callback) {
    $http({
      url: App.host_addr + "/events/" + id + "/like/",
      method: "GET",
      headers: {
        "Authorization": token
      }
    }).success((function(data, status, headers, config) {
      callback(true);
    })).error((function(data, status, headers, config) {
      console.log("Process failed");
      callback(false);
    }));
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
  var getProfile, inviteFriend, login, signUp;
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
  signUp = function(signUpData, callback) {
    $http({
      url: App.host_addr + "/students/signup/",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        "username": signUpData.username,
        "password": signUpData.password,
        "name": signUpData.name,
        "department": signUpData.department,
        "matric_no": signUpData.matric_no
      }
    }).success((function(data, status, headers, config) {
      console.log(data);
      callback(data);
    })).error((function(data, status, headers, config) {
      console.log("Login failed");
      callback(data);
    }));
  };
  getProfile = function(token, uid, callback) {
    if (uid === "0") {
      uid = "me";
    }
    return $http({
      url: App.host_addr + "/students/" + uid + "/",
      method: "GET",
      headers: {
        "Authorization": token
      }
    }).success(function(data) {
      return callback(data);
    });
  };
  inviteFriend = function(token, friend_id, callback) {
    callback(token);
  };
  return {
    login: login,
    getProfile: getProfile,
    inviteFriend: inviteFriend,
    signUp: signUp
  };
});
