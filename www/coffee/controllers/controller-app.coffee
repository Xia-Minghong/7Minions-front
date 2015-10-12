App.controllers.controller 'AppCtrl', ($scope, $ionicPlatform, $ionicModal, $ionicPopup, $ionicHistory, $state, $timeout, $location, User) ->

  $scope.goBack = () ->
    $ionicHistory.goBack()
    return

  $scope.stateGo = (dest)->
    $state.go(dest)
    return

  $scope.go = (path) ->
      $location.path(path)

  # Login and Sign up Control
  $scope.control = showLogin : true

  # Form data for the login modal
  $scope.loginData = {}
  $scope.signUpData = {}
  $scope.userData = {}

  $scope.isLogged = ->
    return $scope.userData.hasOwnProperty('token')

  # Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/social/login.html', scope: $scope, backdropClickToClose: false).then (modal) ->
    $scope.modal = modal
    # Login if not logged in
    if !$scope.isLogged()
      $scope.go('/app/start')
      $scope.login()
    return
  # Triggered in the login modal to close it

  $scope.closeLogin = ->
    $scope.modal.hide()
    return

  # Open the login modal

  $scope.login = ->
    $scope.modal.show()
    return

  # Back to login

  $scope.backLogin = ->
    $scope.control.showLogin = true

  # Perform the login action when the user submits the login form

  $scope.doLogin = ->
    console.log 'Doing login', $scope.loginData
    User.login $scope.loginData, (data) ->
      if data.hasOwnProperty('access_token')
        $scope.userData.token = data.token_type + ' ' + data.access_token
        User.getProfile $scope.userData.token, "0", "students", (data) ->
          token = $scope.userData.token
          $scope.userData = data
          $scope.userData.token = token
          $state.go('app.events')
          return
        $scope.closeLogin()
      else
        alertPopup = $ionicPopup.alert(
          title: 'Login Failed'
          template: 'The credentials are invalid')
        alertPopup.show()
      return
    #    $timeout (->
    #      $scope.closeLogin()
    #      return
    #    ), 1000
    return

  $scope.doLogout = ->
    $scope.loginData.password = ""
    $scope.userData = {}
    $scope.login()

  $scope.signUp = ->
    $scope.control.showLogin = false
    return

  $scope.doSignUp = ->
    console.log 'Doing signup', $scope.signUpData
    User.signUp $scope.signUpData, (data) ->
      if data.hasOwnProperty('user')
        $scope.control.showLogin = true
#        $scope.closeLogin()
        alertPopup = $ionicPopup.alert(
          title: 'Sign Up Successful'
          template: 'Sign Up Successful, please login')
        alertPopup.show()
      else
        alertPopup = $ionicPopup.alert(
          title: 'Sign Up Failed'
          template: 'Please retry')
        alertPopup.show()
      return
    return


  return




#
