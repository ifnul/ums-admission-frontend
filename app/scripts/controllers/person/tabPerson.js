'use strict';

angular
  .module('admissionSystemApp')
  .controller('TabPersonCtrl', ['$scope', 'DictionariesSvc', '$q', function ($scope, DictionariesSvc, $q) {

    $q.all([
      DictionariesSvc.getPersonsTypes(),
      DictionariesSvc.getGenderTypes(),
      DictionariesSvc.getMarriedTypes(),
      DictionariesSvc.getAdminUnitsTypes(),
      DictionariesSvc.getAdminUnits({
        adminUnitTypeId: 6
      })
    ])
      .then(function (promisesResult) {
        $scope.personsTypes = promisesResult[0];
        $scope.genderTypes = promisesResult[1];
        $scope.marriedTypes = promisesResult[2];
        $scope.adminUnitsTypes = promisesResult[3];
        $scope.adminUnits = promisesResult[4];
      });


  }]);
