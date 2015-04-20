'use strict';

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
      .state('list-specoffer', {
        url: '/list-specoffer',
        templateUrl: '../views/specoffer/list_specoffer.html',
        controller: 'ListSpecofferCtrl'
      })
      .state('new-specoffer', {
        url: '/new-specoffer',
        templateUrl: '../views/specoffer/new_specoffer.html',
        controller: 'NewSpecofferCtrl'
      })
      .state('edit-specoffer', {
        url: '/edit-specoffer/:id',
        templateUrl: '../views/specoffer/new_specoffer.html',
        controller: 'NewSpecofferCtrl'
      })
      .state('list-person', {
        url: '/list-person',
        templateUrl: '../views/person/list_person.html',
        controller: 'ListPersonCtrl'
      })
      .state('new-person', {
        url: '/new-person',
        templateUrl: '../views/person/new_person.html',
        controller: 'NewPersonCtrl'
      })
      .state('dictionaries', {
        url: '/dictionaries',
        templateUrl: 'views/dictionaries.html',
        controller: 'dictionaryCtrl'
      })
      .state('edit-person', {
        url: '/edit-person/:id',
        templateUrl: '../views/person/new_person.html',
        controller: 'NewPersonCtrl'
      })
      .state('list-enrolments', {
        url: '/list-enrolments',
        templateUrl: '../views/enrolment/list_enrolments.html',
        controller: 'ListEnrolmentsCtrl'
      })
      .state('new-enrolment', {
        url: '/new-enrolment',
        templateUrl: '../views/enrolment/new_enrolment.html',
        controller: 'NewEnrolmentCtrl'
      })
      .state('edit-enrolment', {
        url: '/edit-enrolment/:id',
        templateUrl: '../views/enrolment/new_enrolment.html',
        controller: 'NewEnrolmentCtrl'
      });
    $urlRouterProvider.otherwise('/list-specoffer');
  })

  .config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  })

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.get = { 'Authorization' : 'Basic YWRtaW46bmltZGE=' };
  }]);
