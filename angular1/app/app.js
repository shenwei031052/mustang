'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',
  [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ngCookies',
    'myApp.login',
    'myApp.main'
  ])
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.when('', '/login');
  }])
  .config(httpInterceptorRegistry)
  .config(function ($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects or libraries.
    $sceProvider.enabled(false);
  })
  .factory('accessTokenHttpInterceptor', accessTokenHttpInterceptor);


//Register the http interceptor to angular config.
httpInterceptorRegistry.$inject = ['$httpProvider'];

function httpInterceptorRegistry($httpProvider) {
  $httpProvider.interceptors.push('accessTokenHttpInterceptor');
}


//Create a http interceptor factory
accessTokenHttpInterceptor.$inject = ['$cookies'];

function accessTokenHttpInterceptor($cookies) {
  return {
    //For each request the interceptor will set the bearer token header.
    request: function ($config) {

      //Fetch token from cookie
      var token = $cookies.get('token');
      if (token) {
        //set authorization header
        $config.headers['Authorization'] = 'Bearer ' + token;
      }
      $config.headers['Access-Control-Allow-Origin'] = '*';
      return $config;
    },
    response: function (response) {
      //if you get a token back in your response you can use
      //the response interceptor to update the token in the
      //stored in the cookie
      if (response.status === 200 && response.headers("Authorization")) {
        //fetch token
        var auth = response.headers("Authorization");

        if (auth.indexOf("Bearer ") >= 0) {
          var token = auth.substr(7, auth.length);
          //set token
          $cookies.put('token', token);
        }
      }
      return response;
    }
  };
}