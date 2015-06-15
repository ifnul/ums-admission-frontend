'use strict';

/**
 * @ngdoc directive
 * @name admissionSystemApp.directive:validator
 * @description
 * # validator
 */
angular.module('admissionSystemApp')
  .directive('valBubble', function (formHelper, progressBarService) {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {

        if (!attr.name) {
          throw 'valBubble must be set on an input element that has a \'name\' attribute';
        }

        var currentForm = formHelper.getCurrentForm(scope);

        if (!currentForm || !currentForm.$name) {
          throw 'valBubble requires that a name is assigned to the ng-form containing the validated input';
        }
        //watch the current form's validation for the current field name
        scope.$watch(currentForm.$name + '.' + ctrl.$name + '.$valid', function (isValid) {
          if (isValid !== undefined) {
            //emit an event upwards
            scope.$emit('valBubble', {
              isValid: isValid,       // if the field is valid
              name: ctrl.$name,
              element: element,       // the element that the validation applies to
              expression: this.exp,   // the expression that was watched to check validity
              scope: scope,           // the current scope
              ctrl: ctrl              // the current controller
            });
          }
        });
      }
    };
  })

  .factory('formHelper', function () {
    return {
      getCurrentForm: function (scope) {
        var form = null,
          p,
          props,
          requiredFormProps = ['$error', '$name', '$dirty', '$pristine', '$valid', '$invalid', '$addControl',
            '$removeControl', '$setValidity', '$setDirty'],
          ifContains = function (item) {
            return _.contains(props, item);
          };
        for (p in scope) {
          if (_.isObject(scope[p]) && !_.isFunction(scope[p]) && !_.isArray(scope[p]) && p.substr(0, 1) !== '$') {
            props = _.keys(scope[p]);
            if (props.length < requiredFormProps.length) {
              continue;
            }
            if (_.every(requiredFormProps, ifContains)) {
              form = scope[p];
              break;
            }
          }
        }
        return form;
      }
    };
  });

