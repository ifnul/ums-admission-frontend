'use strict';

angular.module('admissionSystemApp')
  .controller('ListSpecofferCtrl', ['$scope', '$filter', 'ngTableParams', 'copyTimeperiod', 'SpecoffersService', 'decodeSpecofferSvc', '$modal', 'DictionariesSvc', 'Cookies',
    function ($scope, $filter, NgTableParams, copyTimeperiod, SpecoffersService, decodeSpecofferSvc, $modal, DictionariesSvc, Cookies) {

      $scope.isCollapsed = true;
      $scope.sweeper = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
        if ($scope.isCollapsed) {
          $scope.numValue = undefined;
          $scope.begDate = undefined;
          $scope.endDate = undefined;
        }
      };

      $scope.createNewTimeperiod = function (size) {
        copyTimeperiod.createTimeperiod($scope.numValue, 'Вступна кампанія' + $scope.numValue, $scope.begDate, $scope.endDate).then(function(data){
          $scope.createdTimeperiodId = data;

          DictionariesSvc.clearStorageByRoute('timeperiods');
          DictionariesSvc.getTimeperiods({timePeriodTypeId: 1}).then(function (timeperiods) {
            $scope.timeperiods = timeperiods;
          });
        });

        $modal.open({
          templateUrl: '../views/modal/modalCopyTimeperiod.html',
          scope: $scope,
          controller: function ($scope, $modalInstance) {

            $scope.switch = false;
            $scope.switcher = function () {
              $scope.switch = !$scope.switch;
              $scope.selectedTimeperiod = undefined;
            };

            $scope.ok = function () {
              copyTimeperiod.copyToTimeperiod($scope.selectedTimeperiod, $scope.createdTimeperiodId, $scope.begDate, $scope.endDate);
              $modalInstance.close();
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

          },
          size: size
        });
      };

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
      $scope.timeperiodsForCopy = {};
      $scope.timeperiod.timePeriodId = Cookies.getCookie('timeperiod');
      $scope.dataNew = [];

      DictionariesSvc.getTimeperiods({timePeriodTypeId: 1}).then(function (timeperiods) {
        $scope.timeperiods = timeperiods;
        $scope.timeperiodsForCopy = timeperiods;
      });

      if ($scope.timeperiod.timePeriodId) {
        decodeSpecofferSvc.allProposalsDecoded($scope.timeperiod).then(function (data) {
          $scope.dataNew = data;
        });
      }

      $scope.pickTimePeriod = function () {
        Cookies.setCookie('timeperiod', $scope.timeperiod.timePeriodId, 120);
        DictionariesSvc.clearStorageByRoute('specoffers');
        decodeSpecofferSvc.allProposalsDecoded($scope.timeperiod).then(function (data) {
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
          DictionariesSvc.clearStorageByRoute('specoffers');
          decodeSpecofferSvc.allProposalsDecoded($scope.timeperiod).then(function (data) {
            $scope.dataNew = data;
          });
        });
      };

    }]);




