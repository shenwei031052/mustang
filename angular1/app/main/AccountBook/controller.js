(function () {
  'use strict';

  angular.module('main.accountBook', ['ui.router'])

    .config(['$stateProvider', function ($stateProvider) {
      var userState = {
        name: 'main.accountBook',
        url: '/accountBook',
        templateUrl: 'main/AccountBook/templ.html',
        controller: 'AccountBookCtrl'
      };
      $stateProvider.state(userState);
    }])
    .controller('AccountBookCtrl', AccountBookCtrl);

  AccountBookCtrl.$inject = ['$scope', 'RestService'];

  function AccountBookCtrl($scope, RestService) {


  }
})();