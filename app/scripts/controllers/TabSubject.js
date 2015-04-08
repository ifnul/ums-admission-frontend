'use strict';

angular.module('admissionSystemApp')

  .controller('TabSubjectCtrl', ['$scope', '$modal', 'Subjects', function ($scope, $modal, Subjects) {
    $scope.entireSpecoffer.subjects = [];
    $scope.viewSubjects = [];

    $scope.open = function (size, subj, idx) {


      $modal.open({
        templateUrl: '../views/modal/TabSubject.html',
        controller: 'ModalSubjectCtrl',
        size: size,
        resolve: {
          subj: function () {
            return subj;
          },
          idx: function () {
            return idx;
          }
        },
        scope: $scope.$new(true)
      }).result.then(function (item) {
          var arrayForId = [],
            i,
            SubjectId;

          function showSubjectById(id, mark, isMajor, alternative, weight) {


            if (idx !== undefined) {

              Subjects.getSubjectsById(id).then(function (result) {
                if (result.name) {
                  $scope.viewSubjects[idx] = {
                    id: subj.id,
                    subject: subj.subject,
                    addName: subj.addName,
                    mark: mark,
                    isMajor: isMajor,
                    alternative: alternative,
                    weightSubject: weight
                  };
                }
              });
            }
            else {

              Subjects.getSubjectsById(id).then(function (result) {
                if (result.name) {
                  $scope.viewSubjects.push({
                    id: result.id,
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
          }

          if (!_.isEmpty(item.allSubjects.addName)) {
            arrayForId = item.allSubjects.addName;
          }
          else {
            arrayForId = [item.allSubjects.subject];
          }


          if (idx !== undefined) {
            $scope.entireSpecoffer.subjects[idx] = {
              enrolmentSubjectId: subj.id,
              mark: item.mark,
              isMajor: item.isMajor || false,
              alternative: item.alternative || false,
              note: '',
              weightSubject: item.weightSubject
            };

            SubjectId = $scope.entireSpecoffer.subjects[idx];

            showSubjectById(SubjectId.enrolmentSubjectId,
              SubjectId.mark,
              SubjectId.isMajor,
              SubjectId.alternative,
              SubjectId.weightSubject);

          }
          else {

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
          } //end for

        }); //end new scope
    };


    $scope.removeRow = function (idx) {
      $scope.entireSpecoffer.subjects.splice(idx, 1);
      $scope.viewSubjects.splice(idx, 1);

    };

  }])


  .controller('ModalSubjectCtrl', function ($scope, $modalInstance, Subjects, subj, idx) {
    $scope.additionalSubjects = [];
    $scope.allSubjects = [];
    $scope.allSubjects.subject = {};
    $scope.allSubjects.addName = {};
    $scope.idx = idx;

    $scope.$watch('allSubjects.subject', function (subject) {

      if (subject && subject.hasChildren) {
        Subjects.getSubjectsForParent(subject.id).then(function (data) {
          $scope.additionalSubjects = data;
        });
      }
    });

    Subjects.getChiefSubjects().then(function (data) {
      $scope.subjectName = data;
      if (idx !== undefined) {
        $scope.allSubjects.subject.name = subj.subject;
        $scope.allSubjects.addName.name = subj.addName;
        $scope.mark = subj.mark;
        $scope.weightSubject = subj.weightSubject;
        $scope.isMajor = subj.isMajor;
        $scope.alternative = subj.alternative;
      }
    });


    $scope.ok = function () {
      $scope.$close($scope);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
