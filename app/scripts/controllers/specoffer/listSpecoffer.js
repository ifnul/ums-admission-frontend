'use strict';

angular
  .module('admissionSystemApp')
  .controller('ListSpecofferCtrl', ['$scope', '$filter', 'ngTableParams', 'SpecoffersService',
    'decodeSpecofferSvc', '$modal', 'DictionariesSvc', 'Cookies', 'baseSpecofferData', 'copyTimeperiod', '$rootScope',
    function ($scope, $filter, NgTableParams, SpecoffersService, decodeSpecofferSvc, $modal, DictionariesSvc, Cookies,
              baseSpecofferData, copyTimeperiod, $rootScope) {

      $scope.isCollapsed = true;
      $scope.sweeper = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
        if ($scope.isCollapsed) {
          $scope.timePeriod = {};
        }
      };

      $scope.createNewTimeperiod = function (timePeriod) {
        copyTimeperiod.createTimeperiod(
          timePeriod.numValue,
          'Вступна кампанія ' + timePeriod.numValue,
          timePeriod.begDate,
          timePeriod.endDate)
          .then(function (data) {
            timePeriod.id = data;

            DictionariesSvc.clearStorageByRoute('timeperiods');
            var timeperiodsPromise = DictionariesSvc.getTimeperiods({
              timePeriodTypeId: 1
            }).then(function (timeperiods) {
              $scope.timeperiods = timeperiods;

              return timeperiods;
            });

            return {
              timeperiodId: timePeriod.id,
              timeperiods: timeperiodsPromise
            };
          })
          .then(function (params) {
            return $modal.open({
              templateUrl: '../views/modal/modalCopyTimeperiod.html',
              //scope: $scope,
              resolve: {
                timePeriodId: function () {
                  return params.timeperiodId;
                },
                timeperiods: function () {
                  return params.timeperiods;
                }
              },
              controller: function ($scope, $modalInstance, timePeriodId, timeperiods) {
                $scope.timeperiods = _.filter(timeperiods, function (timeperiod) {
                  return timeperiod.id !== timePeriodId;
                });

                $scope.switch = false;
                $scope.switcher = function () {
                  $scope.switch = !$scope.switch;
                  $scope.selectedTimeperiod = undefined;
                };

                $scope.ok = function () {
                  $modalInstance.close($scope.selectedTimeperiod);
                };

              },
              size: 'lg'
            }).result;
          })
          .then(function (sourceTimeperiodId) {
            copyTimeperiod.copyToTimeperiod(sourceTimeperiodId, timePeriod.id, timePeriod.begDate, timePeriod.endDate).then(function (result) {
              // success
            }, function (error) {
              // error
            }, function (percentComplete) {
              $rootScope.progress = Math.round (percentComplete);
            });
          })
          .finally(function () {
            $scope.sweeper();
            $rootScope.progress = undefined;
          });
      };

      $scope.headers = baseSpecofferData.headers;

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

      DictionariesSvc.getTimeperiods({
        timePeriodTypeId: 1
      }).then(function (timeperiods) {
        $scope.timeperiods = timeperiods;
        $scope.timeperiodsForCopy = timeperiods;
      });

      if ($scope.timeperiod.timePeriodId) {
        DictionariesSvc.getAllSpecoffers($scope.timeperiod).then(function (rawSpecoffers) {
          decodeSpecofferSvc.specofferDecoded(rawSpecoffers).then(function (decodedSpecoffers) {
            $scope.dataNew = decodedSpecoffers;
          });
        });
      }

      $scope.pickTimePeriod = function () {
        Cookies.setCookie('timeperiod', $scope.timeperiod.timePeriodId, 120);
        DictionariesSvc.clearStorageByRoute('specoffers');
        DictionariesSvc.getAllSpecoffers($scope.timeperiod).then(function (rawSpecoffers) {
          decodeSpecofferSvc.specofferDecoded(rawSpecoffers).then(function (decodedSpecoffers) {
            $scope.dataNew = decodedSpecoffers;
          });
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

      $scope.deleteSpecoffer = function (id) {
        SpecoffersService.deleteEntireSpecoffer(id).then(function () {
          DictionariesSvc.clearStorageByRoute('specoffers');
          DictionariesSvc.getAllSpecoffers($scope.timeperiod).then(function (rawSpecoffers) {
            decodeSpecofferSvc.specofferDecoded(rawSpecoffers).then(function (decodedSpecoffers) {
              $scope.dataNew = decodedSpecoffers;
            });
          });
        });
      };

    }]);
