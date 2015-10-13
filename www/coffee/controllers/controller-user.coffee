App.controllers.controller 'userCtrl', ($scope, $state, $stateParams, $ionicHistory, $ionicPopup, User) ->

  $scope.inviteFriend = ->
    User.inviteFriend $scope.userData.token, 1, (data) ->
      alert data
      return
    return

  $scope.initProfile = () ->
    console.log("init Profile"+$stateParams.userId+$stateParams.userType)
    if $stateParams.userType=="students" && parseInt($stateParams.userId)==parseInt($scope.userData.user.id)
      console.log("self")
      User.getProfile $scope.userData.token, "0", "students", (data) ->
        $scope.profileData = data
        return
    else
      User.getProfile $scope.userData.token, $stateParams.userId, $stateParams.userType, (data) ->
        console.log($stateParams.userId)
        console.log("else")
        $scope.profileData = data
        console.log("data"+data.name)
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

  $scope.stateGo = (dest)->
    $state.go(dest)
    return

  $scope.addFriend = () ->
    console.log("add"+$stateParams.userId)
    User.addFriend $scope.userData.token, $stateParams.userId, (response) ->
      if response
        alertPopup = $ionicPopup.alert(
          title: 'Friend Added'
          template: 'Friend Added')
        alertPopup.show()
        return
      else
        console.log(response)
      return
    return

  return



