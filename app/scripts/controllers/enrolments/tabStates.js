'use strict';

angular
  .module('admissionSystemApp')
  .controller('TabStatesCtrl', ['$scope', '$stateParams', 'baseListData', 'decodeEnrolmentsSvc', 'enrolmentStates',
    function ($scope, $stateParams, baseListData, decodeEnrolmentsSvc, enrolmentStates) {

      $scope.entireEnrolment.statuses = [];

      $scope.localStatuses = [];
      $scope.headers = baseListData.stateHeaders;

      if ($stateParams.id) {
        _.merge($scope.localStatuses, $scope.entireEnrolment.statuses);
        $scope.enrolmentId = $stateParams.id;
        $scope.state = $scope.entireEnrolment.statuses[0];
        $scope.filteredStates = enrolmentStates.checkState($scope.state.enrolmentStatusTypeId);
        decodeEnrolmentsSvc.enrolmentsDecoded($scope.localStatuses).then(function (states) {
          $scope.states = states;
        }).then(function () {
          enrolmentStates.searchStates($scope.filteredStates).then(function (states) {
            $scope.resultStates = states;
          });
        });
      } else {
        $scope.viewState = {};
        $scope.newState = {
          isContract: $scope.entireEnrolment.enrolment.isContract,
          isState: $scope.entireEnrolment.enrolment.isState,
          specOfferWaveId: 2,
          enrolmentStatusTypeId: 1
        };
        $scope.entireEnrolment.statuses.push($scope.newState);
        _.merge($scope.viewState, $scope.newState);
        decodeEnrolmentsSvc.enrolmentsDecoded([$scope.viewState]).then(function (state) {
          $scope.states = state;
        });
      }

      $scope.addState = function () {
        $scope.viewState = {};
        $scope.newState = {
          isContract: $scope.newStatus.isContract,
          isState: $scope.newStatus.isState,
          specOfferWaveId: 2,
          enrolmentStatusTypeId: $scope.newStatus.enrolmentStatusTypeId
        };
        $scope.entireEnrolment.statuses.push($scope.newState);
        _.merge($scope.viewState, $scope.newState);
        decodeEnrolmentsSvc.enrolmentsDecoded([$scope.viewState]).then(function (state) {
          $scope.localStatuses.push(state[0]);
        });
      };
    }]);
