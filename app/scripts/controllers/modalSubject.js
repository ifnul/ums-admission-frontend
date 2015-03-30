angular.module('admissionSystemApp')

  .controller('ModalSubjectCtrl', ['$scope', '$modal', function ($scope, $modal) {

    $scope.entireSpecoffer.subjects = [];

    $scope.open = function (size) {

      $modal.open({
        templateUrl: '../views/modal/modalSubject.html',
        controller: 'ModalInstanceSubjectCtrl',
        size: size,
        scope: $scope
      });

    };
  }])


  .controller('ModalInstanceSubjectCtrl', function ($scope, $modalInstance, Subjects) {
    Subjects.getChiefSubjects().then(function (data) {
      $scope.subjectName = data;
    });

    $scope.additionalSubjects=[];

    $scope.updateAdditionalSubjects = function (subject) {
      if (subject.hasChildren) {
        Subjects.getSubjectsForParent(subject.id).then(function (data) {
          $scope.additionalSubjects = data;
        });
      }
    };

    $scope.ok = function () {

      $scope.entireSpecoffer.subjects.push({
        enrolmentSubjectId: $scope.subject.id,
        subject: $scope.subject.name,
        addName: $scope.addName,
        mark: $scope.mark,
        isMajor: $scope.isMajor,
        alternative: $scope.alternative,
        note: '',
        weightSubject : 1
      });

      //console.log($scope.subject.id);

      $modalInstance.close();


    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
