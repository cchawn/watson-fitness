'use strict';

angular.module('watsonApp.home', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state("home", {
    url: '/',
    templateUrl: 'app/home/home.html',
    controller: 'HomeCtrl as ctrl'
  });
})

.controller('HomeCtrl', function() {
  this.message = 'HOLA!';
});