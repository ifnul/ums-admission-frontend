'use strict';

angular
  .module('admissionSystemApp')
  .controller('NewSpecofferCtrl', ['$scope', '$stateParams', 'SpecoffersService',
    'DictionariesSvc', '$state', 'baseSpecofferData',
    function ($scope, $stateParams, SpecoffersService, DictionariesSvc, $state, baseSpecofferData) {
      $scope.entireSpecoffer = {};
      $scope.entireSpecoffer.subjects = [];
      $scope.entireSpecoffer.benefits = [];
      $scope.entireSpecoffer.waves = [];
      $scope.entireSpecoffer.specoffer = {};

      $scope.brosweOrEditSpecoffer = function (specofferId) {
        SpecoffersService.getEntireSpecoffer(specofferId).then(function (res) {
          _.merge($scope.entireSpecoffer.subjects, res.subjects);
          _.merge($scope.entireSpecoffer.benefits, res.benefits);
          _.merge($scope.entireSpecoffer.specoffer, res.specoffer);
          _.merge($scope.entireSpecoffer.waves, res.waves);

        });
      };

      if ($stateParams.id) {
        $scope.brosweOrEditSpecoffer($stateParams.id);
      } else {
        SpecoffersService.clearCopy();
      }

      $scope.sendToServer = function (entireSpecoffer) {
        $scope.entireSpecoffer.specoffer.note = 'some note';
        SpecoffersService.addOrEditSpecoffer(entireSpecoffer).then(function () {
          DictionariesSvc.clearStorageByRoute('specoffers');
          $state.go('root.specoffer.list');
        });
      };

      $scope.deleteSpecoffer = function () {
        SpecoffersService.deleteEntireSpecoffer().then(function () {
          DictionariesSvc.clearStorageByRoute('specoffers');
          $state.go('root.specoffer.list');
        });
      };

      $scope.specofferTabs = angular.copy(baseSpecofferData.tabs);

      _.each($scope.specofferTabs, function (item) {
        item.active = $state.current.name === item.route.new || $state.current.name === item.route.edit;
      });

      $scope.go = function (route) {
        console.log(route.new);
        if ($stateParams.id) {
          $state.go(route.edit, {
            id: $stateParams.id
          });
        } else {
          $state.go(route.new);
        }
      };


    }]);

angular.module('admissionSystemApp')
  .config(['datepickerConfig', 'datepickerPopupConfig',
    function (datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerConfig.startingDay = '1';
      datepickerPopupConfig.showButtonBar = false;
    }]);
