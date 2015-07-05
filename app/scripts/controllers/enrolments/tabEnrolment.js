'use strict';

angular.module('admissionSystemApp')
  .controller('TabEnrolmentCtrl', ['$scope', 'DictionariesSvc',
    'baseFormData', 'basePersonData', '$q', 'baseSpecofferData', '$stateParams', 'EnrolmentModel', 'progressBarService',
    function ($scope, DictionariesSvc, baseFormData, basePersonData, $q, baseSpecofferData, $stateParams, EnrolmentModel, progressBarService) {

      /**
       * bind model (entire.entolment) to controller (view)
       */
      $scope.enrolment = EnrolmentModel.enrolmentObj();
      console.log('$scope.enrolment', $scope.enrolment);
      $scope.$watch('enrolment', function (newVal) {
        console.log("enrolment:", newVal);
      });

      if ($stateParams.personId) {
        $scope.enrolment.personId = $stateParams.personId;
      }
      if ($stateParams.id) {
        $scope.enrolment.id = $stateParams.id;
      }

      /**
       * get data and pass to dropdowns
       */
      DictionariesSvc.clearStorageByRoute('enrolments/types');
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
          //manageEnrolmentsTyps(promisesResult[1]);
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
       * progress bar managment
       * TODO: enhance it
       */
      progressBarService.reset();
      $scope.$on('valBubble', function (evt, args) {
        progressBarService.setValidity(args.name, args.isValid);
      });


    }]);
