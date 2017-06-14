
angular.
module('myApp.database', [])
.service('Feedback', [function() {
  var config = {
    apiKey: "AIzaSyC_AnIfaYJBIvtbDtcRVLUBI-bUiE_gPUs",
    authDomain: "bach-b065e.firebaseapp.com",
    databaseURL: "https://bach-b065e.firebaseio.com",
    storageBucket: "bach-b065e.appspot.com",
    messagingSenderId: "707820384230"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var lectureRef = database.ref('lecture/1');
  var presentRef = database.ref('lecture/1/present');
  var understandingArray = [0,0,0,0,0];

//------------------------------------------
//Get Understanding
  this.understanding = function(lectureID){
    var online = 0;
    presentRef.on("value", function(snapshot){
        online = snapshot.numChildren();
        setOnline(online);
        console.log("online:" + online);
        updateAvgUnderstanding(snapshot, online);
    });
  }

  this.getDataU = function(){
    return understandingArray;
  }


  var setOnline = function(online){
    if(online && online !== 'null' && online !== 'undefined'){
      lectureRef.update({online:online});
    }
  }



  var updateAvgUnderstanding = function(snapshot, online){
    var total = 0;
    var dataArray = [0,0,0,0,0];
    snapshot.forEach(function(s) {
      var val = parseInt(s.val().understanding);
      if(val < 21){dataArray[0]++;}
      else if(val < 41){dataArray[1]++;}
      else if(val < 61){dataArray[2]++;}
      else if(val < 81){dataArray[3]++;}
      else if(val < 101){dataArray[4]++;}
      total += val;
    });
  //  console.log("["+ dataArray[0] +"," + dataArray[1] + "," + dataArray[2] + "," + dataArray[3] + "," + dataArray[4] + "]");
    var averageUnderstanding =  total/online;
    if(averageUnderstanding !== 'null' && averageUnderstanding !== 'undefined' && dataArray !== 'null' && dataArray !== 'undefined'  &&  !isNaN(averageUnderstanding)){
      console.log("got in here Understanding");
      lectureRef.update({averageUnderstanding:averageUnderstanding, understandingData:dataArray});
    }
  }

//------------------------------------------
 //Get Motivation
  this.motivation = function(lectureID){
    var online = 0;
    presentRef.on("value", function(snapshot){
        online = snapshot.numChildren();
        updateAvgMotivation(snapshot, online);
    });
  }

  var updateAvgMotivation = function(snapshot, online){
    var total = 0;
    var dataArray = [0,0,0,0,0];
    snapshot.forEach(function(s) {
      var val = parseInt(s.val().motivation);
      if(val < 21){dataArray[0]++;}
      else if(val < 41){dataArray[1]++;}
      else if(val < 61){dataArray[2]++;}
      else if(val < 81){dataArray[3]++;}
      else if(val < 101){dataArray[4]++;}
      total += val;
    });
    var averageMotivation =  total/online;
    if(averageMotivation !== 'null' && averageMotivation !== 'undefined'  &&  !isNaN(averageMotivation) && dataArray !== 'null' && dataArray !== 'undefined'){
      lectureRef.update({averageMotivation:averageMotivation, motivationData:dataArray});
    }
  }


  //------------------------------------------
   //Get Confidence
    this.confidence = function(lectureID){
      var online = 0;

      presentRef.on("value", function(snapshot){
          online = snapshot.numChildren();
          console.log("online:" + online);
          updateAvgConfidence(snapshot, online);
      });

    }

    var updateAvgConfidence = function(snapshot, online){
      var total = 0;
      var dataArray = [0,0,0,0];
      snapshot.forEach(function(s) {
        var val = parseInt(s.val().confidence);
        if(val < 26){dataArray[0]++;}
        else if(val < 51){dataArray[1]++;}
        else if(val < 76){dataArray[2]++;}
        else if(val < 101){dataArray[3]++;}
        total += val;
      });
      var averageConfidence =  total/online;
      console.log("ConfidenceAvg: " + averageConfidence);
      if(averageConfidence !== 'null' && averageConfidence !== 'undefined' &&  !isNaN(averageConfidence) && dataArray !== 'null' && dataArray !== 'undefined'){
        console.log("got in here");
        lectureRef.update({averageConfidence:averageConfidence, confidenceData:dataArray});
      }
    }


//noteRequests
    this.getNoteRequests = function(){
      presentRef.on("child_changed",updateNoteRequests);
      presentRef.on("child_removed",updateNoteRequests); /* function(snapshot){
       var deletedChild = snapshot.val();
        if(deletedChild.tooFast == 1){

        }
      });*/
      //presentRef.on("value", updateNoteRequests);
    };




    var updateNoteRequests = function(snaps){
      console.log("On value called");
      presentRef.once('value').then(function(snapshot) {
        console.log("presentRef once called - numchildren: " + snapshot.numChildren());
        if (snapshot.numChildren() == 0){
          lectureRef.update({tooFastTotal:0, online:0, averageConfidence:0, averageMotivation:0, averageUnderstanding:0, understandingData:[0,0,0,0,0],motivationData:[0,0,0,0,0],confidenceData:[0,0,0,0]});
        }
        var total = 0;
        snapshot.forEach(function(s){
          console.log("tooFastBeforeParse: " + s.val().tooFast);
          var tooFast = parseInt(s.val().tooFast);
          console.log("tooFastWas" + tooFast);
          if(!isNaN(tooFast)){

            total += tooFast;
            console.log("totalNoteRequests" + total);
          }
          if(total !== 'null' && total !== 'undefined' && total !== 'NaN'){
            console.log("totalWas:" + total);
            lectureRef.update({tooFastTotal:total});
            console.log("updated lecture with tooFast: " + total);
          }
        });
      });



    }

 }]);
