'use strict';

angular
  .module('admissionSystemApp')
  .controller('NewEnrolmentCtrl', ['$scope', '$stateParams', 'baseFormData', '$state',
    function ($scope, $stateParams, baseFormData, $state) {
      $scope.enrolmentId = $stateParams.id;
      console.log('$scope.enrolmentId', $scope.enrolmentId);
      $scope.entireEnrolment = {};

      $scope.enrolTabs = baseFormData.tabs;

      $scope.go = function (route) {
        if ($scope.enrolmentId) {
          $state.go(route.edit, {
            id: $scope.enrolmentId
          });
        } else {
          $state.go(route.new);
        }
      };
    }]);
