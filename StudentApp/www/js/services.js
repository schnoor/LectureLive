angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])


.service('LectureService', ['$firebaseObject', function($firebaseObject) {
  var config = {
    apiKey: "AIzaSyC_AnIfaYJBIvtbDtcRVLUBI-bUiE_gPUs",
    authDomain: "bach-b065e.firebaseapp.com",
    databaseURL: "https://bach-b065e.firebaseio.com",
    storageBucket: "bach-b065e.appspot.com",
    messagingSenderId: "707820384230"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var lectureRef = firebase.database().ref("lecture/1");
  var lectureObj = $firebaseObject(lectureRef);
  var presentRef = firebase.database().ref("lecture/1/present");
  var userRef = {};
  var userObj = {};
  var presenceRef = firebase.database().ref(".info/connected");


  var setUsersInRoom = function(understanding, motivation, confidence){
    if(userRef && userRef !== 'null' && userRef !== 'undefined'){
      userRef = presentRef.push();
      userObj = $firebaseObject(userRef);
    }
    // Add ourselves to presence list when online.
    presenceRef.on("value", function(snap) {
      if (snap.val()) {
        // Remove ourselves when we disconnect.
        userRef.onDisconnect().remove();

        userRef.set({
          understanding: understanding,
          motivation: motivation,
          confidence: confidence
        }, function(){
          userObj = $firebaseObject(userRef);
          console.log("user init done");

      });
      }
    })
  };

/* Number of online users is the number of objects in the presence list.
listRef.on("value", function(snap) {
  console.log("# of online users = " + snap.numChildren());
});*/


  var initLecture = function(){
    /*lectureRef = firebase.database().ref("lecture/1");
    lectureRef = lectureRef.push();
    lectureObj = $firebaseObject(lectureRef);
    lectureId = lectureRef.key;*/
  };

  var getCurrentLecture = function(id){
    lectureRef = firebase.database().ref("lecture/" + id);
    lectureObj = $firebaseObject(lectureRef);
  };

  var setUnderstanding = function(und){
    console.log("setUnderstanding");
    userRef.update({understanding:und})
    userObj.understanding = und;
    console.log("understanding saved");
  };

  var getUnderstanding = function(){
    console.log("getUnderstanding");
    return userObj.understanding;
  };

  var setConfidence = function(con){
    console.log("setConfidence");
    userRef.update({confidence:con})
    userObj.confidence = con;
    console.log("Confidence saved");
  };

  var getConfidence = function(){
    console.log("getConfidence");
    return userObj.confidence;
  };


  var setMotivation = function(mot){
    console.log("setMotivation");
    userRef.update({motivation:mot});
    userObj.motivation = mot;

  };

  var getMotivation = function(){
    console.log("getMotivation");
    return userObj.motivation;
  };

  var incrementTooFast = function(){
    userRef.child("tooFast").transaction(function(tooFast){
        return (tooFast || 0) + 1;
    });
  };

  var decrementTooFast = function(){
    userRef.child("tooFast").transaction(function(tooFast){
        return (tooFast || 0) - 1;
    });
  };

  var addText = function(text){
      lectureRef.child("lectureFeedback").push(text);
  };

  var addFeedbackText = function(text){
      lectureRef.child("appFeedback").push(text);
  };


  return {
    initLecture: initLecture,
    setUsersInRoom: setUsersInRoom,
    getCurrentLecture: getCurrentLecture,
    setUnderstanding: setUnderstanding,
    getUnderstanding: getUnderstanding,
    setConfidence: setConfidence,
    getConfidence: getConfidence,
    setMotivation: setMotivation,
    getMotivation: getMotivation,
    incrementTooFast: incrementTooFast,
    decrementTooFast: decrementTooFast,
    addFeedbackText: addFeedbackText,
    addText: addText
  };


}]);
