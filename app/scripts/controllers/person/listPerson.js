'use strict';

angular.module('admissionSystemApp')
  .controller('ListPersonCtrl', ['$scope', 'personDecodeSvc', 'DictionariesSvc',
    'basePersonData', 'Person', '$state', 'getFiltredListSvc', 'toaster', '$location',
    function ($scope, personDecodeSvc, DictionariesSvc, basePersonData, Person, $state, getFiltredListSvc, toaster, $location) {

      $location.search({
        page: 1,
        count: 10
      });

      $scope.personDecoded = [];
      var page = ($location.search().page) ? $location.search().page : '1',
          itemsPerPage = ($location.search().count) ? $location.search().count : '10';

      $scope.getPersons = function (pageNumber, perPage, filters, sort) {
        getFiltredListSvc.getListPersons(pageNumber, perPage, filters, sort).then(function (res) {
          $scope.personDecoded = res.data;
          $scope.totalPersons = res.total;
        }, function (resp) {
          toaster.pop('error', resp.messageType, resp.message);
        });
      };
      $scope.getPersons(page, itemsPerPage);

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
        $state.go('root.person.edit.main', {
          id: id
        });
      };

      $scope.viewPerson = function (id) {
        $state.go('root.person.view.main', {
          id: id
        });
      };
    }]);
