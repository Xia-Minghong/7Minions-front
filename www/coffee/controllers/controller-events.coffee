App.controllers.controller 'eventsCtrl', ($scope, $state, $stateParams, Event) ->


  $scope.initEvents = () ->
    console.log("if"+$stateParams.tag.length==0 )
    if $stateParams.tag.length!=0
      Event.getEvents $scope.userData.token, null , (data) ->
        $scope.events = data
        console.log("notag"+$stateParams.tag)
        return
      $scope.search = $stateParams.tag
#      Event.getEvents $scope.userData.token, [$stateParams.tag], (data) ->
#        for event of data
#          discard = true
#          console.log(event.tag_set)
#          for tag of event.tag_set
#            if tag.tag == $stateParams.tag
#              discard = false
#          if discard
#            data.pop(event)
#        $scope.events = data
#        console.log("tag"+data)
#        return
      return
    else
      Event.getEvents $scope.userData.token, null , (data) ->
        $scope.events = data
        console.log("notag"+$stateParams.tag)
        return
    return

  $scope.initEvent = () ->
    if $stateParams.eventId == null
      return
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

  $scope.bookmarkEvent = (event) ->
    Event.bookmarkEvent $scope.userData.token, event.id, (response) ->
      if response
        console.log("bookmark success")
        $scope.userData.bookmarked_events.push(event)
#        if $scope.event && $scope.event.id == id
#          $scope.initEvent()
#        $scope.initEvents()
        return
      else
        console.log("bookmark fail")
      return
    return

  $scope.unBookmarkEvent = (event) ->
    Event.unBookmarkEvent $scope.userData.token, event.id, (response) ->
      if response
        console.log("unbookmark success")
        $scope.userData.bookmarked_events.pop(event)
        #        if $scope.event && $scope.event.id == id
        #          $scope.initEvent()
        #        $scope.initEvents()
        return
      else
        console.log("unbookmark fail")
      return
    return

  $scope.registerEvent = (event) ->
    Event.registerEvent $scope.userData.token, event.id, (response) ->
      if response == true
        console.log("register success")
        if $scope.event && $scope.event.id == event.id
          $scope.event.registered = true
          console.log("event")
        else
          console.log("events")
          for i, value of $scope.events
            if value.id == event.id
              $scope.events[i].registered = true
        return
      else
        console.log(data)
      return
    return

  $scope.deregisterEvent = (event) ->
    Event.deregisterEvent $scope.userData.token, event.id, (response) ->
      if response == true
        console.log("deregister success")
        if $scope.event && $scope.event.id == event.id
          $scope.event.registered = false
          console.log("event")
        else
          console.log("events")
          for i, value of $scope.events
            if value.id == event.id
              $scope.events[i].registered = false
        return
      else
        console.log(response)
      return
    return


  $scope.attendEvent = (event) ->
    Event.attendEvent $scope.userData.token, event.id, (response) ->
      if response == true
        console.log("attend success")
        if $scope.event && $scope.event.id == event.id
          $scope.event.attended = true
          console.log("event")
        else
          console.log("events")
          for i, value of $scope.events
            if value.id == event.id
              $scope.events[i].attended = true
        return
      else
        console.log(response)
      return
    return


  $scope.isBookmarked = (id) ->
    for index, value of $scope.userData.bookmarked_events
      if value.id == id
        return true
    return false


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
