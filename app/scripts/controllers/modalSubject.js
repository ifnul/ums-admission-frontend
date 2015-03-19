angular.module('admissionSystemApp')

  .controller('ModalSubjectCtrl', function ($scope, $modal, $log) {
    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: '../views/modal/modalSubject.html',
        controller: 'ModalInstanceSubjectCtrl',
        size: size
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });


    };
  })

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

  .controller('ModalInstanceSubjectCtrl', function ($scope, $modalInstance) {

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  });
