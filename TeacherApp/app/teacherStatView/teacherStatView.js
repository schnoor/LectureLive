'use strict';

angular.module('myApp.teacherStatView', ['ngRoute', "chart.js"])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/teacherStatView', {
    templateUrl: 'teacherStatView/teacherStatView.html',
    controller: 'teacherStatViewCtrl'
  });
}])

.config(['ChartJsProvider', function (ChartJsProvider) {
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: false,
      tooltips: {
        bodyFontSize: 10,
        position:'custom',
                callbacks: {
                  title: function(tooltipItems, data) {
                        //Return value for title
                        return null;
                    },
                    label: function(tooltipItems, data) {
                      return data.datasets[tooltipItems.datasetIndex].label;
                    }
                }
      }
    });
  }])
  .controller("teacherStatViewCtrl", ['$scope', '$timeout', 'Feedback', function ($scope, $timeout, Feedback) {
    var color1 = "rgb(255,0,0)";
    var color2 = "rgb(255, 120, 0)";
    var color3 = "rgb(255, 239, 85)";
    var color4 = "rgb(15,204,0)";
    var color5 = "rgb(0,150,0)";

    var online = 0;
    $scope.average = false;
    $scope.averageText = "Show averages"
    $scope.datasetOverride = [{
        fill: true,
        backgroundColor: [
          color1
        ],
        borderColor: [
          color1
        ]
      }, {
        fill: true,
        backgroundColor: [
          color2
        ],
        borderColor: [
          color2
        ]
      }, {
        fill: true,
        backgroundColor: [
          color3
        ],
        borderColor: [
          color3
        ]
      }, {
        fill: true,
        backgroundColor: [
          color4
        ],
        borderColor: [
          color4
        ]
        }, {
        fill: true,
        backgroundColor: [
          color5
        ],
        borderColor: [
          color5
        ]
      },
    ];


    //set understanding distribution
    $scope.seriesU = ['Even with help I would not understand this', 'With a little help I would understand the overall concept',
     'I understand the overall idea, but not everything', 'I understand this to the extend expected for this course', 'I have a better understanding than what is expected'];
    $scope.labelsU = [''];
    $scope.colorsU = ['#00cc99','#141493','#f59e25','#a0053a','#ffff00'];
    $scope.optionsU = {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true,
                  callback: function(value) {if (value % 1 === 0) {return value;}}
              },
              scaleLabel: {
                display: true,
                labelString: 'students'
              }
          }]
      },
      title: {
          display: true,
          text: 'Understanding',
          fontSize: 18,
          //fontColor: '#000'
      }
    };

