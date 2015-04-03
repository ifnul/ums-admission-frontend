'use strict';

/**
 * @ngdoc function
 * @name admissionSystemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the admissionSystemApp
 */
angular.module('admissionSystemApp')
  .controller('ListProposalCtrl', ['$scope', '$filter', 'ngTableParams', 'ListProposalGettingService', '$modal', 'SpecofferDictionaryService', 'valueSendingService',
    function ($scope, $filter, ngTableParams, ListProposalGettingService, $modal, SpecofferDictionaryService, valueSendingService) {

    $scope.headers = [
        {name: "id", display: "№", visible: true},
      {name: "specialtyId", display: "Спеціальність", visible: true},
      {name: "departmentId", display: "Структурний підрозділ", visible: true},
      {name: "timePeriodCourseId", display: "Курс зарахування", visible: true},
      {name: "specofferTypeId", display: "Тип пропозиції", visible: true},
      {name: "eduFormTypeId", display: "Форма навчання", visible: true},
      {name: "licCount", display: "Ліцензований обсяг", visible: true},
      {name: "stateCount", display: "Державне замовлення", visible: true}
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

    $scope.timeperiod = {};

    SpecofferDictionaryService.getTimeperiods({timePeriodTypeId: 1}).then(function (timeperiods) {
      $scope.timeperiods = timeperiods;
    });
    $scope.dataNew = [];
    $scope.pickTimePeriod = function () {
      valueSendingService.timeperiod = $scope.timeperiod.timePeriodId;
      SpecofferDictionaryService.clearStorageByRoute('specoffers');
      ListProposalGettingService.allProposalsDecoded($scope.timeperiod).then(function (data) {
        $scope.dataNew = data;
      });
    };
    var getData = function () {
      return $scope.dataNew;
    };
    $scope.$watch("dataNew", function () {
      $scope.tableParams.reload();
    });
    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10          // count per page
    }, {
      total: function () {
        return getData().length;
      }, // length of data
      getData: function ($defer, params) {
        var moreData = getData();
        params.total(moreData.length);
        $defer.resolve(moreData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });

  }]);




