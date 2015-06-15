'use strict';

angular.module('admissionSystemApp')
  .controller('ProgressBarCtrl', ['$scope', 'progressBarService', '$state',
    function ($scope, progressBarService, $state) {
      $scope.$watch(progressBarService.getValidPercentage, function (value) {

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

          if ($scope.progressBarPercent === 100 && ($state.is('root.specoffer.new.main') ||
            $state.is('root.specoffer.edit.main'))) {
            $scope.propositionMessage = 'Будь ласка, додайте предмети та пiльги!';
          } else {
            $scope.propositionMessage = ' ';
          }

          if ($scope.progressBarPercent === 100 && ($state.is('root.person.new.main') ||
            $state.is('root.person.edit.main'))) {
            $scope.propositionMessage = 'Будь ласка, додайте адресу!';
          }
          else {
            $scope.propositionMessage = ' ';
          }

        });

    }]);

