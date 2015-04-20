'use strict';

angular.module('admissionSystemApp')
.factory('getListEnrolmentsSvc', ['$http', '$q', 'decodeEnrolmentsSvc', 'Constants',
  function($http, $q, decodeEnrolmentsSvc, Constants) {

    function makeFiltersPretty (rawFilters) {
      var readyToUseFiltres = {};
      _.forEach(rawFilters, function (value, key) {
        if (!(value.length <1) && value.length !== value[0].length) {
          _.forEach(value, function (item) {
            readyToUseFiltres[key] = item.id;
          });
        }
      });
      return readyToUseFiltres;
    }

    function getData(route, pageNumber, perPage, filters, sort) {
      var deferred = $q.defer();

      var requestParams = {
        method: 'GET',
        url: Constants.basicURL + route,
        params: {
          limit: perPage,
          offset: (pageNumber - 1) * perPage
        }
      };
      _.extend(requestParams.params, makeFiltersPretty(filters));
      _.extend(requestParams.params, sort);

      $http(requestParams).success(function(data) {

        decodeEnrolmentsSvc.enrolmentsDecoded(data.resources).then(function(decodedItems) {
          var dataToReturn = {
            data: decodedItems,
            total: data.count
          };
          deferred.resolve(dataToReturn);
        });
      });
      return deferred.promise;
    }

    return {
      getListEnrolments: function(pageNumber, perPage, filters, sort) {
        return getData('enrolments', pageNumber, perPage, filters, sort);
      },
      getListPersons: function(pageNumber, perPage, filters, sort) {
        return getData('person', pageNumber, perPage, filters, sort);
      }
    };
  }]);
