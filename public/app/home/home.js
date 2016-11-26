'use strict';

angular.module('watsonApp.home', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/home/home.html',
    controller: 'HomeCtrl as ctrl'
  });
})

.controller('HomeCtrl', function($http, $scope, $state) {
  var homeCtrl = this;

  homeCtrl.$state = $state;
  homeCtrl.placeholder = 'Ask your question here';
  homeCtrl.question = '';
  homeCtrl.answer = '';
  homeCtrl.confidence = 0;
  homeCtrl.showAnswer = false;
  homeCtrl.alertMsg = '';
  homeCtrl.showAlert = false;
  homeCtrl.showMenu = false;

  homeCtrl.isAdmin = function(state, css){
    if (state == 'admin')
      return css;
    else
      return '';
  }

  homeCtrl.toggleMenu = function(){
    homeCtrl.showMenu = !homeCtrl.showMenu;
    if (homeCtrl.showMenu) {
      angular.element(document.querySelector('#mobile-menu')).addClass('visible');
      angular.element(document.querySelector('#hide-menu')).addClass('visible')
    }
  };

  homeCtrl.activeLink = function(state, link) {
    if (state == link)
      return 'active';
    else
      return '';
  };

  homeCtrl.askWatson = function(){
    homeCtrl.answer = '';
    homeCtrl.confidence = 0;
    homeCtrl.showAnswer = false;

    homeCtrl.alertMsg = '';
    homeCtrl.showAlert = false;

    if (homeCtrl.question.length > 0) { // validation
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
              alert('No answer for this question, try asking something else!');
            }
          } else {
            alert('No answer for this question, try asking something else!');
          }
        }, function error(response) {
          console.log(response)
        });
    } else { // emtpy question field
      alert('Please enter a question!');
    }
  };

  homeCtrl.dismiss = function(){
    homeCtrl.showAnswer = false;
    homeCtrl.question = '';
    homeCtrl.answer = '';
    homeCtrl.confidence = 0;
    typing();
  };

  homeCtrl.clearAlert = function(){
    homeCtrl.alertMsg = '';
    homeCtrl.showAlert = false;
  }

  function alert(msg) {
    homeCtrl.alertMsg = msg;
    homeCtrl.showAlert = true;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function typeQuestion(i, string) {
    setTimeout(function () {
      homeCtrl.question += string[i];
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
      'I have lower back pain, what exercises can I do?',
      'What exercises are good for my back?'
    ];
    var max = 3;
    var min = 0;
    homeCtrl.question = '';
    var ind = Math.floor(Math.random() * (max - min + 1)) + min;
    typeQuestion(0, placeholders[ind]);
  }

  typing();
});