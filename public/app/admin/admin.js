'use strict';

angular.module('watsonApp.admin', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: 'app/admin/admin.html',
    controller: 'AdminCtrl as ctrl'
  });
})

.controller('AdminCtrl', function($http, $scope, $state) {
  var adminCtrl = this;

  adminCtrl.hello = 'ADMIN';

});