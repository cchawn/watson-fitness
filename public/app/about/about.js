'use strict';

angular.module('watsonApp.about', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state("about", {
    url: '/about',
    templateUrl: 'app/about/about.html',
    controller: 'AboutCtrl as ctrl'
  });
})

.controller('AboutCtrl', function() {
  this.message = 'About us!';
});