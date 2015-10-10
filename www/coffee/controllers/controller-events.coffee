App.controllers.controller 'eventsCtrl', ($scope, $stateParams, Event) ->

  $scope.initEvents = () ->
    Event.getEvents $scope.userData.token, [], (data) ->
      $scope.events = data
      console.log($scope.userData.token)
      return
    return

  $scope.initEvent = () ->
    Event.getEvent $scope.userData.token, $stateParams.eventId, (data) ->
      $scope.event = data
      return
    return

  $scope.likeEvent = (id) ->
    Event.likeEvent $scope.userData.token, id, (response) ->
      if response == true
        $scope.initEvents()
        $scope.initEvent()
        return
      else
        console.log("like fail")
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

  $scope.parseDate = (timestamp) ->
    datetime = new Date timestamp
    date = [
      datetime.getDate()
      datetime.getMonth() + 1
      datetime.getFullYear()
    ]
    # Create an array with the current hour, minute and second
    time = [
      datetime.getHours()
      datetime.getMinutes()
#      datetime.getSeconds()
    ]
    # Determine AM or PM suffix based on the hour
    suffix = if time[0] < 12 then 'AM' else 'PM'
    # Convert hour from military time
    time[0] = if time[0] < 12 then time[0] else time[0] - 12
    # If hour is 0, set it to 12
    time[0] = time[0] or 12
    # If seconds and minutes are less than 10, add a zero
    i = 1
    while i < 3
      if time[i] < 10
        time[i] = '0' + time[i]
      i++
    # Return the formatted string
    return date.join('/') + ' ' + time.join(':') + ' ' + suffix

  return
