angular.module('starter', [
  'ionic'
  'starter.controllers'
  'starter.services'
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
  .state('app',
    url: '/app'
    abstract: true
    templateUrl: 'templates/social/menu.html'
    controller: 'AppCtrl')

  .state('app.events',
    url: '/events'
    views: 'menuContent': templateUrl: 'templates/social/events.html')

  .state('app.start',
    url: '/start'
    views: 'menuContent': templateUrl: 'templates/social/start-fullscreen.html')

  .state('app.fgrid',
    url: '/fgrid'
    views: 'menuContent': templateUrl: 'templates/social/friend-grid.html')

  .state('app.flist',
    url: '/flist'
    views: 'menuContent': templateUrl: 'templates/social/friends.html')

  .state('app.newpost',
    url: '/newpost'
    views: 'menuContent': templateUrl: 'templates/social/new-post.html')

  .state('app.email',
    url: '/email'
    views: 'menuContent': templateUrl: 'templates/social/send-email.html')

  .state('app.profile',
    url: '/profile'
    views: 'menuContent': templateUrl: 'templates/social/profile.html')

  .state('app.timeline',
    url: '/timeline'
    views: 'menuContent': templateUrl: 'templates/social/timeline.html')

  .state('app.editprofile',
    url: '/editprofile'
    views: 'menuContent': templateUrl: 'templates/social/profile-edit.html')

  .state('app.profiletwo',
    url: '/profiletwo'
    views: 'menuContent': templateUrl: 'templates/social/profile2.html')

  .state('app.profilethree',
    url: '/profilethree'
    views: 'menuContent': templateUrl: 'templates/social/profile3.html')

  .state('app.news',
    url: '/news'
    views: 'menuContent': templateUrl: 'templates/social/news.html')

  .state('app.eventdetails2',
    url: '/eventdetails2'
    views: 'menuContent': templateUrl: 'templates/social/view-post.html')

  .state('app.eventdetails',
    url: '/eventdetails'
    views: 'menuContent': templateUrl: 'templates/social/event-details.html')

  .state 'app.invite',
    url: '/invite'
    views: 'menuContent': templateUrl: 'templates/social/social-invite-friend.html'
  # if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise '/app/events'
  return



window.App = {}

# Controllers Globals
App.controllers = angular.module('starter.controllers', [])

# Services Globals
App.services = angular.module('starter.services', [])
