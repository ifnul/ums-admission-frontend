'use strict';


angular.module('admissionSystemApp')
  .controller('NewProposalCtrl', ['$scope', 'SpecoffersService', 'SpecofferDictionaryService', '$q', 'valueSendingService',
  	function ($scope, SpecoffersService, SpecofferDictionaryService, $q, valueSendingService) {
      $scope.entireSpecoffer = {};
      $scope.entireSpecoffer.specoffer = {};
      $scope.entireSpecoffer.specoffer.timePeriodId = valueSendingService.timeperiod;

      SpecofferDictionaryService.getAllDepartments().then(function (departments) {
        $scope.departmentId = departments;
      });
      SpecofferDictionaryService.getSpecoffersTypes().then(function (SpecoffersTypes) {
        $scope.specofferTypesOptions = SpecoffersTypes;
      });
      SpecofferDictionaryService.getEduformTypes().then(function (eduformtypes) {
         $scope.eduFormTypesOptions = eduformtypes;
      });

      SpecofferDictionaryService.getTimePeriodCourseIds().then(function (timePeriodCourseIds) {
        $scope.timePeriodCourseId = timePeriodCourseIds;
      });

  $scope.brosweOrEditSpecoffer = function  (specofferId) {
    SpecoffersService.getEntireSpecoffer(specofferId).then(function(res){
      _.merge($scope.entireSpecoffer.subjects, res.subjects);
      _.merge($scope.entireSpecoffer.benefits, res.benefits);
      _.merge($scope.entireSpecoffer.specoffer, res.specoffer);
    });
  };
  // $scope.brosweOrEditSpecoffer(407);

      // DEMO FOR GEtting ALL Departments
      // SpecofferDictionaryService.getAllDepartments().then(function (allDepartments) {
        // console.log('allDepartments',allDepartments);
      // })

      // DEMO FOR GEtting ALL specialities
      // SpecofferDictionaryService.getAllSpecialties().then(function (specialties) {
        // console.log('Specialties',specialties);
      // })

  $scope.sendToServer = function (entireSpecoffer) {
    $scope.entireSpecoffer.specoffer.note = 'some note';
    SpecoffersService.addOrEditSpecoffer(entireSpecoffer);
  };

      // delete this
      // $scope.$watch('entireSpecofferCopy', function (newVal) {
      //   console.log('entireSpecofferCopy watch', newVal);
      // }, true);

      // $scope.$watch('entireSpecoffer', function (newVal) {
      //   console.log('entireSpecoffer watch', newVal);
      // }, true);

  }]);

angular.module('admissionSystemApp')
  .config(['datepickerConfig', 'datepickerPopupConfig',
    function(datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerConfig.startingDay = '1';
      datepickerPopupConfig.showButtonBar = false;
  }]);




