'use strict';


angular.module('admissionSystemApp')
.controller('NewProposalCtrl', ['$scope', 'Restangular', 'SpecoffersService', 'SpecofferDictionaryService','$filter',
	function ($scope, Restangular, SpecoffersService, SpecofferDictionaryService, $filter) {



    SpecofferDictionaryService.getDepartmentsByType().then(function (departments) {
      $scope.departmentId = departments;
      // $scope.specOffer.departmentId = departments[0].id;
    });

    SpecofferDictionaryService.getSpecoffersTypes().then(function (SpecoffersTypes) {
      $scope.specofferTypesOptions = SpecoffersTypes;
      // $scope.specOffer.specofferTypeId = SpecoffersTypes[0].id;
    });

    SpecofferDictionaryService.getEduformTypes().then(function (eduformtypes) {
       $scope.eduFormTypesOptions = eduformtypes;
      // $scope.specOffer.eduFormTypeId = eduformtypes[0].id;
    });

    SpecofferDictionaryService.getTimePeriodCourseIds().then(function (timePeriodCourseIds) {
      $scope.timePeriodCourseId = timePeriodCourseIds;
      // $scope.specOffer.timePeriodCourseId = timePeriodCourseIds[0].id;
    });

    $scope.$watchGroup(['specOffer.begDate', 'specOffer.endDate'], function(newValues){
        // $scope.specOffer.begDate = $filter('date')(newValues[0], 'yyyy-MM-dd');
        // $scope.specOffer.endDate = $filter('date')(newValues[1], 'yyyy-MM-dd');
    });

    // **********************************************************************
    //                      CREATE NEW SPECOFFER DEMO
    // **********************************************************************

    function createNewSpecoffer() {
     // $scope.entireSpecoffer = {};

      // watching specOffer object
      // $scope.$watch('specOffer', function (newVal) {
        // console.log(newVal);
      // }, true);

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
      // SpecoffersService.addEntireSpecoffer(entireSpecoffer);
    }
    // createNewSpecoffer DEMO
     createNewSpecoffer();

      // **********************************************************************
      //                      BROWSE OR UPDATE EXISTING SPECOFFER
      // **********************************************************************

    function brosweOrEditSpecoffer (specofferId) {
      SpecoffersService.getEntireSpecoffer(specofferId).then(function(res){
        console.log('res',res);
        $scope.specOffer = {};
        $scope.specOffer.specialtyId = res.specoffer.specialtyId;
        // $scope.pecOffer.departmentId = departments[res.specoffer.departmentId - 1].id;
        $scope.specOffer.specofferTypeId =  $scope.specofferTypesOptions[res.specoffer.specofferTypeId - 1].id;
        $scope.specOffer.timePeriodCourseId = $scope.timePeriodCourseId[res.specoffer.timePeriodCourseId - 1].id;
        $scope.specOffer.docSeries = res.specoffer.docSeries;
        $scope.specOffer.docNum = res.specoffer.docNum;
        $scope.specOffer.eduFormTypeId = $scope.eduFormTypesOptions[res.specoffer.eduFormTypeId - 1].id;
        $scope.specOffer.licCount = res.specoffer.licCount;
        $scope.specOffer.stateCount = res.specoffer.stateCount;
        $scope.specOffer.begDate = res.specoffer.begDate;
        $scope.specOffer.endDate = res.specoffer.endDate;
      });
    }

    brosweOrEditSpecoffer(407);

      // DEMO FOR GEtting ALL Departments
      // SpecofferDictionaryService.getAllDepartments().then(function (allDepartments) {
        // console.log('allDepartments',allDepartments);
      // })

      // DEMO FOR GEtting ALL specialities
      // SpecofferDictionaryService.getAllSpecialties().then(function (specialties) {
        // console.log('Specialties',specialties);
      // })






}]);

angular.module('admissionSystemApp')
  .config(['datepickerConfig', 'datepickerPopupConfig',
    function(datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerConfig.startingDay = '1';
      datepickerPopupConfig.showButtonBar = false;
  }]);




