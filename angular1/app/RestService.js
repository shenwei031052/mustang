(function () {

  'use strict';

  angular.module('myApp')
    .factory('RestService', RestService);

  RestService.$inject = ['$http', '$q'];

  function RestService($http, $q) {

    //var url = 'http://192.168.2.100:8080/';
    var url = location.protocol + '//' + location.hostname + ':8080/';


    function invokeAction(method, data, config) {

      var deferred = $q.defer();
      $http.post(url + method, JSON.stringify(data), config)
        .then(function (response) {
          if (response.status === 200) {
            if (method === 'login') {
              deferred.resolve(response.headers);
            } else {
              deferred.resolve(response.data);
            }
          } else {
            deferred.reject(response.statusText);
          }
        });

      return deferred.promise;
    }


    var svc = {};

    svc.login = function (username, password) {
      var user = {};
      user.username = username;
      user.password = password;

      return invokeAction('login', user)
    };

    svc.getLoginUser = function () {
      return invokeAction('getLoginUser');
    };

    svc.addUser = function (user) {
      return invokeAction('addUser', user);
    };

    svc.deleteUser = function (user) {
      return invokeAction('deleteUser', user);
    };

    svc.getAllUsers = function () {
      return invokeAction('getAllUsers');
    };

    svc.upsertUsers = function (users) {
      return invokeAction('upsertUsers', users);
    };

    svc.getAllInvestors = function () {
      return invokeAction("getAllInvestors");
    };

    svc.getAllInvestments = function () {
      return invokeAction("getAllInvestments");
    };

    svc.upsertInvestments = function (investments) {
      return invokeAction("upsertInvestments", investments);
    };

    svc.deleteInvestment = function (investment) {
      return invokeAction("deleteInvestment", investment);
    };

    svc.getAllCreditCards = function () {
      return invokeAction("getAllCreditCards");
    };

    svc.upsertCreditCards = function (creditCards) {
      return invokeAction("upsertCreditCards", creditCards);
    };

    svc.deleteCreditCard = function (creditCard) {
      return invokeAction("deleteCreditCard", creditCard);
    };

    svc.getAvailableFunds = function (period) {
      return invokeAction("getAvailableFunds", period)
    };

    return svc;

  }

})();