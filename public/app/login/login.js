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

  loginCtrl.$state = $state;
  loginCtrl.showAlert = false;
  loginCtrl.alertMsg = '';
  loginCtrl.password = '';
  loginCtrl.username = '';

  function alert(show, msg){
    loginCtrl.showAlert = show;
    loginCtrl.alertMsg = msg;
  }

  loginCtrl.clearAlert = function(){
    alert(false, '');
  }

  loginCtrl.login = function(){
    loginCtrl.$state.go('admin');
  }

});