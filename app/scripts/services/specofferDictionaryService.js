'use strict';

angular.module('admissionSystemApp')

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.get = { 'Authorization' : 'Basic YWRtaW46bmltZGE=' };
  }])

  .factory('SpecofferDictionaryService', ['$http', '$q', function ($http, $q) {
    function requestConfig(item, limit, offset, customParams) {
        var normalParams = {
          limit: limit,
          offset: offset
        };
        angular.extend(normalParams, customParams);

        return {
          method: 'GET',
          url: 'http://176.36.11.25/api-lnu/' + item,
          params: normalParams
          // ,cache: true
        };
      }


      var storage = {};
      function getLargeDictionary (route, customParams) {
        var deferred = $q.defer();

        if (storage[route]) {
          deferred.resolve(storage[route]);
        } else {
          storage[route] = [];

          var limit = 300;
          var offset = 0;

          $http(requestConfig(route, limit, offset, customParams)).success(function callBack (data) {

            for (var i=0; i<data.resources.length; i+=1) {
              storage[route].push(data.resources[i]);
            }
            if (data.resources.length < limit) {
              deferred.resolve(storage[route]);
              return;
            }
            offset += limit;
            $http(requestConfig(route, limit, offset, customParams)).success(callBack);
          });
        }
        return deferred.promise;
      }


      return {
        getAllDepartments: function () {
          return getLargeDictionary('departments');
        },
        getAllSpecoffers: function (params) {
          return getLargeDictionary('specoffers', params);
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
        getTimeperiods: function (obj) {
          return getLargeDictionary('timeperiods', obj);
        },
        getBenefits: function () {
          return getLargeDictionary('benefits');
        },
        clearStorageByRoute: function (route) {
          if(storage[route]) {
            delete storage[route];
          }
        }
      };
    }]);



