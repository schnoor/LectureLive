angular.module('app.controllers', [])

.controller('joinRoomCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('math101Ctrl', ['$scope', '$stateParams', 'LectureService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, LectureService) {
  LectureService.setUsersInRoom(50,50, 50);
  $scope.percentage = 50;

  $scope.dragUnderstanding = function(value) {
    if(value < 21){
      $scope.understanding = "No understanding";
    }
    else if(value < 41){
      $scope.understanding = "With help I would understand the overall concept";
    }
    else if(value < 61){
      $scope.understanding = "I understand the overall idea, but not everything";
    }
    else if(value < 81){
      $scope.understanding = "I understand this to the extend expected for this course" ;
    }
    else if(value < 101){

      $scope.understanding = "I have a better understanding than what is expected";
    }
    console.log("end drag");
  };

  $scope.releaseUnderstanding = function(value) {
    LectureService.setUnderstanding(value);
    $scope.percentageUnderstanding = LectureService.getUnderstanding();
  }


  $scope.dragConfidence = function(value) {
    if(value > 75){
      $scope.confidence = "Strongly Agree";
    }
    else if(value > 50){
      $scope.confidence = "Agree" ;
    }
    else if(value > 25){
      $scope.confidence = "Disagree";
    }
    else if(value > 0){
      $scope.confidence = "Strongly disagree";
    }
    console.log("end drag");
  };

  $scope.releaseConfidence = function(value) {
    LectureService.setConfidence(value);
    $scope.percentageConfidence = LectureService.getConfidence();
  }


  $scope.dragMotivation = function(value) {
    if(value < 21){
      $scope.motivation = "Very slightly, or not at all";
    }
    else if(value < 41){
      $scope.motivation = "A little";
    }
    else if(value < 61){
      $scope.motivation = "Moderately";
    }
    else if(value < 81){
      $scope.motivation = "Quite a bit" ;
    }
    else if(value < 101){
      $scope.motivation = "Extremely";
    }
  };


  $scope.releaseMotivation = function(value) {
    LectureService.setMotivation(value);
    $scope.percentageMotivation = LectureService.getMotivation();
  }


  $scope.tooFastClicked = function(){
    console.log($scope.tooFast);
    if(!$scope.tooFast){
      $scope.tooFast = true;
      $scope.tooFastText =  "Now I am up to speed!";
      LectureService.incrementTooFast();
    }
    else{
      $scope.tooFast = false;
      $scope.tooFastText = requestNoteBreak;
      LectureService.decrementTooFast();
    }
  };
  var requestNoteBreak = "Request a moment to take notes";
  $scope.tooFast = false;
  $scope.tooFastText = requestNoteBreak;
  $scope.dragUnderstanding(50);
  $scope.dragConfidence(50);
  $scope.dragMotivation(50);
  }

])

.controller('learningObjectivesCtrl', ['$scope', '$stateParams', 'LectureService', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, LectureService, $ionicPopup) {
      $scope.uploadFeedback = function(feedback, text){
        LectureService.addText(text);
        LectureService.addFeedbackText(feedback);
        var myPopup = $ionicPopup.show({
         template: '',
         title: 'All done',
         subTitle: 'Thanks for participating',
         scope: $scope,
         buttons: [
           { text: 'Cancel' }
         ]
        });
        myPopup.then(function(res) {
           console.log('Tapped!', res);
        });
      };

}]);
