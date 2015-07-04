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

      /**
       * "Новая заява" button handler
       * redirect to new enrolment view and pass info: person id and this state (for returning back after adding new enrolment)
       */
      $scope.newEnrolment = function () {
        $state.go('root.enrolment.new.main', {
          personId: $stateParams.id,
          previousState: $state.current.name
        });
      };

      $scope.editEnrolment = function (id) {
        $state.go('root.enrolment.edit.main', {
          id: id,
          previousState: $state.current.name
        });
      };
    }]);
