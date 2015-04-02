'use strict';


angular.module('admissionSystemApp')
.controller('NewProposalCtrl', ['$scope', 'SpecoffersService', 'SpecofferDictionaryService','$filter',
	function ($scope, SpecoffersService, SpecofferDictionaryService, $filter) {
    $scope.entireSpecoffer = {};
    $scope.entireSpecoffer.specoffer = {};
    $scope.entireSpecoffer.benefits = [];
    // $scope.entireSpecoffer.benefits = [
    //       {
    //         'benefitId': 1,
    //         'note': 'newNote'
    //       },
    //       {
    //         'benefitId': 2,
    //         'note': 'oldNode'
    //       }
    //     ];
    // $scope.entireSpecoffer.subjects = [
    //         {
    //           'mark': 3,
    //           'isMajor': false,
    //           'alternative': false,
    //           'weightSubject': 0.9,
    //           'enrolmentSubjectId': 1,
    //           'note': 'HERE'
    //         },
    //         {
    //           'mark': 2,
    //           'isMajor': false,
    //           'alternative': false,
    //           'weightSubject': 1,
    //           'enrolmentSubjectId': 1,
    //           'note': 'THERE'
    //         }
    //     ];

    $scope.entireSpecoffer.specoffer.timePeriodId = 8; // manual !!!!!!!!! fix!!!

    SpecofferDictionaryService.getAllSpecialties().then(function (specialties) {
      // $scope.specialties = specialties;
      // $scope.specialtyId = specialties;
    });
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

    // benefites
    // **********************************************************************
    //                      BROWSE OR UPDATE EXISTING SPECOFFER
    // **********************************************************************

    $scope.brosweOrEditSpecoffer = function  (specofferId) {
      SpecoffersService.getEntireSpecoffer(specofferId).then(function(res){
        console.log('getEntireSpecoffer 407', res);
        // console.log('getEntireSpecoffer 407 specoffer', res.specoffer);
        // console.log('getEntireSpecoffer 407 subjects', res.subjects);
        // console.log('getEntireSpecoffer 407 benefits', res.benefits);

        _.merge($scope.entireSpecoffer.subjects, res.subjects);
        _.merge($scope.entireSpecoffer.benefits, res.benefits);
        _.merge($scope.entireSpecoffer.specoffer, res.specoffer);

        console.log('$scope.entireSpecoffer.subjects', $scope.entireSpecoffer.subjects);
        console.log('$scope.entireSpecoffer.benefits', $scope.entireSpecoffer.benefits);
        console.log('$scope.entireSpecoffer.specoffer', $scope.entireSpecoffer.specoffer);

        // $scope.entireSpecoffer.subjects = res.subjects;
        //!!! note that this doesn't work
        // $scope.entireSpecoffer.specoffer.specialtyId = res.specoffer.specialtyId;
        // $scope.entireSpecofferCopy = angular.copy($scope.entireSpecoffer);
        // $scope.isEditingFlag = angular.copy($scope.entireSpecoffer);

      });
    }
    $scope.brosweOrEditSpecoffer(407);



    $scope.sendToServer = function (entireSpecoffer) {
      // console.log('entireSpecoffer', entireSpecoffer);
      // console.log('sending to server');
      $scope.entireSpecoffer.specoffer.note = 'some note';
      SpecoffersService.addOrEditSpecoffer(entireSpecoffer);

      // if (entireSpecofferCopy) {
      //   console.log('entireSpecoffer', entireSpecoffer);
      //   console.log('entireSpecofferCopy', entireSpecofferCopy);
      //   console.log('!!entireSpecofferCopy',!!entireSpecofferCopy); // delete this
      //   console.log('edit'); // delete this
      //   SpecoffersService.editEntireSpecoffer(entireSpecoffer, entireSpecofferCopy);
      // } else {
      //   console.log('!!entireSpecofferCopy',!!entireSpecofferCopy); // delete this
      //   console.log('create new one'); // delete this

      //   $scope.entireSpecoffer.specoffer.note = 'some note';
      //   SpecoffersService.addEntireSpecoffer(entireSpecoffer).then(function (id) {
      //     $scope.entireSpecoffer.specoffer.id = id;
      //     $scope.entireSpecofferCopy = angular.copy(entireSpecoffer);
      //   });
      // }
    }


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




