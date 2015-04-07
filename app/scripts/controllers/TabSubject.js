'use strict';

angular.module('admissionSystemApp')

  .controller('TabSubjectCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope.entireSpecoffer.subjects = [];
    $scope.viewSubjects = [];
    $scope.allSubjects = [];

    $scope.open = function (size) {

      $modal.open({
        templateUrl: '../views/modal/TabSubject.html',
        controller: 'ModalSubjectCtrl',
        size: size,
        scope: $scope
      });

    };

    $scope.removeRow = function (idx) {
      $scope.entireSpecoffer.subjects.splice(idx, 1);
    };

  }])


  .controller('ModalSubjectCtrl', function ($scope, $modalInstance, Subjects) {
    Subjects.getChiefSubjects().then(function (data) {
      $scope.subjectName = data;
    });

    $scope.additionalSubjects = [];
    $scope.allSubjects = [];
    $scope.subject = '';
    $scope.$watch('allSubjects.subject', function (subject) {

      if (subject && subject.hasChildren) {
        Subjects.getSubjectsForParent(subject.id).then(function (data) {
          $scope.additionalSubjects = data;
        });
      }
    });

    $scope.ok = function () {

      $scope.entireSpecoffer.subjects.push({
        enrolmentSubjectId: $scope.allSubjects.subject.id,
        //addName: $scope.allSubjects.addName,
        mark: $scope.mark,
        isMajor: $scope.isMajor,
        alternative: $scope.alternative,
        note: '',
        weightSubject: $scope.weightSubject
      });


      Subjects.getSubjectsById($scope.entireSpecoffer.subjects[$scope.entireSpecoffer.subjects.length - 1].enrolmentSubjectId).then(function (data) {

        $scope.viewSubjects.push({
          subject: data,
          addName: $scope.allSubjects.addName,
          mark: $scope.mark,
          isMajor: $scope.isMajor,
          alternative: $scope.alternative,
          note: '',
          weightSubject: $scope.weightSubject
        });
      });


      $modalInstance.close();

    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
