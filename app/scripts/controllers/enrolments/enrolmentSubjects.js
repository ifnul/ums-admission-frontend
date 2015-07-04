'use strict';

angular
  .module('admissionSystemApp')
  .controller('enrolmentSubjects',
  ['$scope', 'Restangular', 'DictionariesSvc', 'EnrolmentModel', function ($scope, Restangular, DictionariesSvc, EnrolmentModel) {

    $scope.enrolmentsubjects = EnrolmentModel.enrolmentSubjectsArr();
    $scope.enrolment = EnrolmentModel.enrolmentObj();

    $scope.enrolSubjIds = DictionariesSvc.getEnrolmentsSubjects().then(function (subjs) {
      $scope.subjectNames = [];
      angular.forEach(subjs, function (subjs) {
        $scope.subjectNames[subjs.id] = subjs.name;
      });
    });

    Restangular.one('persons', $scope.enrolment.personId).one('enrolmentsubjects').get()
      .then(function (personEnrolmentSubjects) {
      $scope.personIdSubjects = personEnrolmentSubjects.resources;
    });

    Restangular.one('specoffers', $scope.enrolment.specOfferId).one('subjects').get()
      .then(function (specofferIdSubjects) {
      $scope.specofferIdSubjects = specofferIdSubjects.resources;
    });

    $scope.getSubjectTitleById = function (id) {
      var subjectTitle = '';

      subjectTitle = $scope.subjectNames[id];
      return subjectTitle;
    };

    $scope.getPersonSubjectMark = function (id) {
      var PersonSubjectMark = '';

      angular.forEach($scope.personIdSubjects, function (subject) {
        if (subject.enrolmentSubjectId == id) {
          PersonSubjectMark = subject.mark;
        }
      });
      return PersonSubjectMark;
    };
  }
  ]);
