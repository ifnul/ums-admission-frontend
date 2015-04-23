'use strict';

angular.module('admissionSystemApp')

  .controller('TabSubjectCtrl', ['$scope', '$modal', '$q', 'SubjectsSvc', function ($scope, $modal, $q, SubjectsSvc) {

    $scope.viewSubjects = [];
    var i;

  $scope.$watch(
    function () {
      return $scope.entireSpecoffer.subjects;
    },
    function (res) {
        for (i = 0; i < res.length; i++) {
          $scope.viewSubjects = [];
          (function(i) {
              SubjectsSvc.getSubjectsById(res[i].enrolmentSubjectId).then(function (result) {
                if (result.name) {
                  $scope.viewSubjects.push({    // push data into table
                    id: result.id,
                    subject: result.name,
                    addName: result.additionName,
                    mark: res[i].mark,
                    isMajor: res[i].isMajor,
                    alternative: res[i].alternative,
                    weightSubject: res[i].weightSubject
                  });
                }
              });
          })(i);
        }
    }, true);


    $scope.open = function (size, subj, idx) {

      $modal.open({
        templateUrl: '../views/modal/modalSubject.html',
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
            i;


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

            }
          } //end for

        }); //end new scope
    };


    $scope.removeRow = function (idx) {
      $scope.entireSpecoffer.subjects.splice(idx, 1);
      $scope.viewSubjects.splice(idx, 1);

    };

  }])


  .controller('ModalSubjectCtrl', function ($scope, $modalInstance, SubjectsSvc, subj, idx) {
    $scope.additionalSubjects = [];
    $scope.allSubjects = [];
    $scope.allSubjects.subject = {};
    $scope.allSubjects.addName = {};
    $scope.idx = idx;

    $scope.$watch('allSubjects.subject', function (subject) {

      if (subject && subject.hasChildren) {
        SubjectsSvc.getSubjectsForParent(subject.id).then(function (data) {
          $scope.additionalSubjects = data;
        });
      }
    });

    SubjectsSvc.getChiefSubjects().then(function (data) {
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
