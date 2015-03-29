'use strict';

/**
 * @ngdoc function
 * @name admissionSystemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the admissionSystemApp
 */
angular.module('admissionSystemApp')
  .controller('ListProposalCtrl', ['$scope','$filter','ngTableParams', 'ListProposalGettingService', '$modal', function ($scope, $filter, ngTableParams, ListProposalGettingService, $modal) {

    $scope.headers = [
      {name: "id", display: "id", visible: true},
      {name: "specialtyId", display: "speciality", visible: true},
      {name: "departmentId", display: "department", visible: true},
      {name: "timePeriodId", display: "timePeriod", visible: true},
      {name: "timePeriodCourseId", display: "timePeriodCarousel", visible: true},
      {name: "specofferTypeId", display: "specofferType", visible: true},
      {name: "eduFormTypeId", display: "eduFormType", visible: true},
      {name: "licCount", display: "licCount", visible: true},
      {name: "stateCount", display: "stateCount", visible: true}
    ];

    $scope.openFiltersModal = function (size) {

      var modalInstance = $modal.open({
        templateUrl: '../views/modal/modalFilter.html',
        controller: function ($scope, $modalInstance) {
          $scope.headersLocal = $scope.headers;
          $scope.apply = function () {
            $scope.headers = $scope.headersLocal;
            $modalInstance.close('apply');
          };
        },
        size: size,
        scope: $scope
      });
    };

    ListProposalGettingService.allProposalsDecoded(8).then(function (data) {
      $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10          // count per page
      }, {
        total: data.length, // length of data
        getData: function ($defer, params) {
          $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    })



  }]);




