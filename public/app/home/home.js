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

  homeCtrl.question = "";
  homeCtrl.answer = '';
  homeCtrl.showAnswer = false;

  homeCtrl.askWatson = function(){
    var json = {
      "question": {
        "questionText" : homeCtrl.question
      }
    }
    $http({
      method: 'POST',
      url: '/question',
      data: json
    }).then(function success(response) {
        console.log(response);
        homeCtrl.answer = response.data;
        homeCtrl.showAnswer = true;
      }, function error(response) {
        console.log(response)
      });
  };
});