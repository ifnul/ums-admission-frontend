'use strict';

angular.module('admissionSystemApp')
  .controller('TabPersonEnrolmentsCtrl', ['$scope', 'DictionariesSvc', '$stateParams', '$state', 'baseListData',
    'decodeEnrolmentsSvc',
    function ($scope, DictionariesSvc, $stateParams, $state, baseListData, decodeEnrolmentsSvc) {

      if ($stateParams.id) {
        $scope.personId = $stateParams.id;
        DictionariesSvc.getEnrolments({
          personId: $stateParams.id
        }).then(function (rawEnrolments) {
          decodeEnrolmentsSvc.enrolmentsDecoded(rawEnrolments).then(function (enrolments) {
            $scope.enrolments = enrolments;
          });
        });
        $scope.headers = _.clone(baseListData.headers);
        $scope.headers[1].visible = false;
      }

      $scope.newEnrolment = function () {
        $state.go('enrolment.new.main', {
          personId: $stateParams.id
        });
      };

      $scope.editEnrolment = function (id) {
        $state.go('enrolment.edit.main', {
          id: id
        });
      };
    }]);
