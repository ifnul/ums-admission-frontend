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

      /** ----- new-enrolment view ----- **/
      .state('new-enrolment', {
        url: '/new-enrolment',
        templateUrl: '../views/enrolment/new_enrolment.html',
        controller: 'NewEnrolmentCtrl'
      })
        .state('new-enrolment.tab-enrolment', {
          url: '/tab-enrolment',
          templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolment.html',
          controller: 'TabEnrolmentCtrl'
        })
        .state('new-enrolment.tab-benefits', {
          url: '/tab-benefits',
          templateUrl: '../views/enrolment/tabsEnrolment/tab_benefits.html',
          controller: ''
        })
        .state('new-enrolment.tab-enrolmentsubjects', {
          url: '/tab-enrolmentsubjects',
          templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolmentsubjects.html',
          controller: ''
        })
        .state('new-enrolment.tab-statuses', {
          url: '/tab-statuses',
          templateUrl: '../views/enrolment/tabsEnrolment/tab_statuses.html',
          controller: ''
        })
      /** ----- edit-enrolment view ----- **/
      .state('edit-enrolment', {
        url: '/edit-enrolment/:id',
        templateUrl: '../views/enrolment/new_enrolment.html',
        controller: 'NewEnrolmentCtrl'
      })
        .state('edit-enrolment.tab-enrolment', {
          url: '/tab-enrolment',
          templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolment.html',
          controller: 'TabEnrolmentCtrl'
        })
        .state('edit-enrolment.tab-benefits', {
          url: '/tab-benefits',
          templateUrl: '../views/enrolment/tabsEnrolment/tab_benefits.html',
          controller: ''
        })
        .state('edit-enrolment.tab-enrolmentsubjects', {
          url: '/tab-enrolmentsubjects',
          templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolmentsubjects.html',
          controller: ''
        })
        .state('edit-enrolment.tab-statuses', {
          url: '/tab-statuses',
          templateUrl: '../views/enrolment/tabsEnrolment/tab_statuses.html',
          controller: ''
        });
    $urlRouterProvider.otherwise('/list-specoffer');
  })

  .config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  })

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.get = {
      'Authorization' : 'Basic YWRtaW46bmltZGE='
    };
  }]);
