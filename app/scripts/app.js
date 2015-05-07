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
    'checklist-model',
    'toaster',
    'ngAnimate'
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
      .state('dictionaries', {
        url: '/dictionaries',
        templateUrl: 'views/dictionaries.html',
        controller: 'dictionaryCtrl'
      })

      //////////////////////////////////////////////////////////
      // ----------------PERSONS-----------------------------///
      //////////////////////////////////////////////////////////
      .state('person', {
        url: '/person',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('person.list', {
        url: '/list?count',
        templateUrl: '../views/person/list_person.html',
        controller: 'ListPersonCtrl'
      })
    /** ----- new person ----- **/
      .state('person.new', {
        url: '/new',
        templateUrl: '../views/person/new_person.html',
        controller: 'NewPersonCtrl'
      })
      .state('person.new.main', {
        url: '/main',
        templateUrl: '../views/person/tabsPerson/tab_person.html',
        controller: 'TabPersonCtrl'
      })
      .state('person.new.addresses', {
        url: '/addresses',
        templateUrl: '../views/person/tabsPerson/tab_addresses.html',
        controller: 'TabAdressesCtrl'
      })
      .state('person.new.contacts', {
        url: '/contacts',
        templateUrl: '../views/person/tabsPerson/tab_contacts.html',
        controller: ''
      })
      .state('person.new.papers', {
        url: '/papers',
        templateUrl: '../views/person/tabsPerson/tab_papers.html',
        controller: ''
      })
      .state('person.new.personsubjects', {
        url: '/personsubjects',
        templateUrl: '../views/person/tabsPerson/tab_personsubjects.html',
        controller: 'tabSubjects'
      })
      .state('person.new.enrolments', {
        url: '/enrolments',
        templateUrl: '../views/person/tabsPerson/tab_enrolments.html',
        controller: 'TabPersonEnrolmentsCtrl'
      })
    /** ----- edit person ----- **/
      .state('person.edit', {
        url: '/edit/:id',
        templateUrl: '../views/person/new_person.html',
        controller: 'NewPersonCtrl'
      })
      .state('person.edit.main', {
        url: '/main',
        templateUrl: '../views/person/tabsPerson/tab_person.html',
        controller: 'TabPersonCtrl'
      })
      .state('person.edit.addresses', {
        url: '/addresses',
        templateUrl: '../views/person/tabsPerson/tab_addresses.html',
        controller: 'TabAdressesCtrl'
      })
      .state('person.edit.contacts', {
        url: '/contacts',
        templateUrl: '../views/person/tabsPerson/tab_contacts.html',
        controller: ''
      })
      .state('person.edit.papers', {
        url: '/papers',
        templateUrl: '../views/person/tabsPerson/tab_papers.html',
        controller: ''
      })
      .state('person.edit.personsubjects', {
        url: '/personsubjects',
        templateUrl: '../views/person/tabsPerson/tab_personsubjects.html',
        controller: 'tabSubjects'
      })
      .state('person.edit.enrolments', {
        url: '/enrolments',
        templateUrl: '../views/person/tabsPerson/tab_enrolments.html',
        controller: 'TabPersonEnrolmentsCtrl'
      })
    /** ----- view person ----- **/
      .state('person.view', {
        url: '/view/:id',
        templateUrl: '../views/person/view_person.html',
        controller: 'ViewPersonCtrl'
      })
      .state('person.view.main', {
        url: '/main',
        templateUrl: '../views/person/tabsPerson/tab_viewPerson.html',
        controller: ''
      })
      .state('person.view.enrolments', {
        url: '/enrolments',
        templateUrl: '../views/person/tabsPerson/tab_enrolments.html',
        controller: 'TabPersonEnrolmentsCtrl'
      })
      //////////////////////////////////////////////////////////
      // ----------------ENROLMENTS--------------------------///
      //////////////////////////////////////////////////////////
      .state('enrolment', {
        url: '/enrolment',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('enrolment.list', {
        url: '/list?count',
        templateUrl: '../views/enrolment/list_enrolments.html',
        controller: 'ListEnrolmentsCtrl'
      })
    /** ----- new enrolment ----- **/
      .state('enrolment.new', {
        url: '/new',
        templateUrl: '../views/enrolment/new_enrolment.html',
        controller: 'NewEnrolmentCtrl'
      })
      .state('enrolment.new.main', {
        url: '/main',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolment.html',
        controller: 'TabEnrolmentCtrl',
        params: {
          personId: null
        }
      })
      .state('enrolment.new.benefits', {
        url: '/benefits',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_benefits.html',
        controller: ''
      })
      .state('enrolment.new.enrolmentsubjects', {
        url: '/enrolmentsubjects',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolmentsubjects.html',
        controller: ''
      })
      .state('enrolment.new.statuses', {
        url: '/statuses',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_statuses.html',
        controller: ''
      })
    /** ----- edit enrolment ----- **/
      .state('enrolment.edit', {
        url: '/edit/:id',
        templateUrl: '../views/enrolment/new_enrolment.html',
        controller: 'NewEnrolmentCtrl'
      })
      .state('enrolment.edit.main', {
        url: '/main',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolment.html',
        controller: 'TabEnrolmentCtrl'
      })
      .state('enrolment.edit.benefits', {
        url: '/benefits',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_benefits.html',
        controller: ''
      })
      .state('enrolment.edit.enrolmentsubjects', {
        url: '/enrolmentsubjects',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolmentsubjects.html',
        controller: ''
      })
      .state('enrolment.edit.statuses', {
        url: '/statuses',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_statuses.html',
        controller: ''
      });
    $urlRouterProvider
      .when('/person', '/person/list')
      .when('/enrolment', '/enrolment/list')
      .otherwise('/list-specoffer');
  })

  .config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  })

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.get = {
      'Authorization': 'Basic YWRtaW46bmltZGE='
    };
  }]);
