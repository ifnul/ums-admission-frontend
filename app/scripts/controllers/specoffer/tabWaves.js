'use strict';

angular
  .module('admissionSystemApp')
  .controller('TabWavesCtrl', ['$scope', '$modal', '$q', 'DictionariesSvc', '$filter',
    function ($scope, $modal, $q, DictionariesSvc, $filter) {

      $scope.entireSpecoffer.waves = [];
      $scope.viewWaves = [];
      var i, m;

      $scope.$watchCollection('entireSpecoffer.waves',
        function () {
          $scope.viewWaves = [];
          for (i = 0; i < $scope.entireSpecoffer.waves.length; i++) {
            (function (i) {

              $q.all([
                DictionariesSvc.getWavesTypes()
              ])
                .then(function (promisesResult) {
                  $scope.wavesTypes = promisesResult[0];

                  for (m = 0; m < $scope.wavesTypes.length; m++) {
                    if ($scope.wavesTypes[m].id === $scope.entireSpecoffer.waves[i].waveTypeId) {
                      $scope.wavesTypesName = $scope.wavesTypes[m].name;
                      break;
                    }
                  }

                  $scope.viewWaves.push({    // push data into table
                    waveTypeId: $scope.entireSpecoffer.waves[i].waveTypeId,
                    wavesTypesName: $scope.wavesTypesName,
                    licCount: $scope.entireSpecoffer.waves[i].licCount,
                    stateCount: $scope.entireSpecoffer.waves[i].stateCount,
                    benefitCount: $scope.entireSpecoffer.waves[i].benefitCount,
                    targetCount: $scope.entireSpecoffer.waves[i].targetCount,
                    beginDate: $scope.entireSpecoffer.waves[i].beginDate,
                    endDate: $scope.entireSpecoffer.waves[i].endDate
                  });
                });
            })(i);
          }
        });

      $scope.open = function (wave, idx) {

        $modal.open({
          templateUrl: '../views/modal/modalWave.html',
          controller: 'ModalWaveCtrl',
          resolve: {
            wave: function () {
              return wave;
            },
            idx: function () {
              return idx;
            }
          },
          scope: $scope.$new(true)
        }).result.then(function (item) {
            item.beginDate = $filter('date')(item.beginDate, 'yyyy-MM-dd');
            item.endDate = $filter('date')(item.endDate, 'yyyy-MM-dd');

            if (idx !== undefined) {
              $scope.entireSpecoffer.waves[idx] = {
                waveTypeId: item.idWave.waveTypeId,
                licCount: item.licCount,
                stateCount: item.stateCount,
                benefitCount: item.benefitCount,
                note: '',
                targetCount: item.targetCount,
                beginDate: item.beginDate,
                endDate: item.endDate
              };
            }
            else {

              $scope.entireSpecoffer.waves.push({
                waveTypeId: item.idWave.waveTypeId,
                licCount: item.licCount,
                stateCount: item.stateCount,
                benefitCount: item.benefitCount,
                targetCount: item.targetCount,
                note: '',
                beginDate: item.beginDate,
                endDate: item.endDate
              });
            }
          }
        ); //end new scope
      };

      $scope.removeRow = function (idx) {
        $scope.entireSpecoffer.waves.splice(idx, 1);
        $scope.viewWaves.splice(idx, 1);
      };

    }])

  .controller('ModalWaveCtrl', function ($scope, $modalInstance, wave, idx, $q, DictionariesSvc) {

    $scope.idWave = {};
    $scope.idx = idx;

    $q.all([
      DictionariesSvc.getWavesTypes()
    ])
      .then(function (promisesResult) {
        $scope.wavesTypes = promisesResult[0];

        if (idx !== undefined) {
          $scope.idWave.waveTypeId = wave.waveTypeId;
          $scope.licCount = wave.licCount;
          $scope.stateCount = wave.stateCount;
          $scope.benefitCount = wave.benefitCount;
          $scope.targetCount = wave.targetCount;
          $scope.beginDate = wave.beginDate;
          $scope.endDate = wave.endDate;
        }
      });

    $scope.ok = function () {
      $scope.$close($scope);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });

