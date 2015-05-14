'use strict';

angular.module('admissionSystemApp')

  .factory('BenefitsSvc', ['$http', '$q', 'DictionariesSvc', function ($http, $q, DictionariesSvc) {
    var flag = 0,
        data = [],
        subjectObject = {},
        benefits = $q.defer(),
        getBenefits;

    subjectObject.benefitsArray = [];
    subjectObject.benefitsMainArray = [];

    //Get benefits function
    getBenefits = function () {
      var i;

      if (flag === 0) {
        flag += 1;
        DictionariesSvc.getBenefits().then(function (res) {
          angular.extend(data, res);

          for (i = 0; i < data.length; i++) {
            if (data[i].benefitTypeId === 3 || data[i].benefitTypeId === 5) {
              subjectObject.benefitsArray.push(data[i]);
            }
            else if (data[i].benefitTypeId === 6 || data[i].benefitTypeId === 7) {
              subjectObject.benefitsMainArray.push(data[i]);
            }
          }

          benefits.resolve(subjectObject);
        });
      }

      return benefits.promise;
    };

    return {
      //function returns Promise with benefits
      getBenefits: getBenefits
    };
  }]);
