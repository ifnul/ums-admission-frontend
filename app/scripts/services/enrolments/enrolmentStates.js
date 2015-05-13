'use strict';

angular
  .module('admissionSystemApp')
  .factory('enrolmentStates', ['DictionariesSvc', function (DictionariesSvc) {

    var stateObj = {
      1: [2, 3, 4, 9],
      2: [4],
      3: [],
      4: [2, 5, 6, 13],
      5: [6, 7, 13],
      6: [5, 13],
      7: [12],
      8: [2, 3, 4, 9],
      9: [2, 3, 4],
      10: [],
      11: [],
      12: [],
      13: [7, 6]
    };

    function searchStates (arr) {
      return DictionariesSvc.getEnrolmentsStatusTypes().then(function (states) {
        var i, searchResult = [];

        angular.forEach(states, function (state) {
          for (i = 0; i < arr.length; i++) {
            if (state.id === arr[i]) {
              searchResult.push(state);
            }
          }
        });
        return searchResult;
      });
    }

    return {
      checkState: function (state) {
        return stateObj[state];
      },
      searchStates: searchStates
    };

  }]);
