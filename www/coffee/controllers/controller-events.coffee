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

  $scope.likeEvent = (id) ->
    Event.likeEvent id, (response) ->
      if response == true
        return
      else
        alert("fail")
      return
    return

  $scope.registerEvent = (id) ->
    Event.registerEvent id, (response) ->
      if response == true
        return
      else
        alert("fail")
      return
    return

  return
