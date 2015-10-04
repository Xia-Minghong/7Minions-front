App.services.factory 'User', ($http) ->

  login = (loginData, callback) ->

    $http(
      url: App.host_addr + "/o/token/"
      method: "POST"
      headers:
        "Content-Type":"application/x-www-form-urlencoded"
        "Authorization":"Basic aTJKQm1oVUN4QWMydDJIS1dscUhVMmxCV1U5UWZqZTNwdTFDMG5iRzpHbHFHc0RHZG4xWTBlREJQWW9idk84ZmZrRDJVQ0d4cllMR21rZE9ZalAwQTA4U01HVVI1Vnl4Y3d1bHBDZzF4RjUwVkw0ZExSUnR4cmZsOGZQbnNFQ21MdTB0eG11RDdkdGZ5WVhlS2tDQlE5SFBsQXM3WnZUTmh2a2VyYktBMA=="
      transformRequest: (obj) ->
        str = []
        for p of obj
          str.push encodeURIComponent(p) + '=' + encodeURIComponent(obj[p])
        str.join '&'
      data:
        "grant_type":"password"
        "username":loginData.username
        "password":loginData.password
        "scope":"read"
    )

    .success ((data, status, headers, config) ->
      callback(data)
      return
    )

    .error ((data, status, headers, config) ->
      console.log("Login failed")
      callback(data)
      return
    )

    return


  {
    login: login,
  }