// set Motivation distribution
    $scope.seriesM = ['Very slightly, or not at all', 'A little', 'Moderately', 'Quite a bit', 'Extremely'];
    $scope.labelsM = [''];
    $scope.colorsM = ['#00cc99','#141493','#f59e25','#a0053a','#ffff00'];
    $scope.optionsM = {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true,
                  callback: function(value) {if (value % 1 === 0) {return value;}}
              },
              scaleLabel: {
                display: true,
                labelString: 'students'
              }
          }]
      },
      title: {
          display: true,
          text: 'Motivation',
          fontSize: 18
          //fontColor: '#000'
      }
    };

    // set Confidence distribution
        $scope.seriesC = ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'];
        $scope.labelsC = [''];
        $scope.colorsC = ['#00cc99','#141493','#f59e25','#a0053a'];;
        $scope.optionsC = {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      callback: function(value) {if (value % 1 === 0) {return value;}}
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'students'
                  }
              }]
          },
          title: {
              display: true,
              text: 'Confidence',
              fontSize: 18
              //fontColor: '#000'
          }
        };




    $scope.getDataU = function(){
      Feedback.understanding('1');
      var understandingRef = firebase.database().ref('lecture/1/understandingData');
      understandingRef.on('value', function(snapshot) {
        $scope.dataU = [];
        snapshot.forEach(function(childSnapshot) {
          //console.log("snapshot:" + childSnapshot.val());
          $scope.dataU.push([childSnapshot.val()]);
        });
        $scope.$apply();
      });
    }


    $scope.getDataM = function(){
      Feedback.motivation('1');
      var motivationRef = firebase.database().ref('lecture/1/motivationData');
      motivationRef.on('value', function(snapshot) {
        $scope.dataM = [];
        snapshot.forEach(function(childSnapshot) {
          //console.log("snapshot:" + childSnapshot.val());
          $scope.dataM.push([childSnapshot.val()]);
        });
        $scope.$apply();
      });
    }

    $scope.getDataC = function(){
      Feedback.confidence('1');
      var confidenceRef = firebase.database().ref('lecture/1/confidenceData');
      confidenceRef.on('value', function(snapshot) {
        $scope.dataC = [];
        snapshot.forEach(function(childSnapshot) {
          //console.log("snapshot:" + childSnapshot.val());
          $scope.dataC.push([childSnapshot.val()]);
        });
        $scope.$apply();
      });
    }


      var initUnderstanding = function(){
        $scope.labelsUnderstanding = ['Avg. in %'];
        $scope.series = ['Series A'];
        $scope.optionsUnderstanding = {
          scales: {
              xAxes: [{
                  ticks: {
                      beginAtZero:true,
                      max:100
                  }
              }]
          },
          title: {
              display: true,
              text: 'Understanding',
              fontSize: 18
              //fontColor: '#000'
          }
        };
        $scope.colorsUnderstanding = ["rgb(65,105,225)"];
        $scope.dataUnderstanding = [0];
      }
      var initMotivation = function(){
        $scope.labelsMotivation = ['Avg. in %'];
        $scope.series = ['Series A'];
        $scope.optionsMotivation = {
          scales: {
              xAxes: [{
                  ticks: {
                      beginAtZero:true,
                      max:100
                  }
              }]
          },
          title: {
              display: true,
              text: 'Motivation',
              fontSize: 18
              //fontColor: '#000'
          }
        };
        $scope.colorsMotivation = ["rgb(15,204,0)"];
        $scope.dataMotivation = [0];
      }

      var initConfidence = function(){
        $scope.labelsConfidence = ['Avg. in %'];
        $scope.series = ['Series A'];
        $scope.optionsConfidence = {
          scales: {
              xAxes: [{
                  ticks: {
                      beginAtZero:true,
                      max:100
                  }
              }]
          },
          title: {
              display: true,
              text: 'Confidence',
              fontSize: 18
              //fontColor: '#000'
          }
        };
        $scope.colorsConfidence = ["rgb(135,206,250)"];
        $scope.dataConfidence = [0];
      }



      var onlineRef = firebase.database().ref('lecture/1/online');
      onlineRef.on('value', function(snapshot) {
        //console.log(snapshot.val());
        online = snapshot.val();
        $scope.online = online;
        $scope.$apply();
      });



      $scope.understanding = function(){
        Feedback.understanding('1');
        var understandingRef = firebase.database().ref('lecture/1/averageUnderstanding');
        understandingRef.on('value', function(snapshot) {
          //console.log(snapshot.val());
          $scope.dataUnderstanding = [snapshot.val()];

          $scope.$apply();
        });
      }

      $scope.motivation = function(){
        Feedback.motivation('1');
        var motivationRef = firebase.database().ref('lecture/1/averageMotivation');
        motivationRef.on('value', function(snapshot) {
          //console.log(snapshot.val());
          $scope.dataMotivation = [snapshot.val()];

          $scope.$apply();
        });
      }

      $scope.confidence = function(){
        Feedback.confidence('1');
        var confidenceRef = firebase.database().ref('lecture/1/averageConfidence');
        confidenceRef.on('value', function(snapshot) {
          //console.log(snapshot.val());
          $scope.dataConfidence = [snapshot.val()];

          $scope.$apply();
        });
      }

      $scope.noteRequest = function(){
        Feedback.getNoteRequests();
        var tooFastRef = firebase.database().ref('lecture/1/tooFastTotal');
        tooFastRef.on('value', function(snapshot){
          //console.log("noteRequest Triggered");
          $scope.tooFast = snapshot.val();
          $scope.$apply();
        });
      }

      $scope.getAverages = function(){
        if(!$scope.average){
          $scope.average = true;
          $scope.averageText = "Show distributions";
        }
        else{
          $scope.average = false;
          $scope.averageText = "Show averages";
        }
      }
      initMotivation();
      initUnderstanding();
      initConfidence();

      $scope.getDataU();
      $scope.getDataM();
      $scope.getDataC();
      $scope.understanding();
      $scope.motivation();
      $scope.confidence();
      $scope.noteRequest();
}]);




//$scope.labelsDonught = ["is","is not"];
//$scope.dataDoughnut = [snapshot.val(),100-snapshot.val()];
//$scope.dataLine.push(snapshot.val());
//$scope.labelsLine.push("val:"+snapshot.val());
////console.log($scope.dataLine);
//  $scope.dataDoughnut = [10, 20];
//  $scope.labelsDoughnut = ["is","is not"];
//  $scope.dataLine = [0];
//  $scope.labelsLine = ["val: 0"];
/*$scope.optionsLine = {
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true,
              max:100
          },
          type: 'linear',
          display: true,
          position: 'left'
      }]
  },
  title: {
      display: true,
      text: 'Understanding data points'
  }
};
$scope.optionsDoughnut = {
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true,
              max:100
          },
          type: 'linear',
          display: true,
          position: 'left'
      }]
  },
  title: {
      display: true,
      text: 'Understanding doughnut diagram'
  }
};*/
