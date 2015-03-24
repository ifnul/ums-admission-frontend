angular.module('admissionSystemApp')
  .controller('ProgressBarCtrl', ['$scope', 'progressBarService', function ($scope, progressBarService) {


    $scope.status = "Заповнено на: ";
    $scope.value = progressBarService;

    $scope.$watch('value.value', function (value) {
      console.log("Value: " + value);

      console.log("Number pro: " + progressBarService.number);

      $scope.dynamic = Math.round((value * 100) / progressBarService.number);

      var type;
      if ($scope.dynamic < 25) {
        type = 'danger';
      } else if ($scope.dynamic < 50) {
        type = 'warning';
      } else if ($scope.dynamic < 99) {
        type = 'info';
      } else {
        type = 'success';
      }
      $scope.type = type;

      if ($scope.dynamic === 100) {
        $scope.propositionAll = "Будь ласка, додайте предмети та пiльги!";
      } else {
        $scope.propositionAll = " ";

      }


    });

  }]);

