'use strict';

/*
  1) clear out adminutins and set root adminuin - country
  2) upload new adminunit on-select event
  3) make directive receive adminUnit id from outside and parse to html
 */

angular
.module('admissionSystemApp')
  .directive('adminunitsSelector', function (DictionariesSvc, Restangular) {

    function adminunitsSelectorCtrl ($scope, DictionariesSvc) {

      $scope.wholeAdress = [];
      $scope.adminUnitId = {};

      Restangular.one('adminunits', 1).get().then(function (country) {
        $scope.adminunits = [country];
      });

      $scope.clearAdress = function () { // (1)
        Restangular.one('adminunits', 1).get().then(function (country) {
          $scope.adminunits = [country];
        });
        $scope.wholeAdress.length = 0;
        $scope.adminUnitId.selected = undefined;
        $scope.disabled = false;
      };

      $scope.adminUtinSelected = function (model, item) { // (2)
        $scope.wholeAdress.push(item.name);
        $scope.sendValueOutside(item.id);
        DictionariesSvc.getAdminUnits({
          parentId: model
        }).then(function (adminunits) {
          if (adminunits.length < 1) {
            $scope.disabled = true;
          } else {
            $scope.adminunits = adminunits;
          }
        });
      };

      $scope.parseAdminUnit = function (id) { // (3)
        $scope.disabled = true;
        var i = 0;

        Restangular.one('adminunits', id).get().then(function callBack (adminunits) {
          i++;
          if (adminunits.parentId) {
            $scope.wholeAdress.unshift(adminunits.name);
            Restangular.one('adminunits', adminunits.parentId).get().then(callBack);
          }
          if (i === 1) {
            $scope.adminUnitId.selected = adminunits;
          }
        });
      };
    }

    return {
      restrict: 'E',
      templateUrl: '../views/directives/adminunitsSelector.html',
      require: 'ngModel',
      replace: true,
      scope: {},
      controller: adminunitsSelectorCtrl,
      link: function postLink (scope, element, attrs, ngModel) {
        var adminUnitId;

        ngModel.$render = function () {
          adminUnitId = ngModel.$modelValue;
          if (adminUnitId) {
            scope.parseAdminUnit(adminUnitId);
          }
        };

        scope.sendValueOutside = function (value) {
          ngModel.$setViewValue(value);
        };

      }
    };
  });
