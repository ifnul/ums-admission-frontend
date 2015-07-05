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
    'checklist-model',
    'toaster',
    'ngAnimate',
    'ngStorage',
    'brantwills.paging'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('root', {
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: '../views/header.html',
            controller: 'HeaderCtrl as header'
          }
        }
      })
      .state('root.signin', {
        url: '/signin',
        views: {
          'header@': {
            template: ''
          },
          'container@': {
            templateUrl: '../views/signin.html',
            controller: 'SigninCtrl as signin'
          }
        }
      })
      //////////////////////////////////////////////////////////
      // ----------------specoffer-----------------------------///
      //////////////////////////////////////////////////////////
      .state('root.specoffer', {
        url: '/specoffer',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('root.specoffer.list', {
        url: '/list',
        views: {
          'container@': {
            templateUrl: '../views/specoffer/list_specoffer.html',
            controller: 'ListSpecofferCtrl'
          }
        }
      })
    /** ----- adding new specoffer ----- **/
      .state('root.specoffer.new', {
        url: '/specoffer/new',
        views: {
          'container@': {
            templateUrl: '../views/specoffer/new_specoffer.html',
            controller: 'NewSpecofferCtrl'
          }
        }
      })
      .state('root.specoffer.new.main', {
        url: '/',
        templateUrl: '../views/specoffer/tabsSpecoffer/tab_specoffer.html',
        controller: 'NewSpecofferCtrl'
      })
      .state('root.specoffer.new.subjects', {
        url: '/subjects',
        templateUrl: '../views/specoffer/tabsSpecoffer/tab_subject.html',
        controller: 'TabSubjectCtrl'
      })
      .state('root.specoffer.new.benefit', {
        url: '/benefit',
        templateUrl: '../views/specoffer/tabsSpecoffer/tab_benefit.html',
        controller: 'TabBenefitCtrl'
      })
      .state('root.specoffer.new.waves', {
        url: '/waves',
        templateUrl: '../views/specoffer/tabsSpecoffer/tab_waves.html',
        controller: 'TabWavesCtrl'
      })

    /** ----- edit specoffer ----- **/


      .state('root.specoffer.edit', {
        url: '/edit/:id',
        views: {
          'container@': {
            templateUrl: '../views/specoffer/new_specoffer.html',
            controller: 'NewSpecofferCtrl'
          }
        }
      })
      .state('root.dictionaries', {
        url: '/dictionaries',
        views: {
          'container@': {
            templateUrl: 'views/dictionaries.html',
            controller: 'dictionaryCtrl'
          }
        }
      })
      .state('root.statistics', {
        url: '/statistics',
        views: {
          'container@': {
            templateUrl: 'views/statistics.html',
            controller: 'StatisticsCtrl'
          }
        }
      })

      .state('root.specoffer.edit.main', {
        url: '/main',
        templateUrl: '../views/specoffer/tabsSpecoffer/tab_specoffer.html',
        controller: 'NewSpecofferCtrl'
      })
      .state('root.specoffer.edit.subjects', {
        url: '/subjects',
        templateUrl: '../views/specoffer/tabsSpecoffer/tab_subject.html',
        controller: 'TabSubjectCtrl'
      })
      .state('root.specoffer.edit.benefit', {
        url: '/benefit',
        templateUrl: '../views/specoffer/tabsSpecoffer/tab_benefit.html',
        controller: 'TabBenefitCtrl'
      })
      .state('root.specoffer.edit.waves', {
        url: '/waves',
        templateUrl: '../views/specoffer/tabsSpecoffer/tab_waves.html',
        controller: 'TabWavesCtrl'
      })

      //////////////////////////////////////////////////////////
      // ----------------PERSONS-----------------------------///
      //////////////////////////////////////////////////////////
      .state('root.person', {
        url: '/person',
        abstract: true
        // template: '<div ui-view="container"></div>'
      })
      .state('root.person.list', {
        url: '/list',
        views: {
          'container@': {
            templateUrl: '../views/person/list_person.html',
            controller: 'ListPersonCtrl'
          }
        }
      })
    /** ----- person view----- **/
      .state('root.person.view', {
        url: '/view/:id',
        views: {
          'container@': {
            templateUrl: '../views/person/view_person.html',
            controller: 'ViewPersonCtrl'
          }
        }
      })
      .state('root.person.view.main', {
        url: '/main',
        templateUrl: '../views/person/tabsPerson/tab_viewPerson.html',
        controller: 'ViewPersonCtrl'
      })
      .state('root.person.view.papers', {
        url: '/papers',
        templateUrl: '../views/person/tabsPerson/tab_papers.html',
        controller: 'tabPersonPapers'
      })
      .state('root.person.view.enrolments', {
        url: '/enrolments',
        templateUrl: '../views/person/tabsPerson/tab_enrolments.html',
        controller: 'TabPersonEnrolmentsCtrl'
      })
    /** ----- new person ----- **/
      .state('root.person.new', {
        url: '/new',
        views: {
          'container@': {
            templateUrl: '../views/person/new_person.html',
            controller: 'NewPersonCtrl'
          }
        }
      })
      .state('root.person.new.main', {
        url: '/main',
        templateUrl: '../views/person/tabsPerson/tab_person.html',
        controller: 'TabPersonCtrl'
      })
      .state('root.person.new.addresses', {
        url: '/addresses',
        templateUrl: '../views/person/tabsPerson/tab_addresses.html',
        controller: 'TabAdressesCtrl'
      })
      .state('root.person.new.contacts', {
        templateUrl: '../views/person/tabsPerson/tab_contacts.html',
        controller: ''
      })
      .state('root.person.new.papers', {
        url: '/papers',
        templateUrl: '../views/person/tabsPerson/tab_papers.html',
        controller: 'tabPersonPapers'
      })
      .state('root.person.new.personsubjects', {
        url: '/personsubjects',
        templateUrl: '../views/person/tabsPerson/tab_personsubjects.html',
        controller: 'tabSubjects'
      })
      .state('root.person.new.enro  lments', {
        url: '/enrolments',
        templateUrl: '../views/person/tabsPerson/tab_enrolments.html',
        controller: 'TabPersonEnrolmentsCtrl'
      })
    /** ----- edit person ----- **/
      .state('root.person.edit', {
        url: '/edit/:id',
        views: {
          'container@': {
            templateUrl: '../views/person/new_person.html',
            controller: 'NewPersonCtrl'
          }
        }
      })
      .state('root.person.edit.main', {
        url: '/main',
        templateUrl: '../views/person/tabsPerson/tab_person.html',
        controller: 'TabPersonCtrl'
      })
      .state('root.person.edit.addresses', {
        url: '/addresses',
        templateUrl: '../views/person/tabsPerson/tab_addresses.html',
        controller: 'TabAdressesCtrl'
      })
      .state('root.person.edit.contacts', {
        url: '/contacts',
        templateUrl: '../views/person/tabsPerson/tab_contacts.html',
        controller: ''
      })
      .state('root.person.edit.papers', {
        url: '/papers',
        templateUrl: '../views/person/tabsPerson/tab_papers.html',
        controller: 'tabPersonPapers'
      })
      .state('root.person.edit.personsubjects', {
        url: '/personsubjects',
        templateUrl: '../views/person/tabsPerson/tab_personsubjects.html',
        controller: 'tabSubjects'
      })
      .state('root.person.edit.enrolments', {
        url: '/enrolments',
        templateUrl: '../views/person/tabsPerson/tab_enrolments.html',
        controller: 'TabPersonEnrolmentsCtrl'
      })

      //////////////////////////////////////////////////////////
      // ----------------ENROLMENTS--------------------------///
      //////////////////////////////////////////////////////////
      .state('root.enrolment', {
        url: '/enrolment',
        abstract: true
      })
      .state('root.enrolment.list', {
        url: '/list',
        views: {
          'container@': {
            templateUrl: '../views/enrolment/list_enrolments.html',
            controller: 'ListEnrolmentsCtrl'
          }
        }
      })
    /** ----- new enrolment ----- **/
      .state('root.enrolment.new', {
        url: '/new',
        views: {
          'container@': {
            templateUrl: '../views/enrolment/new_enrolment.html',
            controller: 'NewEnrolmentCtrl'
          }
        },
        //abstract: true,
        params: {
          personId: null,
          previousState: null
        }
      })
      .state('root.enrolment.new.main', {
        url: '/main',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolment.html',
        controller: 'TabEnrolmentCtrl',
        params: {
          personId: null
        }
      })
      .state('root.enrolment.new.benefits', {
        url: '/benefits',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_benefits.html',
        controller: ''
      })
      .state('root.enrolment.new.enrolmentsubjects', {
        url: '/enrolmentsubjects',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolmentsubjects.html',
        controller: 'enrolmentSubjects'
      })
      .state('root.enrolment.new.statuses', {
        url: '/statuses',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_statuses.html',
        controller: 'TabStatesCtrl'
      })
    /** ----- edit enrolment ----- **/
      .state('root.enrolment.edit', {
        url: '/edit/:id',
        views: {
          'container@': {
            templateUrl: '../views/enrolment/new_enrolment.html',
            controller: 'NewEnrolmentCtrl'
          }
        }
      })
      .state('root.enrolment.edit.main', {
        url: '/main',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolment.html',
        controller: 'TabEnrolmentCtrl'
      })
      .state('root.enrolment.edit.benefits', {
        url: '/benefits',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_benefits.html',
        controller: ''
      })
      .state('root.enrolment.edit.enrolmentsubjects', {
        url: '/enrolmentsubjects',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_enrolmentsubjects.html',
        controller: ''
      })
      .state('root.enrolment.edit.statuses', {
        url: '/statuses',
        templateUrl: '../views/enrolment/tabsEnrolment/tab_statuses.html',
        controller: 'TabStatesCtrl'
      });
    $urlRouterProvider
      .when('/person', '/person/list')
      .when('/enrolment', '/enrolment/list')
      .otherwise('/signin');
  })

  .config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  });
