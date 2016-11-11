'use strict';

angular.module('watsonApp.home', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/home/home.html',
    controller: 'HomeCtrl as ctrl'
  });
})

.controller('HomeCtrl', function($http, $scope) {
  var homeCtrl = this;

  homeCtrl.placeholder = 'Your question here!';

  homeCtrl.question = '';
  homeCtrl.answer = '';
  homeCtrl.confidence = 0;
  homeCtrl.showAnswer = false;

  homeCtrl.alertMsg = '';
  homeCtrl.showAlert = false;

  homeCtrl.askWatson = function(){
    homeCtrl.answer = '';
    homeCtrl.confidence = 0;
    homeCtrl.showAnswer = false;

    homeCtrl.alertMsg = '';
    homeCtrl.showAlert = false;

    var json = {
      "question": homeCtrl.question
    };
    $http({
      method: 'POST',
      url: '/question',
      data: json
    }).then(function success(response) {
        // console.log(response);
        var answerslist = response.data.question.answers;
        var evidencelist = response.data.question.evidencelist;
        if (answerslist.length > 0 && evidencelist.length > 0) {
          var answer = evidencelist[0];
          if (answer.hasOwnProperty('text')){
            homeCtrl.question = capitalizeFirstLetter(homeCtrl.question);
            homeCtrl.answer = answer.text;
            homeCtrl.confidence = answer.value;
            homeCtrl.showAnswer = true;
          } else {
            noAnswer();
          }
        } else {
          noAnswer();
        }
      }, function error(response) {
        console.log(response)
      });
  };

  function noAnswer() {
    console.log('No answer');
    homeCtrl.alertMsg = 'No answer for this question, try asking something else!';
    homeCtrl.showAlert = true;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  homeCtrl.dismiss = function(){
    homeCtrl.showAnswer = false;
    homeCtrl.question = '';
    homeCtrl.answer = '';
    homeCtrl.confidence = 0;
  }

  function typeQuestion(i, string) {
    setTimeout(function () {
      homeCtrl.placeholder += string[i];
      $scope.$apply();
      i++;
      if (i < string.length)
        typeQuestion(i, string);
    }, 100)
  }

  function typing() {
    var placeholders = [
      'How can I strengthen my back?',
      'Should I lift weights with a back injury?',
      'I have lower back pain, what can I do?',
      'What exercises are good for your back?'
    ];
    var max = 4;
    var min = 0;
    homeCtrl.placeholder = '';
    var ind = Math.floor(Math.random() * (max - min + 1)) + min;
    typeQuestion(0, placeholders[ind]);
  }

  typing();
});