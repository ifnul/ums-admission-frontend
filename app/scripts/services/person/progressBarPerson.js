/**
 * Created by nikolay on 08.07.15.
 */

'use strict';

angular
  .module('admissionSystemApp')
  .factory('progressBarPersonSvc', function () {

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

        // NOTE!!! this's hack!!! count should always be equivalent to number of inputs required (with attributes val-buble!)
        count = (count >= 16) ? count : 16;
        valid = (valid >= 2) ? valid : 2;
        //console.log(count);
        return Math.round(valid * 100 / count);
      }
    };
  });
