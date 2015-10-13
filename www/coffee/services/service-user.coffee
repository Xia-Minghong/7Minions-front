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


  signUp = (signUpData, callback) ->
    $http(
      url: App.host_addr + "/students/signup/"
      method: "POST"
      headers:
        "Content-Type":"application/json"
      data:
        "username":signUpData.username
        "password":signUpData.password
        "name":signUpData.name
        "department":signUpData.department
        "matric_no":signUpData.matric_no
    )

    .success ((data, status, headers, config) ->
      console.log data
      callback(data)
      return
    )

    .error ((data, status, headers, config) ->
      console.log("Login failed")
      callback(data)
      return
    )

    return


  getProfile = (token, uid, type, callback) ->
    if uid == "0"
      uid = "me"
    console.log(uid)
    console.log(type)
    console.log(App.host_addr + "/"+type+"/"+uid+"/")
    $http(
      url: App.host_addr + "/"+type+"/"+uid+"/"
      method: "GET"
      headers:
        "Authorization":token
    )
    .success (data2) ->
      console.log(data2.name)
      callback(data2)
      return


  inviteFriend = (token, friend_id, callback) ->
    callback(token)
    return


  addFriend = (token, id, callback) ->
    $http(
      url: App.host_addr + "/students/"+id+"/addfriend/"
      method: "POST"
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

  removeFriend = (token, id, callback) ->
    $http(
      url: App.host_addr + "/students/"+id+"/removefriend/"
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

  {
    login       : login
    signUp      : signUp
    getProfile  : getProfile
    inviteFriend: inviteFriend
  addFriend : addFriend
  removeFriend : removeFriend


  }
