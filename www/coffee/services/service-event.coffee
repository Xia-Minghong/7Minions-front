App.services.factory 'Event', ($http) ->

  getEvents = (token, filters, callback) ->
    # Always query all events
    if false
      console.log("fil"+filters)
      $http(
          url: App.host_addr + "/tags/"+filters+"/get_events/"
          method: "GET"
          headers:
            "Authorization":token
        )

        .success ((data, status, headers, config) ->
          callback([data])
          return
        )

        .error ((data, status, headers, config) ->
          console.log("Process failed")
          callback([data])
          return
        )
    else
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
      url: App.host_addr + "/students/"+id+"/bookmark_event/"
      method: "POST"
      headers:
        "Authorization":token
    )

    .success ((data, status, headers, config) ->
      console.log(data)
      if data.hasOwnProperty("id")
        callback(true)
      else
        callback(false)
      return
    )

    .error ((data, status, headers, config) ->
#      console.log("Process failed")
      callback(false)
      #      callback(data)
      return
    )
    return

  unBookmarkEvent = (token, id, callback) ->
    $http(
      url: App.host_addr + "/students/"+id+"/unbookmark_event/"
      method: "DELETE"
      headers:
        "Authorization":token
    )

    .success ((data, status, headers, config) ->
      console.log(data)
      if data.hasOwnProperty("id")
        callback(true)
      else
        callback(false)
      return
    )

    .error ((data, status, headers, config) ->
#      console.log("Process failed")
      callback(false)
      #      callback(data)
      return
    )
    return

  registerEvent = (token, id, callback) ->
    $http(
      url: App.host_addr + "/students/"+id+"/register_event/"
      method: "POST"
      headers:
        "Authorization":token
    )

    .success ((data, status, headers, config) ->
      if data.hasOwnProperty("id")
        callback(true)
      else
        callback(false)
      return
    )

    .error ((data, status, headers, config) ->
#      console.log("Process failed")
      callback(false)
      #      callback(data)
      return
    )
    return


  deregisterEvent = (token, id, callback) ->
    $http(
      url: App.host_addr + "/students/"+id+"/deregister_event/"
      method: "DELETE"
      headers:
        "Authorization":token
    )

    .success ((data, status, headers, config) ->
      console.log(data)
      callback(true)
      return
    )

    .error ((data, status, headers, config) ->
#      console.log("Process failed")
      callback(false)
      #      callback(data)
      return
    )
    return


  attendEvent = (token, id, callback) ->
    $http(
      url: App.host_addr + "/students/"+id+"/attend_event/"
      method: "PUT"
      headers:
        "Authorization":token
    )

    .success ((data, status, headers, config) ->
      if data.hasOwnProperty("id")
        callback(true)
        console.log("attend success")
        console.log(data)
      else
        callback(false)
        console.log("attend fail")
      return
    )

    .error ((data, status, headers, config) ->
#      console.log("Process failed")
      callback(false)
      #      callback(data)
      return
    )
    return



  {
    getEvents     : getEvents,
    getEvent      : getEvent,
    likeEvent     : likeEvent
    bookmarkEvent : bookmarkEvent,
    registerEvent : registerEvent,
    deregisterEvent : deregisterEvent,
    attendEvent   : attendEvent
    unBookmarkEvent:unBookmarkEvent
  }
