'use strict';

angular.module('watsonApp.demo', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state("demo", {
    url: '/demo',
    templateUrl: 'app/demo/demo.html',
    controller: 'HomeCtrl as ctrl'
  });
});