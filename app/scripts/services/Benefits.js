'use strict';

angular.module('admissionSystemApp')

//http://176.36.11.25/api-lnu/enrolments/subjects
//http://104.236.29.16:8080/is-lnu-rest-api/api/enrolments/subjects
  .factory('Benefits', ['$http', '$q', 'SpecofferDictionaryService', function ($http, $q, SpecofferDictionaryService) {
    var flag = 0;
    var data= [];
    var subjectObject = {};
    subjectObject.subjectsArray = [];
    subjectObject.subjectsMainArray = [];
    var benefits = $q.defer();

    //Get benefits function
    var getBenefits = function () {
      if (flag === 0) {
        flag += 1;
        SpecofferDictionaryService.getBenefits().then(function (res) {
          angular.extend(data, res);

          for (var i = 0; i < data.length; i++) {
            if (data[i].benefitTypeId === 3 || data[i].benefitTypeId === 5) {
              subjectObject.subjectsArray.push(data[i]);
            }
            else if (data[i].benefitTypeId === 6 || data[i].benefitTypeId === 7) {
              subjectObject.subjectsMainArray.push(data[i]);
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
