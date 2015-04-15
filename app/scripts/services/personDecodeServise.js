'use strict';


angular.module('admissionSystemApp')
  .factory('personDecodeServise', function ($q, SpecofferDictionaryService) {
    
    function decode (rawPersons) {
      var personTypeIdNames = [];
      var genderTypeIdNames = [];
      var marriedTypeIdNames = [];
      var citizenCountryIdNames = [];
      var residentNames = [undefined, 'інозем.', 'не інозем.'];
      var isMilitaryNames = [undefined, 'ВЗ', 'не ВЗ'];
      var isHostelNames = [undefined, 'потреб. гуртож.', ' не потреб. гуртож.'];
      
      function pushData (data, array) {
        angular.forEach(data, function (item) {
          array[item.id] = item.name;
        });
      }
        return $q.all([
          SpecofferDictionaryService.getPersonsTypes(),
          SpecofferDictionaryService.getGenderTypes(),
          SpecofferDictionaryService.getMarriedTypes(),
          SpecofferDictionaryService.getAdminUnits( { adminUnitTypeId: 6 } )
        ])
        .then(function(res) {
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
