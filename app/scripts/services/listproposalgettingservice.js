'use strict';

/**
 * @ngdoc service
 * @name admissionSystemApp.ListProposalGettingService
 * @description
 * # ListProposalGettingService
 * Service in the admissionSystemApp.
 */
angular.module('admissionSystemApp')
  .service('ListProposalGettingService', ['$http', '$q', function ($http, $q) {

    function getConfig(offset, limit, timePeriod) {

      limit = limit || 300;
      offset = offset || 0;

      return {
        method: 'GET',
        url: 'http://104.236.29.16:8080/is-lnu-rest-api/api/specoffers',
        params: {
          limit: limit,
          offset: offset,
          timePeriodId: timePeriod
        },
        headers: {'Authorization': 'Basic YWRtaW46bmltZGE='}
      }
    }

    this.getAllProposals = function (timePeriod) {

      var proposals = [],
        deferred = $q.defer(),
        nextOffset = 0,
        limit = 300;


      var resolveData = function (data) {

        if (data.resources.length < limit) {
          deferred.resolve(proposals);
          return;
        }

        angular.extend(proposals, data.resources);

        nextOffset += limit;

        $http(getConfig(nextOffset, limit, timePeriod)).success(resolveData);

      };

      $http(getConfig(nextOffset, limit, timePeriod)).success(resolveData);

      return deferred.promise;

    };

  }]);
