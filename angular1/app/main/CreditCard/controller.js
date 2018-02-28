(function () {
  'use strict';

  angular.module('main.creditCard', ['ui.router'])

    .config(['$stateProvider', function ($stateProvider) {
      var userState = {
        name: 'main.creditCard',
        url: '/creditCard',
        templateUrl: 'main/CreditCard/templ.html',
        controller: 'CreditCardCtrl'
      };
      $stateProvider.state(userState);
    }])
    .controller('CreditCardCtrl', CreditCardCtrl);

  CreditCardCtrl.$inject = ['$scope', 'RestService', "$http"];

  function CreditCardCtrl($scope, RestService, $http) {

    $scope.creditCards = [];

    $http.get("/mockData/credit_card.json")
      .then(function (response) {
        $scope.creditCards = response.data;
      });
  }
})();