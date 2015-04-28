'use strict';

angular.module('admissionSystemApp')
  .controller('NewPersonCtrl', ['$scope', '$stateParams', 'Person', '$location', 'DictionariesSvc',
    function ($scope, $stateParams, Person, $location, DictionariesSvc) {

      $scope.entirePerson = {};
      $scope.entirePerson.person = {};
      $scope.entirePerson.names = [];
      $scope.entirePerson.contacts = [];
      $scope.entirePerson.papers = [];
      $scope.entirePerson.names[0] = {
        languageId: 2,
        fatherName: ''
      };

      $scope.brosweOrEditPerson = function (personId) {
        Person.getEntirePerson(personId).then(function (res) {
          _.merge($scope.entirePerson, res);
        });
      };

      if ($stateParams.id) {
        $scope.brosweOrEditPerson($stateParams.id);
      } else {
        Person.clearCopy();
      }

      $scope.deletePerson = function () {
        Person.deleteEntirePerson().then(function () {
          DictionariesSvc.clearStorageByRoute('persons');
          $location.path('/list-person');
        });
      };

      $scope.sendToServerPerson = function (entirePerson) {
        $scope.entirePerson.names[0].name = $scope.entirePerson.names[0].firstName +
        ' ' + $scope.entirePerson.names[0].surname +
        ' ' + $scope.entirePerson.names[0].fatherName;
        $scope.entirePerson.person.name = $scope.entirePerson.person.firstName +
        ' ' + $scope.entirePerson.person.surname +
        ' ' + $scope.entirePerson.person.fatherName;

        if (!$scope.entirePerson.person.photo) {
          $scope.entirePerson.person.photo = '/';
        }
        $scope.entirePerson.person.isMilitary = ($scope.entirePerson.person.isMilitary) ? 1 : 0;
        $scope.entirePerson.person.isHostel = ($scope.entirePerson.person.isHostel) ? 1 : 0;
        $scope.entirePerson.person.resident = ($scope.entirePerson.person.resident) ? 1 : 0;
        Person.addOrEditPerson(entirePerson).then(function () {
          DictionariesSvc.clearStorageByRoute('persons');
          $location.path('/list-person');
        });
      };

    }]);
