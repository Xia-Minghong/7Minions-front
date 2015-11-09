angular.module('starter', [
  'ionic'
  'starter.controllers'
  'starter.services'
  'ionic.rating'
]).run(($ionicPlatform) ->
  $ionicPlatform.ready ->
    # Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    # for form inputs)
    if window.cordova and window.cordova.plugins.Keyboard
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar true
    if window.StatusBar
      # org.apache.cordova.statusbar required
      StatusBar.styleDefault()
    return

  return
).config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
  .state 'app',
    url: '/app'
    abstract: true
    templateUrl: 'templates/social/menu.html'
    controller: 'AppCtrl'

  .state 'app.events',
    cache: false,
    url: '/events/{tag}'
    views:
      'menuContent':
        templateUrl: 'templates/social/events.html'
        controller: 'eventsCtrl'

  .state 'app.eventdetails',
    cache: false,
    url: '/eventdetails/{eventId}'
    views:
      'menuContent':
        templateUrl: 'templates/social/event-details.html'
        controller: 'eventsCtrl'


  .state('app.start',
    url: '/start'
    views: 'menuContent': templateUrl: 'templates/social/start-fullscreen.html')

  .state('app.fgrid',
    url: '/fgrid'
    views: 'menuContent': templateUrl: 'templates/social/friend-grid.html')

  .state('app.flist',
    cache: false,
    url: '/flist'
    views:
      'menuContent':
        templateUrl: 'templates/social/friends.html'
        controller: 'userCtrl'
  )

  .state 'app.newpost',
    cache: false,
    url: '/newpost/{feedbackEventId}'
    views:
      'menuContent':
        templateUrl: 'templates/social/new-post.html'
        controller: 'feedbackCtrl'


  .state('app.email',
    url: '/email'
    views: 'menuContent': templateUrl: 'templates/social/send-email.html')

  .state 'app.profile',
    cache: false,
    url: '/profile/{userId}/{userType}'
    views:
      'menuContent':
        templateUrl: 'templates/social/profile.html'
        controller: 'userCtrl'


  .state('app.timeline',
    url: '/timeline'
    views: 'menuContent': templateUrl: 'templates/social/timeline.html')

  .state 'app.editprofile',
    url: '/editprofile'
    views:
      'menuContent':
        templateUrl: 'templates/social/profile-edit.html'
        controller: 'userCtrl'

  .state('app.profiletwo',
    url: '/profiletwo'
    views: 'menuContent': templateUrl: 'templates/social/profile2.html')

  .state('app.profilethree',
    url: '/profilethree'
    views: 'menuContent': templateUrl: 'templates/social/profile3.html')

  .state 'app.news',
    url: '/news'
    views: 'menuContent': templateUrl: 'templates/social/news.html'

  .state 'app.eventdetails2',
    url: '/eventdetails2'
    views: 'menuContent': templateUrl: 'templates/social/view-post.html'

  .state 'app.invite',
    url: '/invite'
    views:
      'menuContent':
        templateUrl: 'templates/social/social-invite-friend.html'
        controller: 'userCtrl'
  # if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise '/app/start'
  return



window.App = {}

# Controllers Globals
App.controllers = angular.module('starter.controllers', [])

# Services Globals
App.services = angular.module('starter.services', [])

App.host_addr = "http://128.199.130.155:8001"
