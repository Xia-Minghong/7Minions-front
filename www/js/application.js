angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic.rating']).run(function($ionicPlatform) {
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
    cache: false,
    url: '/events/{tag}',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/events.html',
        controller: 'eventsCtrl'
      }
    }
  }).state('app.eventdetails', {
    cache: false,
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
    cache: false,
    url: '/flist',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/friends.html',
        controller: 'userCtrl'
      }
    }
  }).state('app.newpost', {
    cache: false,
    url: '/newpost/{feedbackEventId}',
    views: {
      'menuContent': {
        templateUrl: 'templates/social/new-post.html',
        controller: 'feedbackCtrl'
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
    cache: false,
    url: '/profile/{userId}/{userType}',
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

App.host_addr = "http://128.199.130.155:8001";

App.controllers.controller('AppCtrl', function($scope, $ionicPlatform, $ionicModal, $ionicPopup, $ionicHistory, $state, $timeout, $location, User) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  $scope.stateGo = function(dest) {
    $state.go(dest);
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
      $scope.go('/app/start');
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
        User.getProfile($scope.userData.token, "0", "students", function(data) {
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
          template: 'Sign Up Successful, please login'
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

App.controllers.controller('eventsCtrl', function($scope, $state, $stateParams, Event) {
  $scope.initEvents = function() {
    console.log("if" + $stateParams.tag.length === 0);
    if ($stateParams.tag.length !== 0) {
      Event.getEvents($scope.userData.token, null, function(data) {
        $scope.events = data;
        console.log("notag" + $stateParams.tag);
      });
      $scope.search = $stateParams.tag;
      return;
    } else {
      Event.getEvents($scope.userData.token, null, function(data) {
        $scope.events = data;
        console.log("notag" + $stateParams.tag);
      });
    }
  };
  $scope.initEvent = function() {
    if ($stateParams.eventId === null) {
      return;
    }
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
  $scope.bookmarkEvent = function(event) {
    Event.bookmarkEvent($scope.userData.token, event.id, function(response) {
      if (response) {
        console.log("bookmark success");
        $scope.userData.bookmarked_events.push(event);
        return;
      } else {
        console.log("bookmark fail");
      }
    });
  };
  $scope.unBookmarkEvent = function(event) {
    Event.unBookmarkEvent($scope.userData.token, event.id, function(response) {
      if (response) {
        console.log("unbookmark success");
        $scope.userData.bookmarked_events.pop(event);
        return;
      } else {
        console.log("unbookmark fail");
      }
    });
  };
  $scope.registerEvent = function(event) {
    Event.registerEvent($scope.userData.token, event.id, function(response) {
      var i, ref, value;
      if (response === true) {
        console.log("register success");
        if ($scope.event && $scope.event.id === event.id) {
          $scope.event.registered = true;
          console.log("event");
        } else {
          console.log("events");
          ref = $scope.events;
          for (i in ref) {
            value = ref[i];
            if (value.id === event.id) {
              $scope.events[i].registered = true;
            }
          }
        }
        return;
      } else {
        console.log(data);
      }
    });
  };
  $scope.deregisterEvent = function(event) {
    Event.deregisterEvent($scope.userData.token, event.id, function(response) {
      var i, ref, value;
      if (response === true) {
        console.log("deregister success");
        if ($scope.event && $scope.event.id === event.id) {
          $scope.event.registered = false;
          console.log("event");
        } else {
          console.log("events");
          ref = $scope.events;
          for (i in ref) {
            value = ref[i];
            if (value.id === event.id) {
              $scope.events[i].registered = false;
            }
          }
        }
        return;
      } else {
        console.log(response);
      }
    });
  };
  $scope.attendEvent = function(event) {
    Event.attendEvent($scope.userData.token, event.id, function(response) {
      var i, ref, value;
      if (response === true) {
        console.log("attend success");
        if ($scope.event && $scope.event.id === event.id) {
          $scope.event.attended = true;
          console.log("event");
        } else {
          console.log("events");
          ref = $scope.events;
          for (i in ref) {
            value = ref[i];
            if (value.id === event.id) {
              $scope.events[i].attended = true;
            }
          }
        }
        return;
      } else {
        console.log(response);
      }
    });
  };
  $scope.isBookmarked = function(id) {
    var index, ref, value;
    ref = $scope.userData.bookmarked_events;
    for (index in ref) {
      value = ref[index];
      if (value.id === id) {
        return true;
      }
    }
    return false;
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

App.controllers.controller('feedbackCtrl', function($scope, $state, $stateParams, $ionicPopup, $ionicHistory, Feedback, Event) {
  $scope.max = 5;
  $scope.feedbackData = {};
  $scope.initFeedback = function() {
    Event.getEvent($scope.userData.token, $stateParams.feedbackEventId, function(data) {
      return $scope.feedbackEvent = data;
    });
  };
  $scope.submit = function() {
    Feedback.postFeedback($scope.userData.token, $scope.feedbackEvent.id, $scope.feedbackData.content, parseInt($scope.feedbackData.rating), function(success) {
      var alertPopup;
      if (success) {
        alertPopup = $ionicPopup.alert({
          title: 'Feedback Successful',
          template: 'Thank you for your feedback!'
        });
        alertPopup.show();
        alertPopup.then($ionicHistory.goBack);
      } else {
        alertPopup = $ionicPopup.alert({
          title: 'Feedback Failed',
          template: 'Please retry'
        });
        alertPopup.show();
      }
    });
  };
  $scope.back = function() {
    $ionicHistory.goBack();
  };
});

App.controllers.controller('userCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, User) {
  $scope.inviteFriend = function() {
    User.inviteFriend($scope.userData.token, 1, function(data) {
      alert(data);
    });
  };
  $scope.initProfile = function() {
    console.log("init Profile" + $stateParams.userId + $stateParams.userType);
    if ($stateParams.userType === "students" && parseInt($stateParams.userId) === parseInt($scope.userData.user.id)) {
      console.log("self");
      User.getProfile($scope.userData.token, "0", "students", function(data) {
        $scope.profileData = data;
      });
    } else {
      User.getProfile($scope.userData.token, $stateParams.userId, $stateParams.userType, function(data) {
        console.log($stateParams.userId);
        console.log("else");
        $scope.profileData = data;
        console.log("data" + data.name);
      });
    }
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
  $scope.stateGo = function(dest) {
    $state.go(dest);
  };
  $scope.addFriend = function() {
    console.log("add" + $stateParams.userId);
    User.addFriend($scope.userData.token, $stateParams.userId, function(response) {
      var alertPopup;
      if (response) {
        User.getProfile($scope.userData.token, $stateParams.userId, "students", function(data) {
          $scope.userData.friends.push(data);
        });
        alertPopup = $ionicPopup.alert({
          title: 'Friend Added',
          template: 'Friend Added'
        });
        alertPopup.show();
        return;
      } else {
        console.log(response);
      }
    });
  };
});

App.services.factory('Event', function($http) {
  var attendEvent, bookmarkEvent, deregisterEvent, getEvent, getEvents, likeEvent, registerEvent, unBookmarkEvent;
  getEvents = function(token, filters, callback) {
    if (false) {
      console.log("fil" + filters);
      $http({
        url: App.host_addr + "/tags/" + filters + "/get_events/",
        method: "GET",
        headers: {
          "Authorization": token
        }
      }).success((function(data, status, headers, config) {
        callback([data]);
      })).error((function(data, status, headers, config) {
        console.log("Process failed");
        callback([data]);
      }));
    } else {
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
    }
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
  bookmarkEvent = function(token, id, callback) {
    $http({
      url: App.host_addr + "/students/" + id + "/bookmark_event/",
      method: "POST",
      headers: {
        "Authorization": token
      }
    }).success((function(data, status, headers, config) {
      console.log(data);
      if (data.hasOwnProperty("id")) {
        callback(true);
      } else {
        callback(false);
      }
    })).error((function(data, status, headers, config) {
      callback(false);
    }));
  };
  unBookmarkEvent = function(token, id, callback) {
    $http({
      url: App.host_addr + "/students/" + id + "/unbookmark_event/",
      method: "DELETE",
      headers: {
        "Authorization": token
      }
    }).success((function(data, status, headers, config) {
      console.log(data);
      if (data.hasOwnProperty("id")) {
        callback(true);
      } else {
        callback(false);
      }
    })).error((function(data, status, headers, config) {
      callback(false);
    }));
  };
  registerEvent = function(token, id, callback) {
    $http({
      url: App.host_addr + "/students/" + id + "/register_event/",
      method: "POST",
      headers: {
        "Authorization": token
      }
    }).success((function(data, status, headers, config) {
      if (data.hasOwnProperty("id")) {
        callback(true);
      } else {
        callback(false);
      }
    })).error((function(data, status, headers, config) {
      callback(false);
    }));
  };
  deregisterEvent = function(token, id, callback) {
    $http({
      url: App.host_addr + "/students/" + id + "/deregister_event/",
      method: "DELETE",
      headers: {
        "Authorization": token
      }
    }).success((function(data, status, headers, config) {
      console.log(data);
      callback(true);
    })).error((function(data, status, headers, config) {
      callback(false);
    }));
  };
  attendEvent = function(token, id, callback) {
    $http({
      url: App.host_addr + "/students/" + id + "/attend_event/",
      method: "PUT",
      headers: {
        "Authorization": token
      }
    }).success((function(data, status, headers, config) {
      if (data.hasOwnProperty("id")) {
        callback(true);
        console.log("attend success");
        console.log(data);
      } else {
        callback(false);
        console.log("attend fail");
      }
    })).error((function(data, status, headers, config) {
      callback(false);
    }));
  };
  return {
    getEvents: getEvents,
    getEvent: getEvent,
    likeEvent: likeEvent,
    bookmarkEvent: bookmarkEvent,
    registerEvent: registerEvent,
    deregisterEvent: deregisterEvent,
    attendEvent: attendEvent,
    unBookmarkEvent: unBookmarkEvent
  };
});

App.services.factory('Feedback', function($http) {
  var postFeedback;
  postFeedback = function(token, event, content, rating, callback) {
    $http({
      url: App.host_addr + "/feedbacks/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      data: {
        "event": event,
        "content": content,
        "rating": rating
      }
    }).success((function(data, status, headers, config) {
      callback(true);
    })).error((function(data, status, headers, config) {
      console.log("feedback failed");
      callback(false);
    }));
  };
  return {
    postFeedback: postFeedback
  };
});

App.services.factory('User', function($http) {
  var addFriend, getProfile, inviteFriend, login, removeFriend, signUp;
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
  getProfile = function(token, uid, type, callback) {
    if (uid === "0") {
      uid = "me";
    }
    console.log(uid);
    console.log(type);
    console.log(App.host_addr + "/" + type + "/" + uid + "/");
    return $http({
      url: App.host_addr + "/" + type + "/" + uid + "/",
      method: "GET",
      headers: {
        "Authorization": token
      }
    }).success(function(data2) {
      console.log(data2.name);
      callback(data2);
    });
  };
  inviteFriend = function(token, friend_id, callback) {
    callback(token);
  };
  addFriend = function(token, id, callback) {
    $http({
      url: App.host_addr + "/students/" + id + "/addfriend/",
      method: "POST",
      headers: {
        "Authorization": token
      }
    }).success((function(data, status, headers, config) {
      console.log(data);
      callback(true);
    })).error((function(data, status, headers, config) {
      callback(false);
    }));
  };
  removeFriend = function(token, id, callback) {
    $http({
      url: App.host_addr + "/students/" + id + "/removefriend/",
      method: "DELETE",
      headers: {
        "Authorization": token
      }
    }).success((function(data, status, headers, config) {
      console.log(data);
      callback(true);
    })).error((function(data, status, headers, config) {
      callback(false);
    }));
  };
  return {
    login: login,
    signUp: signUp,
    getProfile: getProfile,
    inviteFriend: inviteFriend,
    addFriend: addFriend,
    removeFriend: removeFriend
  };
});

angular.module('ionic.rating', []).constant('ratingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null
}).controller('RatingController', function($scope, $attrs, ratingConfig) {
  var ngModelCtrl;
  ngModelCtrl = {
    $setViewValue: angular.noop
  };
  this.init = function(ngModelCtrl_) {
    var max, ratingStates;
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;
    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
    max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
    ratingStates = angular.isDefined($attrs.ratingStates) ? $scope.$parent.$eval($attrs.ratingStates) : new Array(max);
    return $scope.range = this.buildTemplateObjects(ratingStates);
  };
  this.buildTemplateObjects = function(states) {
    var i, j, len, ref;
    ref = states.length;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      states[i] = angular.extend({
        index: 1
      }, {
        stateOn: this.stateOn,
        stateOff: this.stateOff
      }, states[i]);
    }
    return states;
  };
  $scope.rate = function(value) {
    if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
      ngModelCtrl.$setViewValue(value);
      return ngModelCtrl.$render();
    }
  };
  $scope.reset = function() {
    $scope.value = ngModelCtrl.$viewValue;
    return $scope.onLeave();
  };
  $scope.enter = function(value) {
    if (!$scope.readonly) {
      $scope.value = value;
    }
    return $scope.onHover({
      value: value
    });
  };
  $scope.onKeydown = function(evt) {
    if (/(37|38|39|40)/.test(evt.which)) {
      evt.preventDefault();
      evt.stopPropagation();
      return $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? {
        1: -1
      } : void 0));
    }
  };
  this.render = function() {
    return $scope.value = ngModelCtrl.$viewValue;
  };
  return this;
}).directive('rating', function() {
  return {
    restrict: 'EA',
    require: ['rating', 'ngModel'],
    scope: {
      readonly: '=?',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'RatingController',
    template: '<ul class="rating" ng-mouseleave="reset()" ng-keydown="onKeydown($event)">' + '<li ng-repeat="r in range track by $index" ng-click="rate($index + 1)"><i class="icon" ng-class="$index < value && (r.stateOn || \'ion-ios-star\') || (r.stateOff || \'ion-ios-star-outline\')"></i></li>' + '</ul>',
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      var ngModelCtrl, ratingCtrl;
      ratingCtrl = ctrls[0];
      ngModelCtrl = ctrls[1];
      if (ngModelCtrl) {
        return ratingCtrl.init(ngModelCtrl);
      }
    }
  };
});
