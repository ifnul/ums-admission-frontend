'use strict';

/**
 * @ngdoc service
 * @name admissionSystemApp.ListProposalGettingService
 * @description
 * # ListProposalGettingService
 * Service in the admissionSystemApp.
 */
angular.module('admissionSystemApp')
  .service('ListProposalGettingService', ['$http', '$q', 'SpecofferDictionaryService', function ($http, $q, SpecofferDictionaryService) {

     this.allProposalsDecoded = function (params) {
      var deferred = $q.defer(),
          specialtyNames = [],
          departmentNames = [],
          timePeriodCourseNames = [],
          specofferTypeNames = [],
          eduFormTypeNames = [];


      SpecofferDictionaryService.getAllSpecoffers(params).then(function(rawProposals) {

        var promise1 = SpecofferDictionaryService.getAllSpecialties().then(function(data) {
            angular.forEach(data, function (item) {
              specialtyNames[item.id] = item.name;
            })});
        var promise2 = SpecofferDictionaryService.getAllDepartments().then(function(data) {
            angular.forEach(data, function (item) {
              departmentNames[item.id] = item.name;
            })});
        var promise3 = SpecofferDictionaryService.getTimePeriodCourseIds().then(function(data) {
                angular.forEach(data, function (item) {
                  timePeriodCourseNames[item.id] = item.name;
                })});
        var promise4 = SpecofferDictionaryService.getSpecoffersTypes().then(function(data) {
                  angular.forEach(data, function (item) {
                    specofferTypeNames[item.id] = item.name;
                  })});
        var promise5 = SpecofferDictionaryService.getEduformTypes().then(function(data) {
                    angular.forEach(data, function (item) {
                      eduFormTypeNames[item.id] = item.name;
                    })});
        $q.all([promise1, promise2, promise3, promise4, promise5]).then(function(){
                    angular.forEach(rawProposals, function (item) {
                      item.specialtyId = specialtyNames[item.specialtyId];
                      item.departmentId = departmentNames[item.departmentId];
                      item.timePeriodCourseId = timePeriodCourseNames[item.timePeriodCourseId];
                      item.specofferTypeId = specofferTypeNames[item.specofferTypeId];
                      item.eduFormTypeId = eduFormTypeNames[item.eduFormTypeId];
                    });
                    deferred.resolve(rawProposals);

        })
      });
      return deferred.promise;
    }

  }]);
