'use strict';

angular.module('admissionSystemApp')
  .service('ListProposalGettingService', ['$http', '$q', 'SpecofferDictionaryService', function ($http, $q, SpecofferDictionaryService) {

    this.allProposalsDecoded = function (params) {
      var specialtyNames = [],
        departmentNames = [],
        timePeriodCourseNames = [],
        specofferTypeNames = [],
        eduFormTypeNames = [];
        
      function pushData (data, array) {
        angular.forEach(data, function (item) {
          array[item.id] = item.name;
        });
      }
      return  SpecofferDictionaryService.getAllSpecoffers(params).then(function (proposals) {
        var rawProposals = angular.copy(proposals);

        return $q.all([
          SpecofferDictionaryService.getAllSpecialties(),
          SpecofferDictionaryService.getAllDepartments(),
          SpecofferDictionaryService.getTimePeriodCourseIds(),
          SpecofferDictionaryService.getSpecoffersTypes(),
          SpecofferDictionaryService.getEduformTypes()
        ])
        .then(function(res) {
            pushData(res[0], specialtyNames);
            pushData(res[1], departmentNames);
            pushData(res[2], timePeriodCourseNames);
            pushData(res[3], specofferTypeNames);
            pushData(res[4], eduFormTypeNames);

          angular.forEach(rawProposals, function (item) {
            item.specialtyId = specialtyNames[item.specialtyId];
            item.departmentId = departmentNames[item.departmentId];
            item.timePeriodCourseId = timePeriodCourseNames[item.timePeriodCourseId];
            item.specofferTypeId = specofferTypeNames[item.specofferTypeId];
            item.educationFormTypeId = eduFormTypeNames[item.educationFormTypeId];
          });
         return rawProposals;
        });
      });
    };

  }]);
