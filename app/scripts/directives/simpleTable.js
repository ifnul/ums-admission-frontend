'use strict';

angular.module('admissionSystemApp')
  .directive('simpleTable', function () {

    return {
      templateUrl: '../views/directives/simpleTable.html',
      restrict: 'E',
      replace: true,
      scope: {
        data: '=',
        headers: '=',
        onChange: '&?',
        isChange: '='
      }
    };
  });
