'use strict';

/**
 * @ngdoc function
 * @name admissionSystemApp.controller:TabsctrlCtrl
 * @description
 * # TabsctrlCtrl
 * Controller of the admissionSystemApp
 */

angular.module('admissionSystemApp')
  .controller('TabsCtrl', ['$scope', 'progressBarService', function ($scope, progressBarService) {

    $scope.$on('valBubble', function (evt, args) {  // using directive, which is responsible for changes in each input

      if (args.isValid) {                           // checking if input is valid
        progressBarService.value++;                 // value increases if the field is valid
      }

      else if (progressBarService.value > 0) {      // value decreases if input content's was deleted
        progressBarService.value--;
      }
      else {
        progressBarService.inputQuantity++;         // counting the number of inputs
      }

    });


  }]);
