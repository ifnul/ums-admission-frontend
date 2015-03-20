'use strict';

// RESEARCH: $routeProvider.resolve.


angular
  .module('admissionSystemApp', [
    'ngResource',
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/list_proposal.html',
        controller: 'ListProposalCtrl'
      })
      .when('/new-proposal', {
        templateUrl: 'views/new_proposal.html',
        controller: 'manageSpecoffersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

// angular.module('admissionSystemApp')
//   .config(function(RestangularProvider) {
//     RestangularProvider.setBaseUrl('http://104.236.29.16:8080/is-lnu-rest-api/api/');

//     RestangularProvider.setRestangularFields({
//       id: '_id.$oid'
//     });

    // RestangularProvider.setErrorInterceptor(
    //   function(resp) {
    //      displayError();
    //     return false; // stop the promise chain
    // });
 
    // ------------ ResponseInterceptor

    // RestangularProvider.setResponseInterceptor(
    //   function(data, operation, what) {
    //     if (operation == 'getList') {
    //       return data[what];
    //     }
    //     return data;
    // });

    // --------------- setRequestInterceptor() 


 
  // });