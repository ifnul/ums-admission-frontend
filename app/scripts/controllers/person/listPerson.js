'use strict';


angular.module('admissionSystemApp')
  .controller('ListPersonCtrl', ['$scope', 'personDecodeSvc', 'DictionariesSvc', 'basePersonData',
    function ($scope, personDecodeSvc, DictionariesSvc, basePersonData) {

      $scope.personDecoded = [];

      DictionariesSvc.getPersons().then(function (rawPersons) {
        personDecodeSvc.personDecoded(rawPersons).then(function (decodedPersons) {
          $scope.personDecoded = decodedPersons;
        });
      });

      $scope.personFilters = basePersonData.filters;
      $scope.personSearch = basePersonData.search;
      $scope.headers = basePersonData.headers;


    }]);
