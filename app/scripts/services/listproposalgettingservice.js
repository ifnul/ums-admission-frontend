'use strict';

/**
 * @ngdoc service
 * @name admissionSystemApp.ListProposalGettingService
 * @description
 * # ListProposalGettingService
 * Service in the admissionSystemApp.
 */
angular.module('admissionSystemApp')
  .service('ListProposalGettingService', ['$http', function ($http) {

    var proposals = [];

    //gets all proposals
    this.getAllProposals = function(timePeriod){

      //this gives configuration for http GET request
      function getConfig(offset, limit, timePeriod) {

        limit = limit || 300;
        offset = offset || 0;

        return {
          method: 'GET',
          url: 'http://176.36.11.25/api-lnu/specoffers?limit='+limit+'&offset='+offset+'&timePeriodId='+timePeriod,
          headers: { 'Authorization': 'Basic YWRtaW46bmltZGE=' }
        }
      } // END of getConfig

      var resolveData = function (data){

        //console.log({count: count, dataLength: data.resources.length, loaded: proposals.length});

        //checking if we get the end of the data on server
        if(data.resources.length == 0) return;

        //using angular.forEach for filling data array
        angular.forEach(data.resources, function(resource){
          proposals.push(resource);
        });

        count = data.count || 0;

        //increase offset for the next getting of data
        nextOffset += limit;

        //if all data loaded now, lets show them
        if(count == proposals.length) //console.log(proposals);

        // getting a next data recursively
        $http(getConfig(nextOffset, limit, timePeriod)).success(resolveData);

      } // END of resolveData

      //variables for configuring get data request
      var nextOffset = 0,
          limit = 300,
          count = 0;

      $http(getConfig(nextOffset, limit, timePeriod)).success(resolveData);

      return proposals;

    }; // END of getAllProposals

  }]);
