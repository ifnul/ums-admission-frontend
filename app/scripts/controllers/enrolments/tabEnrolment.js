'use strict';

angular.module('admissionSystemApp')
  .controller('TabEnrolmentCtrl',
	  	function ($scope, DictionariesSvc, baseEnrolmentData, basePersonData) {

			DictionariesSvc.getAllDepartments({departmentTypeId: 1}).then(function (departments) {
				$scope.departmentId = departments;
			});

			DictionariesSvc.getEnrolmentsTypes().then(function (enrolmentsTypes) {
				$scope.enrolmentTypeId = enrolmentsTypes;
			});

			$scope.entireEnrolment.enrolment = {};

	    // watch entirePerson
	    $scope.$watch('entireEnrolment.enrolment', function(newVal) {
	     console.log('entireEnrolment.enrolment watch', newVal);
	    }, true);

	    $scope.fieldSearchBy = [];

	    $scope.personSearch = baseEnrolmentData.searchPerson;
	    $scope.personHeaders = basePersonData.headers;


	  });
