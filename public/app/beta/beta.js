'use strict';

angular.module('watsonApp.beta', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state("beta", {
    url: '/beta',
    templateUrl: 'app/beta/beta.html',
    controller: 'HomeCtrl as ctrl'
  });
});