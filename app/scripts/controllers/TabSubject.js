angular.module('admissionSystemApp')

  .controller('TabSubjectCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope.entireSpecoffer.subjects = [];
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

    //$scope.editingData = [];
    //
    //for (var i = 0, length = $scope.tabelsData.length; i < length; i++) {
    //  $scope.editingData[$scope.tabelsData[i].id] = false;
    //}
    //
    //
    //$scope.modify = function(tableData){
    //  $scope.editingData[tableData.id] = true;
    //};
    //
    //
    //$scope.update = function(tableData){
    //  $scope.editingData[tableData.id] = false;
    //};

  }])


  .controller('ModalSubjectCtrl', function ($scope, $modalInstance, Subjects) {
    Subjects.getChiefSubjects().then(function (data) {
      $scope.subjectName = data;
    });

    $scope.additionalSubjects = [];
    $scope.allSubjects = [];

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
        subject: $scope.allSubjects.subject,
        addName: $scope.allSubjects.addName,
        mark: $scope.mark,
        isMajor: $scope.isMajor,
        alternative: $scope.alternative,
        note: '',
        weightSubject: $scope.weightSubject
      });

      $modalInstance.close();

    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
