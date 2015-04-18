'use strict';

angular.module('admissionSystemApp')
  .controller('TabPersonCtrl', ['$scope', 'SpecofferDictionaryService', '$q', function ($scope, SpecofferDictionaryService, $q) {

    $q.all([
      SpecofferDictionaryService.getPersonsTypes(),
      SpecofferDictionaryService.getGenderTypes(),
      SpecofferDictionaryService.getMarriedTypes(),
      SpecofferDictionaryService.getAdminUnitsTypes()
    ])
      .then(function (promisesResult) {
        $scope.personsTypes = promisesResult[0];
        $scope.genderTypes = promisesResult[1];
        $scope.marriedTypes = promisesResult[2];
        $scope.adminUnitsTypes = promisesResult[3];
      });


  }]);
