'use strict';

angular.module('watsonApp', [
  'ui.router',
  'watsonApp.home',
  'watsonApp.about'
])

.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {

  $stateProvider.state("otherwise", {
      url: "*path",
      templateUrl: 'app/home/404.html',
      controller: 'HomeCtrl as ctrl'
  });

  $locationProvider.html5Mode(true);
}]);