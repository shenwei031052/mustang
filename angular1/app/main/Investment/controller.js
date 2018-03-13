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

  InvestmentCtrl.$inject = ['$scope', 'RestService', "$uibModal", "$document"];

  function InvestmentCtrl($scope, RestService, $uibModal, $document) {

    $scope.investments = [];

    $scope.init = function () {
      RestService.getAllInvestments()
        .then(function (data) {
          $scope.investments = data;
          $scope.$broadcast('investments');
        });
    };
    $scope.init();

    $scope.delete = function (investment) {
      RestService.deleteInvestment(investment)
        .then(function () {
          $scope.init();
        });
    };

    $scope.upsert = function (investment) {
      var investments = [];
      investments.push(investment);
      RestService.upsertInvestments(investments)
        .then(function () {
          $scope.init();
        });
    };

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };


    //modal

    $scope.modalTitle = '';

    $scope.new = function () {
      $scope.modalTitle = 'New Investment';
      $scope.open();
    };
    $scope.edit = function (investment) {
      $scope.modalTitle = 'Edit Investment';
      $scope.open(investment);
    };

    $scope.open = function (investment) {
      var parentElem = angular.element($document[0].querySelector('#investment'));
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: '$scope',
        appendTo: parentElem,
        resolve: {
          modalTitle: function () {
            return $scope.modalTitle;
          },
          invest: function () {
            return investment;
          }
        }
      });

      modalInstance.result.then(
        function (investment) {
          if (investment.delete) {
            $scope.delete(investment);
          } else {
            $scope.upsert(investment);
          }
        }, function () {
          //dismiss function
        }
      );
    };


  }


  angular.module('main.investment')
    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, modalTitle, invest) {

      //datepicker start
      $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 0,
        showWeeks: false
      };

      $scope.openStartDate = function () {
        $scope.popupStartDate.opened = true;
      };

      $scope.openEndDate = function () {
        $scope.popupEndDate.opened = true;
      };

      $scope.popupStartDate = {
        opened: false
      };

      $scope.popupEndDate = {
        opened: false
      };
      //datepicker end

      $scope.modalTitle = modalTitle;
      $scope.investment = invest ? invest : {};
      $scope.platforms = ['Alipay', 'Eloan', 'cheyr', 'Tuandai', 'Hexindai', 'Lianbi'];
      $scope.types = ['Current', 'Deposit'];

      $scope.delete = function () {
        $scope.investment.delete = true;
        $uibModalInstance.close($scope.investment);
      };

      $scope.save = function () {
        $uibModalInstance.close($scope.investment);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    });

})();


