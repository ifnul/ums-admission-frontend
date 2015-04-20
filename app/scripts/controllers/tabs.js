'use strict';



angular.module('admissionSystemApp')
  .controller('TabsCtrl', ['$scope', 'progressBarService', '$state', function ($scope, progressBarService, $state) {

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
