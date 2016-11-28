'use strict';

angular.module('watsonApp', [
  'ui.router',
  'watsonApp.home',
  'watsonApp.about',
  'watsonApp.login',
  'watsonApp.admin',
  'watsonApp.demo',
  'watsonApp.beta'
])

.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
  
  $stateProvider.state("otherwise", {
      url: "*path",
      templateUrl: 'app/home/404.html',
      controller: 'HomeCtrl as ctrl'
  });

  $locationProvider.html5Mode(true);
}])

.directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);