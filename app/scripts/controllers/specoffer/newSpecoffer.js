'use strict';


angular.module('admissionSystemApp')
  .controller('NewSpecofferCtrl', ['$scope', '$stateParams', '$location', 'SpecoffersService', 'DictionariesSvc',
    function ($scope, $stateParams, $location, SpecoffersService, DictionariesSvc) {
      $scope.entireSpecoffer = {};

      $scope.brosweOrEditSpecoffer = function (specofferId) {
        SpecoffersService.getEntireSpecoffer(specofferId).then(function (res) {
          _.merge($scope.entireSpecoffer.subjects, res.subjects);
          _.merge($scope.entireSpecoffer.benefits, res.benefits);
          _.merge($scope.entireSpecoffer.specoffer, res.specoffer);
        });
      };

      if ($stateParams.id) {
        $scope.brosweOrEditSpecoffer($stateParams.id);
      }

      $scope.sendToServer = function (entireSpecoffer) {
        $scope.entireSpecoffer.specoffer.note = 'some note';
        SpecoffersService.addOrEditSpecoffer(entireSpecoffer).then(function () {
          DictionariesSvc.clearStorageByRoute('specoffers');
          $location.path('/#/list-specoffer');
        });
      };

      $scope.delete = function () {
        SpecoffersService.deleteEntireSpecoffer().then(function () {
          DictionariesSvc.clearStorageByRoute('specoffers');
          $location.path('/#/list-specoffer');
        });
      };

    }]);

angular.module('admissionSystemApp')
  .config(['datepickerConfig', 'datepickerPopupConfig',
    function (datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerConfig.startingDay = '1';
      datepickerPopupConfig.showButtonBar = false;
    }]);




