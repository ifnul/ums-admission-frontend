'use strict';

angular
  .module('admissionSystemApp')
  .factory('personDecodeSvc', function ($q, DictionariesSvc) {

    function decode (rawPersons) {
      var personTypeIdNames = [],
        genderTypeIdNames = [],
        marriedTypeIdNames = [],
        citizenCountryIdNames = [],
        residentNames = [undefined, 'інозем.', 'не інозем.'],
        isMilitaryNames = [undefined, 'ВЗ', 'не ВЗ'],
        isHostelNames = [undefined, 'потреб. гуртож.', ' не потреб. гуртож.'];

      function pushData (data, array) {
        angular.forEach(data, function (item) {
          array[item.id] = item.name;
        });
      }

      return $q.all([
          DictionariesSvc.getPersonsTypes(),
          DictionariesSvc.getGenderTypes(),
          DictionariesSvc.getMarriedTypes(),
          DictionariesSvc.getAdminUnits({
            adminUnitTypeId: 6
          })
        ])
        .then(function (res) {
          pushData(res[0], personTypeIdNames);
          pushData(res[1], genderTypeIdNames);
          pushData(res[2], marriedTypeIdNames);
          pushData(res[3], citizenCountryIdNames);

          angular.forEach(rawPersons, function (item) {
            item.personTypeId = personTypeIdNames[item.personTypeId];
            item.genderTypeId = genderTypeIdNames[item.genderTypeId];
            item.marriedTypeId = marriedTypeIdNames[item.marriedTypeId];
            item.citizenCountryId = citizenCountryIdNames[item.citizenCountryId];
            item.resident = residentNames[item.resident];
            item.isMilitary = isMilitaryNames[item.isMilitary];
            item.isHostel = isHostelNames[item.isHostel];
          });
          return rawPersons;
        });
    }

    return {
      personDecoded: function (rawData) {
        return decode(rawData);
      }
    };
  });

