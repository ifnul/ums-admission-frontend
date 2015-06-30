'use strict';

angular
  .module('admissionSystemApp')
  .factory('progressBarService', function () {

    var inputs = {};

    return {
      setValidity: function (name, value) {
        inputs[name] = value;
      },
      reset: function () {
        inputs = {};
      },
      getValidPercentage: function () {
        var count = 0,
          valid = 0;

        angular.forEach(inputs, function (value) {
          count++;
          if (value) {
            valid++;
          }
        });

        return Math.round(valid * 100 / count);
      }
    };
  });
