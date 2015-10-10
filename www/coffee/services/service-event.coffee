App.services.factory 'Event', ($http) ->

  getEvents = (token, filters, callback) ->
    $http(
      url: App.host_addr + "/events/"
      method: "GET"
      headers:
        "Authorization":token
    )

    .success ((data, status, headers, config) ->
      callback(data)
      return
    )

    .error ((data, status, headers, config) ->
      console.log("Process failed")
      callback(data)
      return
    )

    return

  getEvent = (token, id, callback) ->
    $http(
      url: App.host_addr + "/events/"+id+"/"
      method: "GET"
      headers:
        "Authorization":token
    )

    .success ((data, status, headers, config) ->
      callback(data)
      return
    )

    .error ((data, status, headers, config) ->
      console.log("Process failed")
      callback(data)
      return
    )
    return

  likeEvent = (token, id, callback) ->
    $http(
      url: App.host_addr + "/events/"+id+"/like/"
      method: "GET"
      headers:
        "Authorization":token
    )

    .success ((data, status, headers, config) ->
#      callback(data)
      callback(true)
      return
    )

    .error ((data, status, headers, config) ->
      console.log("Process failed")
      callback(false)
#      callback(data)
      return
    )
    return

  bookmarkEvent = (token, id, callback) ->
    $http(
      url: App.host_addr + "/bookmarks/"+id+"/"
      method: "GET"
      headers:
        "Authorization":token
    )

    .success ((data, status, headers, config) ->
#      callback(data)
      callback(true)
      return
    )

    .error ((data, status, headers, config) ->
      console.log("Process failed")
      callback(false)
      #      callback(data)
      return
    )
    return

  registerEvent = (id, callback) ->
    callback false
    return

  {
    getEvents     : getEvents,
    getEvent      : getEvent,
    likeEvent     : likeEvent
    registerEvent : registerEvent,
  bookmarkEvent : bookmarkEvent
  }
