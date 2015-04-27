'use strict';


angular.module('admissionSystemApp')
  .controller('NewPersonCtrl', function ($scope) {

    $scope.entirePerson = {};
    $scope.entirePerson.persons = {};
    $scope.entirePerson.names = [];
    $scope.entirePerson.names[0] = {
      languageId: 2,
      fatherName: ""
    };

    $scope.sendToServerPerson = function () {
      $scope.entirePerson.names[0].name = $scope.entirePerson.names[0].firstName +
      " " + $scope.entirePerson.names[0].surname +
      " " + $scope.entirePerson.names[0].fatherName;
      $scope.entirePerson.persons.name = $scope.entirePerson.persons.firstName +
      " " + $scope.entirePerson.persons.surname +
      " " + $scope.entirePerson.persons.fatherName;

      if (!$scope.entirePerson.persons.photo) {
        $scope.entirePerson.persons.photo = "/"
      }
      $scope.entirePerson.persons.isMilitary = ($scope.entirePerson.persons.isMilitary) ? 1 : 0;
      $scope.entirePerson.persons.isHostel = ($scope.entirePerson.persons.isHostel) ? 1 : 0;
      $scope.entirePerson.persons.resident = ($scope.entirePerson.persons.resident) ? 1 : 0;
    };

  });
