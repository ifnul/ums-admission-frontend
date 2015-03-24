'use strict';

/**
 * @ngdoc function
 * @name admissionSystemApp.controller:TabsctrlCtrl
 * @description
 * # TabsctrlCtrl
 * Controller of the admissionSystemApp
 */

angular.module('admissionSystemApp')
  .controller('TabsCtrl',  ['$scope', 'progressBarService', function ($scope, progressBarService) {

    $scope.$on('valBubble', function(evt, args) {

      if (args.isValid) {
        progressBarService.value++;
        console.log('Value good:'+ progressBarService.value);

      }

      else if (progressBarService.value > 0){
        progressBarService.value--;


      }
      else {
        progressBarService.number++;
        console.log('Number:'+ progressBarService.number);
      }

    });


  }]);
