App.controllers.controller 'eventsCtrl', ($scope, $stateParams, Event) ->

  $scope.initEvents = () ->
    Event.getEvents [], (data) ->
      $scope.events = data
      return
    return

  $scope.initEvent = () ->
    Event.getEvent $stateParams.eventId, (data) ->
      $scope.event = data
      return
    return

  return
