'use strict';

angular.module('myApp.studentCommentView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/studentCommentView', {
    templateUrl: 'studentCommentView/studentCommentView.html',
    controller: 'studentCommentViewCtrl'
  });
}])

.controller('studentCommentViewCtrl', ['$scope', 'Feedback',function($scope, Feedback) {
  var database = firebase.database();
  var lectureRef = database.ref('lecture/1');
  $scope.comments = ["No comments yet"];
  lectureRef.child("lectureFeedback").on("value", function(snapshot){
    $scope.comments = [];
    if(snapshot.numChildren() == 0){
      $scope.comments = ["No comments yet"];
    }
    else{
      snapshot.forEach(function(s){
        $scope.comments.push(s.val());
      });
    }
    $scope.$apply();
    })
  }]);
