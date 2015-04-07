'use strict';

angular.module('admissionSystemApp')

  .controller('TabSubjectCtrl', ['$scope', '$modal', 'Subjects', function ($scope, $modal, Subjects) {
    $scope.entireSpecoffer.subjects = [];
    $scope.viewSubjects = [];

    $scope.open = function (size) {

      $modal.open({
        templateUrl: '../views/modal/TabSubject.html',
        controller: 'ModalSubjectCtrl',
        size: size,
        scope: $scope.$new(true)
      }).result.then(function (item) {
          var arrayForId = [],
            i,
            SubjectId;

          if (item.allSubjects.addName) {
            arrayForId = [item.allSubjects.subject].concat(item.allSubjects.addName);
          }
          else {
            arrayForId = [item.allSubjects.subject];
          }

          for (i = 0; i < arrayForId.length; i++) {
            $scope.entireSpecoffer.subjects.push({
              enrolmentSubjectId: arrayForId[i].id,
              mark: item.mark,
              isMajor: item.isMajor || false,
              alternative: item.alternative || false,
              note: '',
              weightSubject: item.weightSubject
            });

            SubjectId = $scope.entireSpecoffer.subjects[$scope.entireSpecoffer.subjects.length - 1];


            showSubjectById(SubjectId.enrolmentSubjectId,
              SubjectId.mark,
              SubjectId.isMajor,
              SubjectId.alternative,
              SubjectId.weightSubject);
          }

        });

    };

    function showSubjectById(id, mark, isMajor, alternative, weight) {
      Subjects.getSubjectsById(id).then(function (result) {
        if (result.name) {
          $scope.viewSubjects.push({
            id:result.id,
            subject: result.name,
            addName: result.additionName,
            mark: mark,
            isMajor: isMajor,
            alternative: alternative,
            weightSubject: weight
          });
        }
      });
    }

    $scope.removeRow = function (idx) {
      $scope.entireSpecoffer.subjects.splice(idx, 1);
      $scope.viewSubjects.splice(idx, 1);

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
      $scope.$close($scope);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
