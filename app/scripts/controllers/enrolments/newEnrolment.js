'use strict';


angular.module('admissionSystemApp')
  .controller('NewEnrolmentCtrl', [ '$scope', '$stateParams', 'DictionariesSvc', function ($scope, $stateParams, DictionariesSvc) {
    $scope.entolmentId = $stateParams.id;

		DictionariesSvc.getAllDepartments({departmentTypeId: 1}).then(function (res) {
			$scope.departmentId = res;
		});

		DictionariesSvc.getEnrolmentsTypes().then(function (res) {
			$scope.enrolmentTypeId = res;
		});


    $scope.entireEnrolment = {};
    $scope.entireEnrolment.enrolment = {};


    $scope.fieldSearchBy = [];
    $scope.search = [
        {
          title: 'по ПІБ',
          property: 'name'
        },
        {
          title: 'по призвіщу',
          property: 'surname'
        },
        {
          title: 'по id персони',
          property: 'id'
        },
        {
          title: 'по номеру паспорту',
          property: 'docNum',
          paperTypeId: 1
        },
        {
          title: 'по номеру атестату',
          property: 'docNum',
          paperTypeId: 2
        }
      ];


  }]);
