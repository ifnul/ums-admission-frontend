'use strict';

angular.module('admissionSystemApp')
  .controller('TabEnrolmentCtrl', ['$scope', 'DictionariesSvc',
    'baseFormData', 'basePersonData', '$q', 'baseSpecofferData', '$stateParams', 'EnrolmentModel', 'progressBarService',
    function ($scope, DictionariesSvc, baseFormData, basePersonData, $q, baseSpecofferData, $stateParams, EnrolmentModel, progressBarService) {

      /**
       * bind model (entire.entolment) to controller (view)
       */
      $scope.enrolment = EnrolmentModel.enrolmentObj();

      //$scope.$watch('enrolment', function (newVal) {
      //  console.log("enrolment:", newVal);
      //});

      if ($stateParams.personId) {
        $scope.enrolment.personId = $stateParams.personId;
      }
      if ($stateParams.id) {
        $scope.enrolment.id = $stateParams.id;
      }

      /**
       * get data and pass to dropdowns
       */
      $q.all([
        DictionariesSvc.getAllDepartments({
          departmentTypeId: 1
        }),
        DictionariesSvc.getEnrolmentsTypes(),
        DictionariesSvc.getSpecoffersTypes(),
        DictionariesSvc.getMarksScales()
      ])
        .then(function (promisesResult) {
          $scope.departmentId = promisesResult[0];
          $scope.specofferTypes = promisesResult[2];
          manageEnrolmentsTyps(promisesResult[1]);
          $scope.markType = promisesResult[3];
        });

      /**
       * for person selector
       * @type {Array}
       */
      $scope.fieldSearchBy = [];

      $scope.personSearch = baseFormData.searchPerson;
      $scope.isedustateOpt = baseFormData.isedustateOpt;
      $scope.isinterviewOpt = baseFormData.isinterviewOpt;
      $scope.personHeaders = basePersonData.headers;
      $scope.specofferHeaders = baseSpecofferData.headers;

      /**
       *
       * @param enrolmentTypes
       * 'Тип вступу' and 'Деталiзацiя вступу'
       */
      $scope.enrolmentTypes = {};
      function manageEnrolmentsTyps(enrolmentTypes) {
        $scope.chiefEnrolTypes = _.filter(enrolmentTypes, function (n) {
          return !n.parentId;
        });

        $scope.updateChildsEnrolTypes = function (chiefID) {
          $scope.enrolment.enrolmentTypeId = undefined;
          $scope.enrolmentTypeId = _.filter(enrolmentTypes, function (n) {
            return n.parentId === chiefID;
          });
        };

        if ($scope.enrolment.enrolmentTypeId) {
          var currentChild = _.filter(enrolmentTypes, {
            id: $scope.enrolment.enrolmentTypeId
          });

          $scope.enrolmentTypes.chiefs = currentChild[0].parentId;
          $scope.enrolmentTypeId = _.filter(enrolmentTypes, function (n) {
            return n.parentId === $scope.enrolmentTypes.chiefs;
          });
        }
      }

      /**
       * progress bar managment
       * TODO: enhance it
       */
      progressBarService.reset();
      $scope.$on('valBubble', function (evt, args) {
        progressBarService.setValidity(args.name, args.isValid);
      });


    }]);
