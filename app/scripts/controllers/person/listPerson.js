'use strict';


angular.module('admissionSystemApp')
  .controller('ListPersonCtrl', ['$scope', 'personDecodeSvc', 'DictionariesSvc', 'basePersonData', 'Person', '$state',
    function ($scope, personDecodeSvc, DictionariesSvc, basePersonData, Person, $state) {

      $scope.personDecoded = [];

      DictionariesSvc.getPersons().then(function (rawPersons) {
        personDecodeSvc.personDecoded(rawPersons).then(function (decodedPersons) {
          $scope.personDecoded = decodedPersons;
        });
      });

      $scope.personFilters = basePersonData.filters;
      $scope.personSearch = basePersonData.search;
      $scope.headers = basePersonData.headers;

      $scope.deletePerson = function (id) {
        Person.deleteEntirePerson(id).then(function () {
          DictionariesSvc.clearStorageByRoute('persons');
          DictionariesSvc.getPersons().then(function (rawPersons) {
            personDecodeSvc.personDecoded(rawPersons).then(function (decodedPersons) {
              $scope.personDecoded = decodedPersons;
            });
          });
        });
      };

      $scope.changePerson = function (id) {
        $state.go('edit-person', {id: id});
      };

    }]);
