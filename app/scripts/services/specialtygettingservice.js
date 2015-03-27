'use strict';

/**
 * @ngdoc service
 * @name admissionSystemApp.SpecialtyGettingService
 * @description
 * # SpecialtyGettingService
 * Factory in the admissionSystemApp.
 */
angular.module('admissionSystemApp')
  .factory('SpecialtyGettingService', ['$http', '$q', function ($http, $q) {

    var allSpecialties = [],
      directions = [],
      specialties = [],
      deferred,
      deferredId = $q.defer(),
      deferredName = $q.defer(),
      searchResult = [];



    function getConfig(offset, limit) {

      limit = limit || 300;
      offset = offset || 0;

      return {
        method: 'GET',
        url: 'http://104.236.29.16:8080/is-lnu-rest-api/api/specialties',
        params: {
          limit: limit,
          offset: offset
        },
        headers: {'Authorization': 'Basic YWRtaW46bmltZGE='}
      }
    }

    function getSpecialties() {

      if (deferred) {
        return deferred.promise;
      }

      var nextOffset = 0,
        limit = 300;

      deferred = $q.defer();

      var resolveData = function (data) {

        angular.forEach(data.resources, function (resource) {
          allSpecialties.push(resource);
          if (!resource.hasOwnProperty('parentId'))
            directions.push(resource);
          else
            specialties.push(resource);
        });

        if (data.resources.length < limit) {
          deferred.resolve(specialties);
          return;
        }

        nextOffset += limit;

        $http(getConfig(nextOffset, limit)).success(resolveData);

      }

      $http(getConfig(nextOffset, limit)).success(resolveData);

      return deferred.promise;

    }

    getSpecialties();

    var service = {};

    service.searchSpecialtyByName = function (str) {
      getSpecialties().then(function () {
        searchResult.length = 0;
        var filter = function (item) {
          if (item.name.indexOf(str) > -1) {
            searchResult.push(item);
          }
        }
        angular.forEach(specialties, filter);
        deferredName.resolve(searchResult);
      })
      return deferredName.promise;
    }

    service.searchSpecialtyById = function (str) {
      getSpecialties().then(function () {
        searchResult.length = 0;
        var filter = function (item) {
          if (item.cipher.indexOf(str) > -1) {
            searchResult.push(item);
          }
        }
        angular.forEach(specialties, filter);
        deferredId.resolve(searchResult);
      })
      return deferredId.promise;
    }

    return service;

  }]);



