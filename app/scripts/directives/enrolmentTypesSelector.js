/**
 * Created by nikolay on 05.07.15.
 */

'use strict';

/**
 * @param enrolmentTypes
 * 'Тип вступу' and 'Деталiзацiя вступу'
 * 1) case if editing enrolment (has existing data)
 */

angular
  .module('admissionSystemApp')
  .directive('enrolmentTypesSelector', function () {

    enrolmentTypesSelectorDirectiveCtrl.$inject = ['$scope', 'DictionariesSvc'];
    function enrolmentTypesSelectorDirectiveCtrl($scope, DictionariesSvc) {

      $scope.manageEnrolmentTypes = function(isEditing) {
        $scope.enrolmentTypes = {};
        DictionariesSvc.getEnrolmentsTypes().then(function(enrolmentTypes) {
          $scope.chiefEnrolTypes = _.filter(enrolmentTypes, function (n) {
            return !n.parentId;
          });

          $scope.updateChildsEnrolTypes = function (chiefID) {
            $scope.enrolmentTypeId = undefined;
            $scope.childEnrolTypes = _.filter(enrolmentTypes, function (n) {
              return n.parentId === chiefID;
            });
          };

          if (isEditing) {
            var currentChild = _.filter(enrolmentTypes, {
              id: $scope.enrolmentTypeId
            });
            $scope.enrolmentTypes.chiefs = currentChild[0].parentId;
            $scope.childEnrolTypes = _.filter(enrolmentTypes, function (n) {
              return n.parentId === $scope.enrolmentTypes.chiefs;
            });
          }

        });
      }

    }

    return {
      templateUrl: '../views/directives/enrolmentTypesSelector.html',
      restrict: 'E',
      require: 'ngModel',
      replace: true,
      scope: {},
      controller: enrolmentTypesSelectorDirectiveCtrl,
      link: function postLink (scope, element, attrs, ngModel) {


        var enrolmentTypeId;
        ngModel.$render = function () {
          enrolmentTypeId = ngModel.$modelValue;
          console.log('enrolmentTypeId', enrolmentTypeId);
          if (enrolmentTypeId) {
            scope.enrolmentTypeId = enrolmentTypeId;
            console.log('scope.manageEnrolmentTypes(true)');
            scope.manageEnrolmentTypes(true);
          } else {
            scope.manageEnrolmentTypes();
          }
        };

        scope.enrolmentTypeIdSelected = function (enrolmentTypeId) {
          ngModel.$setViewValue(enrolmentTypeId);
        };

      }
    };
  });
