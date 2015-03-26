'use strict';

angular.module('admissionSystemApp')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.get = { 'Authorization' : 'Basic YWRtaW46bmltZGE=' };
  }]);

angular.module('admissionSystemApp')
  .factory('SpecofferDictionaryService', ['$http', '$q', function ($http, $q) {

    function requestConfig(itemType, deparTypeId, limit, offset) {
      deparTypeId = deparTypeId || undefined;
      limit = limit || undefined;
      offset = offset || undefined;

      return {
        method: 'GET',
        url: 'http://104.236.29.16:8080/is-lnu-rest-api/api/' + itemType + '',
        params: {
          departmentTypeId: deparTypeId,
          limit: limit,
          offset: offset
        }
      };
    }

    function getAnyItems(itemType, deparTypeId) {
      var deferred = $q.defer();
      $http(requestConfig(itemType, deparTypeId)).success(function (result) {
        deferred.resolve(result.resources);
      });
      return deferred.promise;
    }

    function getLargeDictionary (route) {
      var arrayToFill = [];
      var deferred = $q.defer();
      var limit = 300;
      var offset = 0;

      $http(requestConfig(route, undefined, limit, offset)).success(function callBack (data) {
        
        for (var i=0; i<data.resources.length; i+=1) {
          arrayToFill.push(data.resources[i]);
        }
        if(data.resources.length < 300) {
          deferred.resolve(arrayToFill);
          return;
        }

        offset += limit;
        $http(requestConfig(route, undefined, limit, offset)).success(callBack);
      });

      return deferred.promise;
    }

    return {
      getDepartmentsByType: function () {
        return getAnyItems('departments', 2);
      },
      getAllDepartments: function () {
        return getLargeDictionary('departments');
      },
      getAllSpecialties: function () {
        return getLargeDictionary('specialties');
      },
      getSpecoffersTypes: function () {
        return getAnyItems('specoffers/types');
      },
      getEduformTypes: function () {
        return getAnyItems('eduformtypes');
      },
      getTimePeriodCourseIds: function () {
        return getAnyItems('/courses/types');
      }
    };
  }]);



