'use strict';

/**
 * @ngdoc overview
 * @name admissionSystemApp
 * @description
 * # admissionSystemApp
 *
 * Main module of the application.
 */
angular
  .module('admissionSystemApp', [
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ngTable',
    'restangular',
    'ngSanitize',
    'ui.select',
    'loadingSpinner',
    'checklist-model'
  ])


  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list-proposal', {
        url: '/list-proposal',
        templateUrl: 'views/list_proposal.html',
        controller: 'ListProposalCtrl'
      })
      .state('new-proposal', {
        url: '/new-proposal',
        templateUrl: 'views/new_proposal.html',
        controller: 'NewProposalCtrl'
      })
      .state('edit-proposal', {
        url: '/edit-proposal/:id',
        templateUrl: 'views/new_proposal.html',
        controller: 'NewProposalCtrl'
      })
      .state('list-person', {
        url: '/list-person',

        templateUrl: 'views/list_person.html',
        controller: 'ListPersonCtrl'
      })
      .state('new-person', {
        url: '/new-person',

        templateUrl: 'views/new_person.html',
        controller: 'NewPersonCtrl'
      })
      .state('dictionaries', {
        url: '/dictionaries',

        templateUrl: 'views/dictionaries.html',
        controller: 'dictionaryCtrl'
      });
    $urlRouterProvider.otherwise('/list-proposal');
  })

  .config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  });

