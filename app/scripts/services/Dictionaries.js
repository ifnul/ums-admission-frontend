'use strict';

angular.module('admissionSystemApp')

  .factory('DictionariesSvc', ['$http', '$q', 'Constants', function ($http, $q, Constants) {

    function requestConfig(item, limit, offset, customParams) {
        var normalParams = {
          limit: limit,
          offset: offset
        };
        angular.extend(normalParams, customParams);

        return {
          method: 'GET',
          url: Constants.basicURL + item,
          params: normalParams
        };
      }

      var storage = {};
      function getLargeDictionary (route, customParams, ifCache) {
        var deferred = $q.defer();
        ifCache = (ifCache === undefined) ? true : ifCache;

        if (storage[route] && ifCache) {
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
        getAllDepartments: function (params) {
          return getLargeDictionary('departments', params);
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
        getSpecialtiesTypes: function () {
          return getLargeDictionary('specialties/types');
        },
        getSpecoffersTypes: function () {
          return getLargeDictionary('specoffers/types');
        },
        getEduformTypes: function () {
          return getLargeDictionary('educations/forms/types');
        },
        getTimePeriodCourseIds: function () {
          return getLargeDictionary('courses/types');
        },
        getTimeperiods: function (params) {
          return getLargeDictionary('timeperiods', params);
        },
        getBenefits: function () {
          return getLargeDictionary('benefits');
        },
        getBenefitsTypes: function() {
          return getLargeDictionary('benefits/types');
        },
        clearStorage: function () {
          storage = {};
        },
        clearStorageByRoute: function (route) {
          if(storage[route]) {
            delete storage[route];
          }
        },
        getTimeperiodsTypes: function () {
          return getLargeDictionary('timeperiods/types');
        },
        getPersons: function (params) {
          return getLargeDictionary('persons', params, false);
        },
        getPersonsTypes: function () {
          return getLargeDictionary('persons/types');
        },
        getGenderTypes: function () {
          return getLargeDictionary('gendertypes');
        },
        getMarriedTypes: function () {
          return getLargeDictionary('marriedtypes');
        },
        getAdminUnits: function (params) {
          return getLargeDictionary('adminunits', params, false);
        },
        getAdminUnitsTypes: function () {
          return getLargeDictionary('adminunits/types');
        },
        getAddressTypes: function () {
          return getLargeDictionary('addresstypes');
        },
        getStreetsTypes: function () {
          return getLargeDictionary('streets/types');
        },
        getAssets: function () {
          return getLargeDictionary('assets');
        },
        getLanguages: function () {
          return getLargeDictionary('languages');
        },
        getContactsTypes: function () {
          return getLargeDictionary('contacts/types');
        },
        getPaperTypes: function () {
          return getLargeDictionary('papers/types');
        },
        getAllPapers: function (params) {
          return getLargeDictionary('persons/papers', params);
        },
        getPaperUsages: function () {
          return getLargeDictionary('papers/usages');
        },
        getHonorsTypes: function () {
          return getLargeDictionary('honors/types');
        },
        getPublicActivities: function () {
          return getLargeDictionary('publicactivities');
        },
        getPublicActivitiesTypes: function () {
          return getLargeDictionary('publicactivities/types');
        },
        getPublicActivitiesAwards: function () {
          return getLargeDictionary('publicactivities/awards');
        },
        getEnrolmentsSubjects: function () {
          return getLargeDictionary('enrolments/subjects');
        },
        getEnrolmentsTypes: function () {
          return getLargeDictionary('enrolments/types');
        },
        getEnrolmentsStatusTypes: function () {
          return getLargeDictionary('enrolments/statustypes');
        },
        getWavesTypes: function () {
          return getLargeDictionary('wave/types');
        }
      };
    }]);



