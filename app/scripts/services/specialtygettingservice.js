'use strict';

angular.module('admissionSystemApp')
  .factory('SpecialtyGettingService', ['$http', '$q', 'SpecofferDictionaryService', function ($http, $q, SpecofferDictionaryService) {

    var deferred,
      deferredId = $q.defer(),
      deferredName = $q.defer(),
      deferredSpec = $q.defer(),
      searchResult = [],
      specialties = [];

    function fillSpecialtiesArray() {
      if (deferred) {
        return deferred.promise;
      }
      deferred = $q.defer();
      SpecofferDictionaryService.getAllSpecialties().then(function (data) {
        angular.forEach(data, function (resource) {
          if (resource.hasOwnProperty('parentId')) {
            specialties.push(resource);
          }
        });
        deferred.resolve(specialties);
      });
      return deferred.promise;
    }

    var service = {};

    service.searchSpecialtyByName = function (str) {
      fillSpecialtiesArray().then(function () {
        searchResult.length = 0;
        var filter = function (item) {
          if (item.name.indexOf(str) > -1) {
            searchResult.push(item);
          }
        };
        angular.forEach(specialties, filter);
        deferredName.resolve(searchResult);
      });
      return deferredName.promise;
    };

    service.searchSpecialtyById = function (str) {
      fillSpecialtiesArray().then(function () {
        searchResult.length = 0;
        var filter = function (item) {
          if (item.cipher.indexOf(str) > -1) {
            searchResult.push(item);
          }
        };
        angular.forEach(specialties, filter);
        deferredId.resolve(searchResult);
      });
      return deferredId.promise;
    };

    service.searchSpecialty = function (str) {
      fillSpecialtiesArray().then(function () {
        var specialty = null;
        angular.forEach(specialties, function (item) {
          if (parseInt(item.id) === parseInt(str)) {
            specialty = item;
            return false;
          }
        });
        deferredSpec.resolve(specialty);
      });
      return deferredSpec.promise;
    };

    return service;

  }]);



