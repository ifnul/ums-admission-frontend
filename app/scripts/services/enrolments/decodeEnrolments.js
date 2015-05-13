'use strict';

angular.module('admissionSystemApp')
  .factory('decodeEnrolmentsSvc', ['DictionariesSvc', '$q',
    function (DictionariesSvc, $q) {

      function decode(rawEnrolments) {
        var departmentsNames = [],
          enrolmentsTypesNames = [],
          enrolmentsStatusTypes = [],
          isStateNames = ['\u2718', '\u2713'],
          isContractNames = ['\u2718', '\u2713'],
          isPrivilegeNames = ['пільги відсутні', 'є пільги'],
          isHostelNames = ['не потреб. гуртож.', 'потреб. гуртож.'];

        function pushData(data, array) {
          angular.forEach(data, function (item) {
            array[item.id] = item.name;
          });
        }

        return $q.all([
          DictionariesSvc.getAllDepartments({
            departmentTypeId: 1
          }),
          DictionariesSvc.getEnrolmentsTypes(),
          DictionariesSvc.getEnrolmentsStatusTypes()
        ])
          .then(function (res) {
            pushData(res[0], departmentsNames);
            pushData(res[1], enrolmentsTypesNames);
            pushData(res[2], enrolmentsStatusTypes);

            angular.forEach(rawEnrolments, function (item) {
              item.departmentId = departmentsNames[item.departmentId];
              item.enrolmentTypeId = enrolmentsTypesNames[item.enrolmentTypeId];
              item.isState = isStateNames[item.isState];
              item.isContract = isContractNames[item.isContract];
              item.isPrivilege = isPrivilegeNames[item.isPrivilege];
              item.isHostel = isHostelNames[item.isHostel];
              item.enrolmentStatusTypeId = enrolmentsStatusTypes[item.enrolmentStatusTypeId];
            });
            return rawEnrolments;
          });
      }

      return {
        enrolmentsDecoded: function (rawData) {
          return decode(rawData);
        }
      };
    }]);
