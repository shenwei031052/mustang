(function () {

  'use strict';

  angular.module('main.forecast', ['ui.router'])

    .config(['$stateProvider', function ($stateProvider) {
      var forecastState = {
        name: 'main.forecast',
        url: '/forecast',
        templateUrl: 'main/Forecast/templ.html',
        controller: 'ForecastCtrl'
      };
      $stateProvider.state(forecastState);
    }])
    .controller('ForecastCtrl', ForecastCtrl);

  ForecastCtrl.$inject = ['$scope', 'RestService'];

  function ForecastCtrl($scope, RestService) {

    $scope.funds = [];

    RestService.getAvailableFunds(60)
      .then(function (data) {
        $scope.funds = data;
        $scope.drawChart();
      });


    $scope.drawChart = function () {

      var forecastChart = echarts.init(document.getElementById("forecastChart"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'Forecast'
        },
        tooltip: {},
        legend: {
          data: ['Available Funds']
        },
        dataset: {
          dimensions: ['date', 'funds'],
          source: $scope.funds
            /*{product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}*/

        },
        xAxis: {type: 'category',
          axisLabel:{
            formatter:function (value)
            {
              return echarts.format.formatTime('dd', new Date(value));
            }
          }
        },
        yAxis: {},
        series: [
          {type: 'bar'}
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      forecastChart.setOption(option);
    }

  }


})();