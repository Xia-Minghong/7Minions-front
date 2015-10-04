App.services.factory 'Event', ($http) ->

  data = [
    {
      "id":0
      "name":"event1"
    }
    {
      "id":1
      "name":"event2"
    }
  ]

  getEvents = (filters, callback) ->

    callback data
    return

  getEvent = (id, callback) ->

    callback data[id]
    return

  {
    getEvents : getEvents,
    getEvent  : getEvent,
  }
