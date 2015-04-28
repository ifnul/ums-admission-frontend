'use strict';

angular
  .module('admissionSystemApp')
  .controller('NewEnrolmentCtrl', ['$scope', '$stateParams', 'baseFormData',
    function ($scope, $stateParams, baseFormData) {
      $scope.entolmentId = $stateParams.id;
      $scope.entireEnrolment = {};

      $scope.enrolTabs = baseFormData.tabs;
    }]);
