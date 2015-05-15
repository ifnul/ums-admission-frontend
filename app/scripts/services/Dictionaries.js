'use strict';

angular
  .module('admissionSystemApp')
  .factory('DictionariesSvc', ['$http', '$q', 'Constants', 'translHttpStatusSvc', 'toaster',
    function ($http, $q, Constants, translHttpStatusSvc, toaster) {

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
        var deferred = $q.defer(),
          dictionaryItems = [],
          limit,
          offset,
          i;

        ifCache = (ifCache === undefined) ? true : ifCache;

        if (storage[route] && ifCache) {
          return storage[route];
        } else {
          storage[route] = deferred.promise;
          limit = 300;
          offset = 0;

          $http(requestConfig(route, limit, offset, customParams)).success(function callBack (data) {

            for (i = 0; i < data.resources.length; i += 1) {
              dictionaryItems.push(data.resources[i]);
            }
            if (data.resources.length < limit) {
              deferred.resolve(dictionaryItems);
              return;
            }
            offset += limit;
            $http(requestConfig(route, limit, offset, customParams)).success(callBack);
          })
          .error(function (msg) {
            toaster.pop(translHttpStatusSvc.translate(msg));
            deferred.reject(msg);
          });
        }

        return storage[route];
      }

      return {
        getAllItems: function (route, params, ifCache) {
          return getLargeDictionary(route, params, ifCache);
        },
        getAllDepartments: function (params) {
          return getLargeDictionary('departments', params);
        },
        getAllSpecoffers: function (params) {
          return getLargeDictionary('specoffers', params, false);
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
        getBenefitsTypes: function () {
          return getLargeDictionary('benefits/types');
        },
        clearStorageByRoute: function (route) {
          if (storage[route]) {
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
        getContactsTypes: function () {
          return getLargeDictionary('contacts/types');
        },
        getPaperTypes: function (params) {
          return getLargeDictionary('papers/types', params, false);
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
        getPublicActivitiesAwards: function (params) {
          return getLargeDictionary('publicactivities/' + params + '/awards');
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
        },
        getEnrolments: function (params) {
          return getLargeDictionary('enrolments', params, false);
        }
      };
    }]);
