App.controllers.controller 'AppCtrl', ($scope, $ionicModal, $ionicHistory, $timeout, $location, User) ->

  $scope.goBack = () ->
    $ionicHistory.goBack()
    return

  $scope.go = (path) ->
      $location.path(path)

  # Login and Sign up Control
  $scope.control = showLogin : true

  # Form data for the login modal
  $scope.loginData = {}
  # Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/social/login.html', scope: $scope).then (modal) ->
    $scope.modal = modal
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
    User.login $scope.loginData, (isLogin) ->
      if isLogin == true
        $scope.closeLogin()
      else
        alert("1")
      return
    #    $timeout (->
    #      $scope.closeLogin()
    #      return
    #    ), 1000
    return

  $scope.signUp = ->
    $scope.control.showLogin = false
    return

  $scope.doSignUp = ->
    $timeout (->
      $scope.closeLogin()
      return
    ), 1000
    return


  return




#
