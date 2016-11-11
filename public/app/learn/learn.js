'use strict';

angular.module('watsonApp.learn', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state("learn", {
    url: '/learn',
    templateUrl: 'app/learn/learn.html',
    controller: 'LearnCtrl as ctrl'
  });
})

.controller('LearnCtrl', function() {
  this.message = 'Learn!';
});