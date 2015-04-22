'use strict';


angular.module('admissionSystemApp')
  .controller('NewEnrolmentCtrl', [ '$scope', '$stateParams', 'DictionariesSvc', function ($scope, $stateParams, DictionariesSvc) {
    $scope.entolmentId = $stateParams.id;

    $scope.entireEnrolment = {};
    

  }]);
