App.controllers.controller 'feedbackCtrl', ($scope, $state, $stateParams, $ionicPopup, $ionicHistory, Feedback, Event) ->

  $scope.max = 5;
  $scope.feedbackData = {};

  $scope.initFeedback = () ->
    Event.getEvent $scope.userData.token, $stateParams.feedbackEventId, (data) ->
      $scope.feedbackEvent = data
    return

  $scope.submit = () ->
    Feedback.postFeedback $scope.userData.token, $scope.feedbackEvent.id, $scope.feedbackData.content, parseInt($scope.feedbackData.rating), (success) ->
      if success
        alertPopup = $ionicPopup.alert(
          title: 'Feedback Successful'
          template: 'Thank you for your feedback!'
        )
        alertPopup.show()
        alertPopup.then($ionicHistory.goBack)
      else
        alertPopup = $ionicPopup.alert(
          title: 'Feedback Failed'
          template: 'Please retry')
        alertPopup.show()
      return
    return

  $scope.back = ->
    $ionicHistory.goBack()
    return

  return
