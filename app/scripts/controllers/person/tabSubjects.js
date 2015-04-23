'use strict';

angular.module('admissionSystemApp')
  .controller('tabSubjects', ['$scope', '$modal', '$rootScope', 'DictionariesSvc', function ($scope, $modal, $rootScope, DictionariesSvc) {


    // temp data --------begin---------
    $scope.entirePerson.enrolmentsubjects = [
      {
        "id": 1,
        "personId": 11,
        "personPaperId": 3,
        "enrolmentSubjectId": 3,
        "mark": 3
      },
      {
        "id": 2,
        "personId": 11,
        "personPaperId": 2,
        "enrolmentSubjectId": 2,
        "mark": 5
      }
    ];
    // temp data --------end---------

    $scope.getSubjectTitleById = function (id) {
      var subjectTitle = '';
      angular.forEach($scope.subjects, function (subject) {
        if (subject.id === id) {
          subjectTitle = subject.name;
        }
      });
      return subjectTitle
    };

    $scope.filterExistsSubjects = function (subject) {
      return !_.find($scope.entirePerson.enrolmentsubjects, function (item) {
        return item.enrolmentSubjectId == subject.id
      });
    };

    $scope.enrolSubjIds = DictionariesSvc.getEnrolmentsSubjects().then(function (subjs) {
      $scope.subjects = subjs;
    });

    $scope.addPersonSubject = function () {
      var newSubj = {};
      newSubj.enrolmentSubjectId = $scope.enrolmentsubject.id;
      newSubj.mark = $scope.subjectMark;
      $scope.entirePerson.enrolmentsubjects.push(newSubj);
    };

    $scope.deleteSubject = function (subject) {
      var index = $scope.entirePerson.enrolmentsubjects.indexOf(subject);
      $scope.entirePerson.enrolmentsubjects.splice(index, 1);
    };

    $scope.editSubject = function (subject) {

      $modal.open({
        templateUrl: '../views/modal/modalEditPersonSubject.html',
        size: 'lg',
        resolve: {
          subjects: function () {
            return $scope.subjects
          },
          subject: function () {
            return subject;
          }
        },
        controller: function ($rootScope, $scope, $modalInstance, subjects, subject) {
          $scope.subjects = subjects;
          $scope.modalMark = subject.mark;
          $scope.modalEnrolmentSubject = _.find($scope.subjects, function (item) {
            return item.id === subject.enrolmentSubjectId;
          });

          $scope.ok = function () {
            $modalInstance.close({
              subjectId: $scope.modalEnrolmentSubject.id,
              mark: $scope.modalMark
            });
          };
        }
      }).result.then(function (result) {
        subject.enrolmentSubjectId = result.subjectId;
        subject.mark = result.mark;
      });
    };
  }]);
