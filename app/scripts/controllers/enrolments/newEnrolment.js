'use strict';

angular
  .module('admissionSystemApp')
  .controller('NewEnrolmentCtrl', ['$scope', '$stateParams', 'baseFormData', '$state', 'EnrolmentService',
    'DictionariesSvc',
    function ($scope, $stateParams, baseFormData, $state, EnrolmentService, DictionariesSvc) {
      $scope.enrolmentId = $stateParams.id;

      $scope.entireEnrolment = {};
      $scope.entireEnrolment.enrolment = {};
      $scope.entireEnrolment.enrolment.isContract = 0;
      $scope.entireEnrolment.enrolment.isState = 0;
      $scope.entireEnrolment.enrolmentsubjects = [];
      $scope.entireEnrolment.benefits = [];
      $scope.entireEnrolment.enrolment = {};
      $scope.entireEnrolment.enrolment.specOfferId;
      $scope.entireEnrolment.enrolment.personId;


      $scope.enrolTabs = angular.copy(baseFormData.tabs);

      _.each($scope.enrolTabs, function (item) {
        item.active =  $state.current.name === item.route.new || $state.current.name === item.route.edit;
      });

      $scope.go = function (route) {
        if ($scope.enrolmentId) {
          $state.go(route.edit, {
            id: $scope.enrolmentId
          });
        } else {
          $state.go(route.new);
        }
      };

      $scope.isExtendedTabsAvailable = function() {
        return $scope.entireEnrolment.enrolment.specOfferId && $scope.entireEnrolment.enrolment.personId;
      };

      $scope.brosweOrEditEnrolment = function (enrolmentId) {
        EnrolmentService.getEntireEnrolment(enrolmentId).then(function (res) {
          _.merge($scope.entireEnrolment.enrolmentsubjects, res.enrolmentsubjects);
          _.merge($scope.entireEnrolment.benefits, res.benefits);
          _.merge($scope.entireEnrolment.enrolment, res.enrolment);
          _.merge($scope.entireEnrolment.statuses, res.statuses);

        });
      };

      if ($stateParams.id) {
        $scope.brosweOrEditEnrolment($stateParams.id);
      } else {
        EnrolmentService.clearCopy();
      }

      $scope.sendToServer = function (entireEnrolment) {
        $scope.entireEnrolment.enrolment.note = 'some note';
        EnrolmentService.addOrEditEnrolment(entireEnrolment).then(function () {
          DictionariesSvc.clearStorageByRoute('enrolments');
          $state.go ('root.enrolment.list');
        });

        $scope.delete = function () {
          EnrolmentService.deleteEntireEnrolment().then(function () {
            DictionariesSvc.clearStorageByRoute('enrolments');
            $state.go ('root.enrolment.list');
          });
        };
      };
    }]);
