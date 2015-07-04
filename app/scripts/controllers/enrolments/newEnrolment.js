'use strict';

angular
  .module('admissionSystemApp')
  .controller('NewEnrolmentCtrl', ['$scope', '$stateParams', 'baseFormData', '$state', 'EnrolmentModel',
    'DictionariesSvc', 'toaster',
    function ($scope, $stateParams, baseFormData, $state, EnrolmentModel, DictionariesSvc, toaster) {

      if (!$stateParams.id) {
        EnrolmentModel.clearEntireEnrolment();
      }
      /**
       * 1) check if enrolment id is passed. If so - current state is *editing* state
       * 2) bind model to contoller (view)
       */
      $scope.enrolmentId = $stateParams.id; // 1)
      $scope.enrolment = EnrolmentModel.enrolmentObj(); // 2)

      console.log('$scope.enrolment', $scope.enrolment);

      $scope.enrolTabs = angular.copy(baseFormData.tabs);
      _.each($scope.enrolTabs, function (item) {
        item.active =  $state.current.name === item.route.new || $state.current.name === item.route.edit;
      });

      /**
       * @param route, e.g. root.enrolment.new or root.enrolment.edit/4
       * perfom navigation between tabs
       */
      $scope.goToTab = function (route) {
        if ($scope.enrolmentId) {
          $state.go(route.edit, {
            id: $scope.enrolmentId
          });
        } else {
          $state.go(route.new);
        }
      };

      /**
       * disable benefit tab if specOfferId && personId is undefined;
       * @returns {boolean}
       */
      $scope.isExtendedTabsAvailable = function() {
        return $scope.enrolment.specOfferId && $scope.enrolment.personId;
      };

      /**
       * 1) if id was passed as a parameter to state - act as anrolment is browsing or editing
       * 2) else - act as new enrolment needed to be created
       */
      if ($stateParams.id) {
        EnrolmentModel.getEntireEnrolment($stateParams.id).then(function(res) {
          $scope.enrolment = EnrolmentModel.enrolmentObj();
          //$scope.enrolment = res;
          console.log('res', res);
          //console.log('EnrolmentModel.enrolmentObj', EnrolmentModel.enrolmentObj);
          console.log('$scope.enrolment',$scope.enrolment);
        });
      } else {
        EnrolmentModel.clearCopy();
        //EnrolmentModel.clearEntireEnrolment();
      }

      /**
       * perfom sending (saving) entire enrolment to server
       * 1) clear cache in dictionary after saving
       * 2) clear entireEnrolment obj after saving
       * 3) if prefious route was root.person.edit - redirect to it, else - to root.enrolment.list
       */
      $scope.sendToServer = function () {
        EnrolmentModel.addOrEditEnrolment().then(function () {
          DictionariesSvc.clearStorageByRoute('enrolments'); // 1)
          EnrolmentModel.clearEntireEnrolment(); // 2)

          if ($stateParams.personId) { // 3)
            $state.go($stateParams.previousState, {
              id: $stateParams.personId
            });
          } else {
            $state.go ('root.enrolment.list');
          }
        }, function (resp) {
          toaster.pop('error', resp.messageType, resp.message);
          //toaster.pop(translHttpStatusSvc.translate(msg));
        });
      };

      $scope.delete = function () {
        EnrolmentModel.deleteEntireEnrolment().then(function () {
          DictionariesSvc.clearStorageByRoute('enrolments');
          $state.go ('root.enrolment.list');
        });
      };

    }]);
