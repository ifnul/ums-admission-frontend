'use strict';


angular.module('admissionSystemApp')
	.controller('ListEnrolmentsCtrl', ['$scope', 'getListEnrolmentsSvc', 'DictionariesSvc', 'baseEnrolmentData', '$q',
    function($scope, getListEnrolmentsSvc, SpecofferDictionaryService, baseEnrolmentData, $q) {

      $scope.getEnrolments = function (pageNumber, perPage, filters, sort) {
        getListEnrolmentsSvc.getListEnrolments(pageNumber, perPage, filters, sort).then(function(res) {
          $scope.enrolDecoded = res.data;
          $scope.totalEnrol = res.total;
        });
      };

      $scope.enrolSearch = baseEnrolmentData.search;
      $scope.enrolHeaders = baseEnrolmentData.headers;
      $scope.enrolFilters = baseEnrolmentData.filters;

      $q.all([
        SpecofferDictionaryService.getEnrolmentsTypes(),
        SpecofferDictionaryService.getAllDepartments({departmentTypeId: 1})
      ])
        .then(function (promisesResult) {
          baseEnrolmentData.expandFilters(promisesResult[0], 'enrolmentTypeId');
          baseEnrolmentData.expandFilters(promisesResult[1], 'departmentId');
        });

	}]);
