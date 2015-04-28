'use strict';


angular
  .module('admissionSystemApp')
  .controller('NewSpecofferCtrl', ['$scope', '$stateParams', '$location', 'SpecoffersService', 'DictionariesSvc', 'progressBarService', '$state',
    function ($scope, $stateParams, $location, SpecoffersService, DictionariesSvc, progressBarService, $state) {
      $scope.entireSpecoffer = {};
      $scope.entireSpecoffer.subjects = [];
      $scope.entireSpecoffer.benefits = [];
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
          $location.path('/#/list-specoffer');
        });
      };

      $scope.delete = function () {
        SpecoffersService.deleteEntireSpecoffer().then(function () {
          DictionariesSvc.clearStorageByRoute('specoffers');
          $location.path('/#/list-specoffer');
        });
      };


      $scope.$on('valBubble', function (evt, args) {  // using directive, which is responsible for changes in each input

        if (args.isValid) {                           // checking if input is valid
          progressBarService.value++;                 // value increases if the field is valid
        }

        else if (progressBarService.value > 0) {      // value decreases if input content's was deleted
          progressBarService.value--;
        }

        else if ($state.is('new-specoffer')) {
          progressBarService.inputQuantity++;
        }

      });

    }]);




angular.module('admissionSystemApp')
  .config(['datepickerConfig', 'datepickerPopupConfig',
    function (datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerConfig.startingDay = '1';
      datepickerPopupConfig.showButtonBar = false;
    }]);




