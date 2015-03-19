angular.module('admissionSystemApp')


  .controller('ModalBenefitCtrl', function ($scope, $modal) {
    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: '../views/modal/modalBenefit.html',
        controller: 'ModalInstanceBenefitCtrl',
        size: size
      });
    };
  })

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

  .controller('ModalInstanceBenefitCtrl', function ($scope, $modalInstance) {

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  });
