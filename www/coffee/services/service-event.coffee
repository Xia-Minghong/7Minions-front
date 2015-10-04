App.services.factory 'Event', ($http) ->

  data = [
    {
      "id":0
      "name":"event1"
      "likes":4
    }
    {
      "id":1
      "name":"event2"
      "likes":5
    }
  ]

  getEvents = (filters, callback) ->

    callback data
    return

  getEvent = (id, callback) ->

    callback data[id]
    return

  likeEvent = (id, callback) ->
    data[id].likes += 1
    callback true
    return

  registerEvent = (id, callback) ->
    callback false
    return

  {
    getEvents     : getEvents,
    getEvent      : getEvent,
    likeEvent     : likeEvent
    registerEvent : registerEvent,
  }
