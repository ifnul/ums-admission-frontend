'use strict';

angular.module('admissionSystemApp')
  .factory('SpecialtyGettingService',  ['$http', '$q', function ($http, $q) {

    var  deferred;
    var  deferredId = $q.defer();
    var  deferredName = $q.defer();
    var  searchResult = [];
    var specialties = [];

    function fillSpecialtiesArray () {
      if (deferred) {
        return deferred.promise;
      }
      var deferred = $q.defer();
      SpecofferDictionaryService.getAllSpecialties().then(function (data) {
        angular.forEach(data, function (resource) {
          if (resource.hasOwnProperty('parentId'))  {
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

    return service;

  }]);



