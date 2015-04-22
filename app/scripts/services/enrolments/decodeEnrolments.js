'use strict';

angular.module('admissionSystemApp')
  .factory('decodeEnrolmentsSvc', ['DictionariesSvc', '$q',
    function(DictionariesSvc, $q) {

      function decode(rawEnrolments) {
        var departmentsNames = [];
        var enrolmentsTypesNames = [];
        var isStateNames = [undefined, 'бюджет', 'не бюджет'];
        var isContractNames = [undefined, 'контракт', 'не контракт'];
        var isPrivilegeNames = [undefined, 'є пільги', 'пільги відсутні'];
        var isHostelNames = [undefined, 'потреб. гуртож.', ' не потреб. гуртож.'];

        function pushData(data, array) {
          angular.forEach(data, function(item) {
            array[item.id] = item.name;
          });
        }
        return $q.all([
            DictionariesSvc.getAllDepartments({departmentTypeId: 1}),
            DictionariesSvc.getEnrolmentsTypes()
          ])
          .then(function(res) {
            pushData(res[0], departmentsNames);
            pushData(res[1], enrolmentsTypesNames);

            angular.forEach(rawEnrolments, function(item) {
              item.departmentId = departmentsNames[item.departmentId];
              item.enrolmentTypeId = enrolmentsTypesNames[item.enrolmentTypeId];
              item.isState = isStateNames[item.isState];
              item.isContract = isContractNames[item.isContract];
              item.isPrivilege = isPrivilegeNames[item.isPrivilege];
              item.isHostel = isHostelNames[item.isHostel];
            });
            return rawEnrolments;
          });
      }

      return {
        enrolmentsDecoded: function(rawData) {
          return decode(rawData);
        }
      };
    }]);
