(function () {
  'use strict';

  angular.module('main.investment', ['ui.router'])

    .config(['$stateProvider', function ($stateProvider) {
      var investmentState = {
        name: 'main.investment',
        url: '/investment',
        templateUrl: 'main/Investment/templ.html',
        controller: 'InvestmentCtrl'
      };
      $stateProvider.state(investmentState);
    }])
    .controller('InvestmentCtrl', InvestmentCtrl);

  InvestmentCtrl.$inject = ['$scope', 'RestService'];

  function InvestmentCtrl($scope, RestService) {
    $scope.investments = [];
    $scope.newInvestment = {};



    RestService.getAllInvestments()
      .then(function (data) {
        $scope.investments = data;
      });


    $scope.addInvestment = function () {
      $scope.add = true;
    };

    $scope.save = function () {

      if ($scope.add) {
        $scope.investments.push($scope.newInvestment);
      }
      RestService.upsertInvestments($scope.investments)
        .then(function (data) {
          $scope.investments = data;
          $scope.newInvestment = {};
          $scope.add = false;
        });

    };

    $scope.delete = function (investment) {
      RestService.deleteInvestment(investment)
        .then(function (data) {
          RestService.getAllInvestments()
            .then(function (data) {
              $scope.investments = data;
            });
        });
    }


  }
})();