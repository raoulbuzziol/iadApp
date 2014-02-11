'use strict';

/* app */
var iadApp = angular.module('iadApp', ['ngRoute','iadControllers', 'ngSanitize']);

iadApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/sessions', {
        templateUrl: pathToFiles+'session-list.html',
        controller: 'SessionListCtrl'
      }).
      when('/sessions/:sessionId', {
        templateUrl: pathToFiles+'session-detail.html',
        controller: 'SessionDetailCtrl'
      }).
      otherwise({
        redirectTo: '/sessions'
      });
  }]);


/* controllers */

var iadControllers = angular.module('iadControllers', []);

iadControllers.controller('SessionListCtrl', ['$scope','$http',
  function($scope, $http) {
    $http.get(pathToFiles+'sessions.json').success(function(data) {
      $scope.sessions = data;
      $scope.orderProp = 'date';    
    });
  }]);

iadControllers.controller('SessionDetailCtrl', ['$scope','$http','$routeParams','$sce',
  function($scope, $http, $routeParams, $sce) {
    $http.get(pathToFiles+'sessions.json').success(function(data) {
      $scope.session = getById(data, $routeParams.sessionId);
    });
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
  }]);

function getById(rows, id) {
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].id == id)      
      return rows[i];
  }
}
