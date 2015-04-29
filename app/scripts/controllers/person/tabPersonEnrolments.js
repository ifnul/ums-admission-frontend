'use strict';

angular.module('admissionSystemApp')
  .controller('TabPersonEnrolmentsCtrl', ['$scope', 'DictionariesSvc', '$stateParams', '$state', 'baseListData',
    'decodeEnrolmentsSvc',
    function ($scope, DictionariesSvc, $stateParams, $state, baseListData, decodeEnrolmentsSvc) {

      if ($stateParams.id) {
        DictionariesSvc.getEnrolments({
          personId: $stateParams.id
        }).then(function (rawEnrolments) {
          decodeEnrolmentsSvc.enrolmentsDecoded(rawEnrolments).then(function (enrolments) {
            $scope.enrolments = enrolments;
          });
        });
        $scope.headers = baseListData.cutHeaders;
      }

      $scope.newEnrolment = function () {
        $state.go('new-enrolment.tab-enrolment', {
          personId: $stateParams.id
        });
      };

      $scope.editEnrolment = function (id) {
        $state.go('edit-enrolment.tab-enrolment', {
          id: id
        });
      };
    }]);
