'use strict';

angular.module('watsonApp.login', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl as ctrl'
  });
})

.controller('LoginCtrl', function($http, $scope, $state) {
  var loginCtrl = this;

  loginCtrl.hello = 'hey there';

});