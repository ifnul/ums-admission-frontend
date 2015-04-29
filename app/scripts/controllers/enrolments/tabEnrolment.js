'use strict';

angular.module('admissionSystemApp')
  .controller('TabEnrolmentCtrl', ['$scope', 'DictionariesSvc',
    'baseFormData', 'basePersonData', '$q', 'baseSpecofferData', '$stateParams',
    function ($scope, DictionariesSvc, baseFormData, basePersonData, $q, baseSpecofferData, $stateParams) {

      if ($stateParams.personId) {
        $scope.personId = $stateParams.personId;
      }
      if ($stateParams.id) {
        $scope.enrolmentId = $stateParams.id;
      }

      $q.all([
        DictionariesSvc.getAllDepartments({
          departmentTypeId: 1
        }),
        DictionariesSvc.getEnrolmentsTypes(),
        DictionariesSvc.getSpecoffersTypes()
      ])
        .then(function (promisesResult) {
          $scope.departmentId = promisesResult[0];
          $scope.specofferTypes = promisesResult[2];
          manageEnrolmentsTyps(promisesResult[1]);
        });

      $scope.entireEnrolment.enrolment = {};
      // $scope.entireEnrolment.enrolment.specOfferId = 141;
      // $scope.entireEnrolment.enrolment.enrolmentTypeId = 8;
      // $scope.entireEnrolment.enrolment.personId = 33;
      // $scope.entireEnrolment.enrolment.personPaperId = 35; // 22

      $scope.fieldSearchBy = [];

      $scope.personSearch = baseFormData.searchPerson;
      $scope.isedustateOpt = baseFormData.isedustateOpt;
      $scope.isinterviewOpt = baseFormData.isinterviewOpt;
      $scope.personHeaders = basePersonData.headers;
      $scope.specofferHeaders = baseSpecofferData.headers;
      $scope.enrolmentTypes = {};

      function manageEnrolmentsTyps (enrolmentTypes) {
        $scope.chiefEnrolTypes = _.filter(enrolmentTypes, function (n) {
          return !n.parentId;
        });

        $scope.updateChildsEnrolTypes = function (chiefID) {
          $scope.entireEnrolment.enrolment.enrolmentTypeId = undefined;
          $scope.enrolmentTypeId = _.filter(enrolmentTypes, function (n) {
            return n.parentId === chiefID;
          });
        };

        if ($scope.entireEnrolment.enrolment.enrolmentTypeId) {
          var currentChild = _.filter(enrolmentTypes, {
            id: $scope.entireEnrolment.enrolment.enrolmentTypeId
          });

          $scope.enrolmentTypes.chiefs = currentChild[0].parentId;
          $scope.enrolmentTypeId = _.filter(enrolmentTypes, function (n) {
            return n.parentId === $scope.enrolmentTypes.chiefs;
          });
        }
      }
    }]);
