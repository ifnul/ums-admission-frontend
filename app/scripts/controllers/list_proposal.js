'use strict';

/**
 * @ngdoc function
 * @name admissionSystemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the admissionSystemApp
 */
angular.module('admissionSystemApp')
  .controller('ListProposalCtrl', ['$scope','ngTableParams', 'ListProposalGettingService', function ($scope, ngTableParams, ListProposalGettingService) {

    ListProposalGettingService.getAllProposals(8).then(function (data) {
      console.log('data inside',data);
      $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
      }, {
        total: data.length, // length of data

        getData: function ($defer, params) {
           $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    });
  }]);






