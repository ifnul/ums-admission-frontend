'use strict';


angular.module('admissionSystemApp')
  .controller('NewProposalCtrl', ['$scope', 'SpecoffersService', 'SpecofferDictionaryService', '$q', 'valueSendingService',
  	function ($scope, SpecoffersService, SpecofferDictionaryService, $q, valueSendingService) {
      $scope.entireSpecoffer = {};
      $scope.entireSpecoffer.specoffer = {};
      $scope.entireSpecoffer.specoffer.timePeriodId = valueSendingService.timeperiod;

    $q.all([
      SpecofferDictionaryService.getAllDepartments(),
      SpecofferDictionaryService.getSpecoffersTypes(),
      SpecofferDictionaryService.getEduformTypes(),
      SpecofferDictionaryService.getTimePeriodCourseIds()
    ])
    .then(function(promisesResult) {
      $scope.departmentId = promisesResult[0];
      $scope.specofferTypesOptions = promisesResult[1];
      $scope.eduFormTypesOptions = promisesResult[2];
      $scope.timePeriodCourseId = promisesResult[3];
    });

    $scope.brosweOrEditSpecoffer = function  (specofferId) {
      SpecoffersService.getEntireSpecoffer(specofferId).then(function(res){
        _.merge($scope.entireSpecoffer.subjects, res.subjects);
        _.merge($scope.entireSpecoffer.benefits, res.benefits);
        _.merge($scope.entireSpecoffer.specoffer, res.specoffer);
      });
    };
    $scope.brosweOrEditSpecoffer(384);

    $scope.sendToServer = function (entireSpecoffer) {
      $scope.entireSpecoffer.specoffer.note = 'some note';
      SpecoffersService.addOrEditSpecoffer(entireSpecoffer);
    };

    $scope.delete = SpecoffersService.deleteEntireSpecoffer();

  }]);

angular.module('admissionSystemApp')
  .config(['datepickerConfig', 'datepickerPopupConfig',
    function(datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerConfig.startingDay = '1';
      datepickerPopupConfig.showButtonBar = false;
  }]);




