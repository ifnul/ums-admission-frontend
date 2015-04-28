'use strict';

angular
  .module('admissionSystemApp')
  .controller('ListPersonCtrl', ['$scope', 'personDecodeSvc', 'DictionariesSvc', 'basePersonData', 'Person', '$state', 'getFiltredListSvc',
    function ($scope, personDecodeSvc, DictionariesSvc, basePersonData, Person, $state, getFiltredListSvc) {

      $scope.personDecoded = [];

      $scope.getPersons = function (pageNumber, perPage, filters, sort) {
        getFiltredListSvc.getListPersons(pageNumber, perPage, filters, sort).then(function (res) {
          $scope.personDecoded = res.data;
          $scope.totalPersons = res.total;
        });
      };

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
        $state.go('edit-person', {
          id: id
        });
      };

    }]);
