'use strict';

angular
  .module('admissionSystemApp')
  .controller('TabStatesCtrl', ['$scope', '$stateParams', 'baseListData', 'decodeEnrolmentsSvc', 'enrolmentStates',
    'Restangular', 'EnrolmentModel',
    function ($scope, $stateParams, baseListData, decodeEnrolmentsSvc, enrolmentStates, Restangular, EnrolmentModel) {

      $scope.statuses = EnrolmentModel.statusesArr();
      $scope.enrolment = EnrolmentModel.enrolmentObj();

      $scope.localStatuses = [];
      $scope.headers = baseListData.stateHeaders;

      $scope.enrolmentId = $stateParams.id;

      if ($scope.enrolmentId) {
        Restangular.one('specoffers', $scope.enrolment.specOfferId).getList('waves')
          .then(function (waves) {
          $scope.wave = waves[waves.length - 1];
        });

        _.merge($scope.localStatuses, $scope.statuses);
        $scope.state = $scope.statuses[0];
        $scope.filteredStates = enrolmentStates.checkState($scope.state.enrolmentStatusTypeId);
        decodeEnrolmentsSvc.enrolmentsDecoded($scope.localStatuses).then(function (states) {
          $scope.states = states;
        }).then(function () {
          enrolmentStates.searchStates($scope.filteredStates).then(function (states) {
            $scope.resultStates = states;
          });
        });
      } else {
        Restangular.one('specoffers', $scope.enrolment.specOfferId).getList('waves')
          .then(function (waves) {
          $scope.wave = waves[waves.length - 1];
          $scope.viewState = {};
          $scope.newState = {
            isContract: $scope.enrolment.isContract,
            isState: $scope.enrolment.isState,
            specOfferWaveId: $scope.wave.id,
            enrolmentStatusTypeId: 1
          };
          $scope.statuses.push($scope.newState);
          _.merge($scope.viewState, $scope.newState);
          decodeEnrolmentsSvc.enrolmentsDecoded([$scope.viewState]).then(function (state) {
            $scope.states = state;
          });
        });
      }

      $scope.addState = function () {
        $scope.viewState = {};
        $scope.newState = {
          isContract: $scope.newStatus.isContract,
          isState: $scope.newStatus.isState,
          specOfferWaveId: $scope.wave.id,
          enrolmentStatusTypeId: $scope.newStatus.enrolmentStatusTypeId
        };
        $scope.statuses.push($scope.newState);
        _.merge($scope.viewState, $scope.newState);
        decodeEnrolmentsSvc.enrolmentsDecoded([$scope.viewState]).then(function (state) {
          $scope.localStatuses.push(state[0]);
        });
      };
    }]);
