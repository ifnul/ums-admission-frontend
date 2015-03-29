'use strict';

angular.module('admissionSystemApp')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.get = { 'Authorization' : 'Basic YWRtaW46bmltZGE=' };
  }]);

angular.module('admissionSystemApp')
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('admissionSystemApp');
  });

angular.module('admissionSystemApp')
  .factory('SpecofferDictionaryService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    function requestConfig(itemType, limit, offset, timePeriodId) {
        var limit = limit || undefined;
        var offset = offset || undefined;
        var timePeriodId = timePeriodId || undefined;

        return {
          method: 'GET',
          url: 'http://104.236.29.16:8080/is-lnu-rest-api/api/' + itemType + '',
          params: {
            limit: limit,
            offset: offset,
            timePeriodId: timePeriodId
          }
          // ,cache: true
        };
      }

      function getLargeDictionary (route, timePeriodId) {
      var currentItemFromLocalStorage = localStorageService.get(route);
      var deferred = $q.defer();

        if (currentItemFromLocalStorage) {
          deferred.resolve(currentItemFromLocalStorage);
        } else {
          var arr = []
          var limit = 300;
          var offset = 0;

          $http(requestConfig(route, limit, offset, timePeriodId)).success(function callBack (data) {

            for (var i=0; i<data.resources.length; i+=1) {
              arr.push(data.resources[i]);
            }
            if (data.resources.length < limit) {
              deferred.resolve(arr);
              localStorageService.set(route, arr);
              return;
            }
            offset += limit;
            $http(requestConfig(route, limit, offset, timePeriodId)).success(callBack);
          });
        }
        return deferred.promise;
      }


      return {
        getAllDepartments: function () {
          return getLargeDictionary('departments');
        },
        getAllSpecoffersByTimePeriodId: function (timePeriodId) {
          return getLargeDictionary('specoffers', timePeriodId);
        },
        getAllSubjects: function () {
          return getLargeDictionary('enrolments/subjects');
        },
        getAllSpecialties: function () {
          return getLargeDictionary('specialties');
        },
        getSpecoffersTypes: function () {
          return getLargeDictionary('specoffers/types');
        },
        getEduformTypes: function () {
          return getLargeDictionary('eduformtypes');
        },
        getTimePeriodCourseIds: function () {
          return getLargeDictionary('courses/types');
        },
        getTimeperiods: function () {
          return getLargeDictionary('timeperiods');
        }
      };
    }]);



