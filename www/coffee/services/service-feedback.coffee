App.services.factory 'Feedback', ($http) ->

  postFeedback = (token, event, content, rating, callback) ->
    $http(
      url: App.host_addr + "/feedbacks/"
      method: "POST"
      headers:
        "Content-Type":"application/json"
        "Authorization":token
      data:
        "event":event
        "content":content
        "rating":rating
    )

    .success ((data, status, headers, config) ->
      callback(true)
      return
    )

    .error ((data, status, headers, config) ->
      console.log("feedback failed")
      callback(false)
      return
    )

    return

  {
    postFeedback: postFeedback
  }

