'use strict';

angular.module('admissionSystemApp')
  .factory('decodeSpecofferSvc', ['$q', 'DictionariesSvc', function ($q, DictionariesSvc) {

    function allSpecofferDecoded (rawSpecoffers) {
      var specialtyNames = [],
        departmentNames = [],
        timePeriodCourseNames = [],
        specofferTypeNames = [],
        eduFormTypeNames = [],
        ciphers = [];

      function pushData (data, array) {
        angular.forEach(data, function (item) {
          array[item.id] = item.name;
        });
      }

      function pushChiphers (data) {
        angular.forEach(data, function (item) {
          ciphers[item.id] = item.cipher;
        });
      }

      return $q.all([
          DictionariesSvc.getAllSpecialties(),
          DictionariesSvc.getAllDepartments({
            departmentTypeId: 1
          }),
          DictionariesSvc.getTimePeriodCourseIds(),
          DictionariesSvc.getSpecoffersTypes(),
          DictionariesSvc.getEduformTypes()
        ])
        .then(function (res) {
          pushData(res[0], specialtyNames);
          pushData(res[1], departmentNames);
          pushData(res[2], timePeriodCourseNames);
          pushData(res[3], specofferTypeNames);
          pushData(res[4], eduFormTypeNames);
          pushChiphers(res[0]);

          angular.forEach(rawSpecoffers, function (item) {
            item.cipher = ciphers[item.specialtyId];
            item.specialtyId = specialtyNames[item.specialtyId];
            item.departmentId = departmentNames[item.departmentId];
            item.timePeriodCourseId = timePeriodCourseNames[item.timePeriodCourseId];
            item.specofferTypeId = specofferTypeNames[item.specofferTypeId];
            item.educationFormTypeId = eduFormTypeNames[item.educationFormTypeId];
          });
        return rawSpecoffers;
        });
    }

    return {
      specofferDecoded: function (rawData) {
        return allSpecofferDecoded(rawData);
      }
    };
  }]);
