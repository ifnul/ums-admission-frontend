'use strict';

angular.module('admissionSystemApp')
  .controller('ProgressBarCtrl', ['$scope', 'progressBarService', '$state',
    function ($scope, progressBarService, $state) {

      $scope.$watch(progressBarService.getValidPercentage, function (value) {
        console.log('value', value);
        $scope.progressBarPercent = value;
        var type;

        if ($scope.progressBarPercent < 25) {
            type = 'danger';
          } else if ($scope.progressBarPercent < 50) {
            type = 'warning';
          } else if ($scope.progressBarPercent < 99) {
            type = 'info';
          } else {
            type = 'success';
          }
          $scope.type = type;
        });

    }]);

