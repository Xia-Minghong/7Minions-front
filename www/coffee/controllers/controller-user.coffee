App.controllers.controller 'userCtrl', ($scope, $stateParams, $ionicHistory, User) ->

  $scope.inviteFriend = ->
    User.inviteFriend $scope.userData.token, 1, (data) ->
      alert data
      return
    return

  $scope.initProfile = () ->
    User.getProfile $scope.userData.token, $stateParams.userId, $stateParams.userType, (data) ->
      $scope.profileData = data
      return
    return

  return
