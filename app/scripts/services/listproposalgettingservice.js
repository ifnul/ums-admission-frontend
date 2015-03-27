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

    function getConfig(offset, limit, timePeriod) {

      limit = limit || 300;
      offset = offset || 0;

      return {
        method: 'GET',
        url: 'http://104.236.29.16:8080/is-lnu-rest-api/api/specoffers',
        params: {
          limit: limit,
          offset: offset,
          timePeriodId: timePeriod
        },
        headers: {'Authorization': 'Basic YWRtaW46bmltZGE='}
      }
    }

    this.getAllProposals = function (timePeriod) {

      var proposals = [],
        deferred = $q.defer(),
        nextOffset = 0,
        limit = 300;

      var resolveData = function (data) {

        angular.forEach(data.resources, function (resource) {
          proposals.push(resource);
        });

        if (data.resources.length < limit) {

           deferred.resolve(proposals);

          return;
        }

        nextOffset += limit;

        $http(getConfig(nextOffset, limit, timePeriod)).success(resolveData);

      };

      $http(getConfig(nextOffset, limit, timePeriod)).success(resolveData);

      return deferred.promise;

    };

    this.allProposalsDecoded = function (TimePeriod) {
      var deferred = $q.defer(),
          specialtyNames = [],
          departmentNames = [],
          timePeriodCourseNames = [],
          specofferTypeNames = [],
          eduFormTypeNames = [];


      //SpecofferDictionaryService.getAllSpecialties().then(function(rawProposals) {

      this.getAllProposals(TimePeriod).then(function (rawProposals) {
        //SpecofferDictionaryService.getAllSpecialties().then(function(data) {
        //  angular.forEach(data, function (item) {
        //    specialtyNames[item.id] = item.name;
        //  });
        //
        //  SpecofferDictionaryService.getAllDepartments().then(function(data) {
        //  angular.forEach(data, function (item) {
        //    departmentNames[item.id] = item.name;
        //  });
        //
        //    SpecofferDictionaryService.getTimePeriodCourseIds().then(function(data) {
        //      angular.forEach(data, function (item) {
        //        timePeriodCourseNames[item.id] = item.name;
        //      });
        //      SpecofferDictionaryService.getSpecoffersTypes().then(function(data) {
        //        angular.forEach(data, function (item) {
        //          specofferTypeNames[item.id] = item.name;
        //        });
        //        SpecofferDictionaryService.getEduformTypes().then(function(data) {
        //          angular.forEach(data, function (item) {
        //            eduFormTypeNames[item.id] = item.name;
        //          });
        //
        //          angular.forEach(rawProposals, function (item) {
        //            item.specialtyId = specialtyNames[item.specialtyId];
        //            item.departmentId = departmentNames[item.departmentId];
        //            item.timePeriodCourseId = timePeriodCourseNames[item.timePeriodCourseId];
        //            item.specofferTypeId = specofferTypeNames[item.specofferTypeId];
        //            item.eduFormTypeId = eduFormTypeNames[item.eduFormTypeId];
        //          });
        //          deferred.resolve(rawProposals);
        //        })
        //      })
        //    })
        //  })
        //})
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
