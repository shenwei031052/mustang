(function () {

  var main = angular.module('myApp.main', [
    'ui.router',
    '720kb.datepicker',
    'main.user',
    'main.accountBook',
    'main.creditCard',
    'main.investment'
  ])
    .config(['$stateProvider', function ($stateProvider) {
      var mainState = {
        name: 'main', url: '/main',
        templateUrl: 'main/main.html',
        controller: 'mainCtrl'
      };
      $stateProvider.state(mainState);
    }])
    .controller('mainCtrl', mainCtrl);

  mainCtrl.$inject = ['$scope', '$location', 'RestService'];

  function mainCtrl($scope, $location, RestService) {

    $scope.loginUser = {};
    RestService.getLoginUser()
      .then(function (data) {
        $scope.loginUser = data;
      });

    $scope.logout = function () {

      var $cookies;
      angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
        $cookies = _$cookies_;
      }]);

      $cookies.remove('token');
      $location.path("/login");
    };

    $scope.openNaviBar = function () {
      var x = document.getElementById("nav-head");
      if (x.className === "nav_head") {
        x.className += " responsive";
      } else {
        x.className = "nav_head";
      }
    };

    $scope.hideMenu = function () {
      var x = document.getElementById("nav-head");
      x.className = "nav_head";
    }
  }


  main.factory('clickAnywhereButHereService', function ($document) {
    var tracker = [];

    return function ($scope, expr) {
      var i, t, len;
      for (i = 0, len = tracker.length; i < len; i++) {
        t = tracker[i];
        if (t.expr === expr && t.scope === $scope) {
          return t;
        }
      }
      var handler = function () {
        $scope.$apply(expr);
      };

      $document.on('click', handler);

      // IMPORTANT! Tear down this event handler when the scope is destroyed.
      $scope.$on('$destroy', function () {
        $document.off('click', handler);
      });

      t = {scope: $scope, expr: expr};
      tracker.push(t);
      return t;
    };
  });

  main.directive('clickAnywhereButHere', function ($document, clickAnywhereButHereService) {
    return {
      restrict: 'A',
      link: function (scope, elem, attr, ctrl) {
        var handler = function (e) {
          e.stopPropagation();
        };
        elem.on('click', handler);

        scope.$on('$destroy', function () {
          elem.off('click', handler);
        });

        clickAnywhereButHereService(scope, attr.clickAnywhereButHere);
      }
    };
  });

})();