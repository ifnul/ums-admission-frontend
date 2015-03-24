'use strict';

/**
 * @ngdoc service
 * @name admissionSystemApp.SpecialtyGettingService
 * @description
 * # SpecialtyGettingService
 * Factory in the admissionSystemApp.
 */
angular.module('admissionSystemApp')
  .factory('SpecialtyGettingService', ['$http', function ($http) {

    var allSpecialties = [],
      directions = [],
      specialties = [];

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

      var nextOffset = 0,
        limit = 300;

      var resolveData = function (data) {

        angular.forEach(data.resources, function (resource) {
          allSpecialties.push(resource);
          if (!resource.hasOwnProperty('parentId'))
            directions.push(resource);
          else
            specialties.push(resource);
        });

        if (data.resources.length < limit) {
          return;
        }

        nextOffset += limit;

        $http(getConfig(nextOffset, limit)).success(resolveData);

      }

      $http(getConfig(nextOffset, limit)).success(resolveData);

    }

    getSpecialties();

    var service = {};

    service.searchSpecialtyByName = function (str) {
      var searchResult = [];
      var filter = function (item) {
        if (item.name.indexOf(str) > -1) {
          searchResult.push(item);
        }
      }
      angular.forEach(specialties, filter);
      return searchResult;
    }

    service.searchSpecialtyById = function (str) {
      var searchResult = [];
      var filter = function (item) {
        if (item.cipher.indexOf(str) > -1) {
          searchResult.push(item);
        }
      }
      angular.forEach(specialties, filter);
      return searchResult;
    }

    return service;

  }]);
