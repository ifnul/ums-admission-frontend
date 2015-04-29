'use strict';

angular.module('admissionSystemApp')
.factory('getFiltredListSvc', ['$http', '$q', 'decodeEnrolmentsSvc', 'Constants', 'personDecodeSvc',
  function ($http, $q, decodeEnrolmentsSvc, Constants, personDecodeSvc) {

    function makeFiltersPretty (rawFilters) {
      var readyToUseFiltres = {};

      _.forEach(rawFilters, function (value, key) {
        if (!(value.length < 1) && value.length !== value[0].length) {
          _.forEach(value, function (item) {
            readyToUseFiltres[key] = item.id;
          });
        }
      });
      return readyToUseFiltres;
    }

    var decodeSvcs = {
      enrolments: decodeEnrolmentsSvc.enrolmentsDecoded,
      persons: personDecodeSvc.personDecoded
    };

    function getData(route, pageNumber, perPage, filters, sort) {
      var deferred = $q.defer(),
      requestParams = {
        method: 'GET',
        url: Constants.basicURL + route,
        params: {
          limit: perPage,
          offset: (pageNumber - 1) * perPage
        }
      };

      _.extend(requestParams.params, makeFiltersPretty(filters));
      _.extend(requestParams.params, sort);

      $http(requestParams).success(function (data) {
        decodeSvcs[route](data.resources).then(function (decodedItems) {
          var dataToReturn = {
            data: decodedItems,
            total: data.count
          };

          deferred.resolve(dataToReturn);
        });
      })
      .error(function (msg) {
        deferred.reject(msg);
      });
      return deferred.promise;
    }

    return {
      getListEnrolments: function (pageNumber, perPage, filters, sort) {
        return getData('enrolments', pageNumber, perPage, filters, sort);
      },
      getListPersons: function (pageNumber, perPage, filters, sort) {
        return getData('persons', pageNumber, perPage, filters, sort);
      }
    };
  }]);
