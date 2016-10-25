'use strict';

angular.module('watsonApp.view1', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state("view1", {
    url: '/view1',
    templateUrl: 'app/view1/view1.html',
    controller: 'View1Ctrl as ctrl'
  });
})

.controller('View1Ctrl', function() {
  this.message = 'VIEW 1!';
});