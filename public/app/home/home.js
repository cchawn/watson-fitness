'use strict';

angular.module('watsonApp.home', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/home/home.html',
    controller: 'HomeCtrl as ctrl'
  });
})

.controller('HomeCtrl', function($http) {
  var homeCtrl = this;

  homeCtrl.question = '';
  homeCtrl.answer = '';
  homeCtrl.confidence = 0;
  homeCtrl.showAnswer = false;

  homeCtrl.alertMsg = '';
  homeCtrl.showAlert = false;

  homeCtrl.askWatson = function(){
    var json = {
      "question": homeCtrl.question
    };
    $http({
      method: 'POST',
      url: '/question',
      data: json
    }).then(function success(response) {
        console.log(response);
        if (response.data.question.answers.length > 0) {
          var answer = response.data.question.evidencelist[0]
          homeCtrl.answer = answer.text;
          homeCtrl.confidence = answer.value;
          homeCtrl.showAnswer = true;
        } else {
          homeCtrl.alertMsg = 'No answers for this question... sad face.';
          homeCtrl.showAlert = true;
        }
      }, function error(response) {
        console.log(response)
      });
  };
});