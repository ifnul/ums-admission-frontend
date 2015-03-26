'use strict';


angular.module('admissionSystemApp')
.controller('NewProposalCtrl', ['$scope', 'Restangular', 'SpecoffersService', 'SpecofferDictionaryService','$filter',
	function ($scope, Restangular, SpecoffersService, SpecofferDictionaryService, $filter) {

      $scope.specOffer = {};

      SpecofferDictionaryService.getDepartmentsByType().then(function (departments) {
        $scope.departmentId = departments;
        $scope.specOffer.departmentId = departments[0].id;
      });

      SpecofferDictionaryService.getSpecoffersTypes().then(function (SpecoffersTypes) {
        $scope.specofferTypesOptions = SpecoffersTypes;
        $scope.specOffer.specofferTypeId = SpecoffersTypes[0].id;
      });

      SpecofferDictionaryService.getEduformTypes().then(function (eduformtypes) {
        $scope.eduFormTypesOptions = eduformtypes;
        $scope.specOffer.eduFormTypeId = eduformtypes[0].id;
      });

      SpecofferDictionaryService.getTimePeriodCourseIds().then(function (timePeriodCourseIds) {
        $scope.timePeriodCourseId = timePeriodCourseIds;
        $scope.specOffer.timePeriodCourseId = timePeriodCourseIds[0].id;
      });

      // DEMO FOR GEtting ALL Departments
      // SpecofferDictionaryService.getAllDepartments().then(function (allDepartments) {
        // console.log(allDepartments);
      // })

      // watching specOffer object
      $scope.$watch('specOffer', function (newVal) {
        // console.log(newVal);
      }, true);


      $scope.$watchGroup(['specOffer.begDate', 'specOffer.endDate'], function(newValues){
          $scope.specOffer.begDate = $filter('date')(newValues[0], 'yyyy-MM-dd');
          $scope.specOffer.endDate = $filter('date')(newValues[1], 'yyyy-MM-dd');
      });


      // new SpecOffer example
  		var newSpecOffer = {
  			'docSeries': '122211',
  			'docNum': '234333111',
  			'licCount': 14,
  			'stateCount': 14,
  			'departmentId': 44,
  			'eduFormTypeId': 1,
  			'specialtyId': 336,
  			'specofferTypeId': 12,
  			'timePeriodId': 10,
  			'note': 'TEXT',
  			'begDate': '2015-10-01',
  			'endDate': '2020-07-05'
  		};

      // new Subject example
  		var newSubject = {
  			'mark': 3,
  			'isMajor': false,
  			'alternative': false,
  			'weightSubject': 0.9,
  			'specOfferId': 35,
  			'enrolmentSubjectId': 1,
  			'note': 'HERE'
  		};

      // new Benefit example
   		var newBenefit = {
   			'benefitId': 1,
   			'specOfferId': 37,
   			'note': 'new note note'
   		};


}]);

angular.module('admissionSystemApp')
  .config(['datepickerConfig', 'datepickerPopupConfig',
    function(datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerConfig.startingDay = '1';
      datepickerPopupConfig.showButtonBar = false;
  }]);
