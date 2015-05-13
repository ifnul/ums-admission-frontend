'use strict';

angular.module('admissionSystemApp')
  .directive('personContacts', function ($state) {

    function changeView () {
      if ($state.includes('root.person.view.*')) {
        return '../views/directives/personViewContacts.html';
      } else {
        return '../views/directives/personContacts.html';
      }
    }

    return {
      restrict: 'E',
      templateUrl: changeView,
      require: 'ngModel',
      replace: false,
      scope: {},
      link: function (scope, element, attrs, ctrl) {

        scope.contacts = [];

        scope.$watch(function () {
          return ctrl.$modelValue;
        }, function (personContacts) {

          var i, j;

          for (i = 1; i < 9; i++) {
            for (j = 0; j < personContacts.length; j++) {
              if (personContacts[j].contactTypeId === i) {
                scope.contacts[i] = {
                  id: personContacts[j].id,
                  contactTypeId: i,
                  value: personContacts[j].value
                };
              }
            }
            if (!scope.contacts[i]) {
              scope.contacts[i] = {
                contactTypeId: i,
                value: ''
              };
            }
          }
        }, true);

        scope.$watch('contacts', function (newContacts) {
          ctrl.$setViewValue(newContacts.filter(function (contact) {
              return contact.value !== '';
            })
          );
        }, true);

      }
    };
  });
