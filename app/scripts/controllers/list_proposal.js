'use strict';

/**
 * @ngdoc function
 * @name admissionSystemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the admissionSystemApp
 */
angular.module('admissionSystemApp')
  .controller('ListProposalCtrl', ['$scope', '$filter', 'ngTableParams', 'SpecoffersService', 'ListProposalGettingService', '$modal', 'SpecofferDictionaryService', 'Cookies',
    function ($scope, $filter, NgTableParams, SpecoffersService, ListProposalGettingService, $modal, SpecofferDictionaryService, Cookies) {

      $scope.headers = [
        {name: 'num', display: '№', visible: true},
        {name: 'specialtyId', display: 'Спеціальність', visible: true},
        {name: 'departmentId', display: 'Структурний підрозділ', visible: true},
        {name: 'timePeriodCourseId', display: 'Курс зарахування', visible: true},
        {name: 'specofferTypeId', display: 'Тип пропозиції', visible: true},
        {name: 'educationFormTypeId', display: 'Форма навчання', visible: true},
        {name: 'licCount', display: 'Ліцензований обсяг', visible: true},
        {name: 'stateCount', display: 'Державне замовлення', visible: true}
      ];

      $scope.openFiltersModal = function (size) {

        $modal.open({
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
      $scope.timeperiod.timePeriodId = Cookies.getCookie('timeperiod');
      $scope.dataNew = [];

      SpecofferDictionaryService.getTimeperiods({timePeriodTypeId: 1}).then(function (timeperiods) {
        $scope.timeperiods = timeperiods;
      });

      if ($scope.timeperiod.timePeriodId) {
        ListProposalGettingService.allProposalsDecoded($scope.timeperiod).then(function (data) {
          $scope.dataNew = data;
        });
      }

      $scope.pickTimePeriod = function () {
        Cookies.setCookie('timeperiod', $scope.timeperiod.timePeriodId, 120);
        SpecofferDictionaryService.clearStorageByRoute('specoffers');
        ListProposalGettingService.allProposalsDecoded($scope.timeperiod).then(function (data) {
          $scope.dataNew = data;
        });
      };
      var getData = function () {
        return $scope.dataNew;
      };
      $scope.$watch('dataNew', function () {
        $scope.tableParams.reload();
      }, true);
      $scope.tableParams = new NgTableParams({
        page: 1,            // show first page
        count: 10          // count per page
      }, {
        total: function () {
          return getData().length;
        }, // length of data
        getData: function ($defer, params) {
          var moreData = getData();
          moreData.forEach(function (el, index) {
            el.num = index + 1;
          });
          params.total(moreData.length);
          $defer.resolve(moreData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });

      $scope.delete = function (id) {
        SpecoffersService.deleteEntireSpecoffer(id).then(function() {
          SpecofferDictionaryService.clearStorageByRoute('specoffers');
          ListProposalGettingService.allProposalsDecoded($scope.timeperiod).then(function (data) {
            $scope.dataNew = data;
          });
        });
      };

    }]);




