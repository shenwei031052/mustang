(function () {

  var main = angular.module('myApp.main', [
    'main.user',
    'main.accountBook',
    'main.creditCard',
    'main.investment',
    'main.forecast'
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


  //Pagination Directives
  angular.module('pagination.directives', []);

  main.directive('pagination', function () {
    return {
      restrict: 'AE',
      replace: true,
      template: '\
            <div class="pager" style="border:0">\
              <ul class="pages">\
                <li class="pgNext pgEmpty" ng-click="jumpHead()" ng-disabled="firstPageDisabled()">First</li> \
                <li class="pgNext pgEmpty" ng-click="prevPage()" ng-disabled="prevPageDisabled()">Previous</li>\
                <li class="pgNext pgEmpty" ng-hide="prevPageDisabled() || (currentNum+1<=1)">...</li> \
                <li class="pgNext pgEmpty" ng-repeat="num in number | \
                                                      offset: currentNum*pageList | \
                                                      limitTo: pageList" \
                    ng-click="jumpPage(num)" \
                    ng-class="{pgCurrent: currentPage+1 == num}">{{num}}</li> \
                <li class="pgNext pgEmpty" ng-hide="nextPageDisabled() || (total<=pageList)">...</li> \
                <li class="pgNext pgEmpty" ng-click="nextPage()" ng-disabled="nextPageDisabled()">Next</li>\
                <li class="pgNext pgEmpty" ng-click="jumpEnd()" ng-disabled="lastPageDisabled()">Last</li> \
              </ul>\
            </div>',
      link: function (scope, element, attrs) {
        scope.$on(attrs.itemslist, function () {
          finish();
          scope.jumpPage(1);
        });
        var finish = function () {
          scope.currentPage = attrs.currentpage;
          scope.itemsPerPage = attrs.itemsperpage;
          scope.itemsList = scope[attrs.itemslist];
          scope.pageList = attrs.pagelist;


          scope.pageCount = function () {
            if (scope.itemsList) {
              return Math.ceil(scope.itemsList.length / scope.itemsPerPage);
            } else {
              return 1;
            }
          };
          scope.total = scope.pageCount();
          scope.number = [];
          for (var i = 0; i < scope.total; i++) {
            scope.number.push(i + 1);
          }


          scope.currentNum = 0;
          scope.jumpPageList = function () {
            scope.currentNum = parseInt(scope.currentPage / scope.pageList);
          };

          scope.jumpPage = function (num) {
            scope.currentPage = num - 1;
            scope.jumpPageList();
          };

          scope.jumpHead = function () {
            scope.currentPage = 0;
            scope.jumpPageList();
          };

          scope.firstPageDisabled = function () {
            return scope.currentPage + 1 === 1;
          };

          scope.jumpEnd = function () {
            scope.currentPage = scope.total - 1;
            scope.jumpPageList();
          };

          scope.lastPageDisabled = function () {
            return scope.currentPage + 1 === scope.total;
          };

          scope.prevPage = function () {
            if (scope.prevPageDisabled()) {
              return;
            }
            if (scope.currentPage > 0) {
              scope.currentPage--;
            }
            scope.jumpPageList();
          };

          scope.prevPageDisabled = function () {
            return scope.currentPage + 1 === 1;
          };

          scope.nextPage = function () {
            if (scope.nextPageDisabled()) {
              return;
            }
            if (scope.currentPage < scope.pageCount()) {
              scope.currentPage++;
            }
            scope.jumpPageList();
          };

          scope.nextPageDisabled = function () {
            return (scope.currentPage + 1) === scope.total;
          };
        }
      }
    }
  });

//Filters
  angular.module('pagination.filters', []);
  main.filter('offset', function () {
    return function (input, start) {
      if (input) {
        start = parseInt(start, 10);
        return input.slice(start);
      } else {
        return [];
      }
    };
  });

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