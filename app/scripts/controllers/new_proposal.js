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
        // console.log('allDepartments',allDepartments);
      // })

      // DEMO FOR GEtting ALL specialities
      // SpecofferDictionaryService.getAllSpecialties().then(function (specialties) {
        // console.log('Specialties',specialties);
      // })


      // watching specOffer object
      // $scope.$watch('specOffer', function (newVal) {
        // console.log(newVal);
      // }, true);


      $scope.$watchGroup(['specOffer.begDate', 'specOffer.endDate'], function(newValues){
          $scope.specOffer.begDate = $filter('date')(newValues[0], 'yyyy-MM-dd');
          $scope.specOffer.endDate = $filter('date')(newValues[1], 'yyyy-MM-dd');
      });


      var entireSpecoffer = {
        specoffer : {
            'timePeriodId': 8,
            'eduFormTypeId': 2,
            'specofferTypeId': 2,
            'docSeries': 'RRT',
            'docNum': '12345',
            'begDate': '2014-02-08',
            'endDate': '2018-02-08',
            'licCount': 12,
            'stateCount': 13,
            'departmentId': 21,
            'specialtyId': 123,
            'note': 'NEW_NOTE',
            'timePeriodCourseId': 1
        },
        benefites : [
          {
            'benefitId': 1,
            'note': 'newNote'
          },
          {
            'benefitId': 2,
            'note': 'oldNode'
          }
        ],
        subjects : [
            {
              'mark': 3,
              'isMajor': false,
              'alternative': false,
              'weightSubject': 0.9,
              'enrolmentSubjectId': 1,
              'note': 'HERE'
            },
            {
              'mark': 2,
              'isMajor': false,
              'alternative': false,
              'weightSubject': 1,
              'enrolmentSubjectId': 1,
              'note': 'THERE'
            }
        ]
      }
      // add entireSpecoffer to server DEMO
      // SpecoffersService.manageEntireSpecoffer(entireSpecoffer);
}]);

angular.module('admissionSystemApp')
  .config(['datepickerConfig', 'datepickerPopupConfig',
    function(datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerConfig.startingDay = '1';
      datepickerPopupConfig.showButtonBar = false;
  }]);
