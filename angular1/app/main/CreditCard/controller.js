(function () {
  'use strict';

  angular.module('main.creditCard', ['ui.router'])

    .config(['$stateProvider', function ($stateProvider) {
      var creditCardState = {
        name: 'main.creditCard',
        url: '/creditCard',
        templateUrl: 'main/CreditCard/templ.html',
        controller: 'CreditCardCtrl'
      };
      $stateProvider.state(creditCardState);
    }])
    .controller('CreditCardCtrl', CreditCardCtrl);

  CreditCardCtrl.$inject = ['$scope', 'RestService', "$http"];

  function CreditCardCtrl($scope, RestService, $http) {

    $scope.creditCards = [];
    $scope.newCreditCard = {};

    RestService.getAllCreditCards()
      .then(function (data) {
        $scope.creditCards = data;
      });


    $scope.addCreditCard = function () {
      $scope.add = true;
    };

    $scope.save = function () {

      if ($scope.add) {
        $scope.creditCards.push($scope.newCreditCard);
      }
      RestService.upsertCreditCards($scope.creditCards)
        .then(function (data) {
          $scope.creditCards = data;
          $scope.newCreditCard = {};
          $scope.add = false;
        });

    };

    $scope.delete = function (creditCard) {
      RestService.deleteCreditCard(creditCard)
        .then(function (data) {
          RestService.getAllCreditCards()
            .then(function (data) {
              $scope.creditCards = data;
            });
        });
    }

  }
})();