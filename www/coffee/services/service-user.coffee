App.services.factory 'User', ($http) ->

  login = (loginData, callback) ->
    alert("do something")
    callback true
    return

  {
    login: login,
  }
