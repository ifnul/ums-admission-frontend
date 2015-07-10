'use strict';

angular
  .module('admissionSystemApp')
  .directive('adminunitsSelector', ['DictionariesSvc', 'Restangular', 'translHttpStatusSvc',
    function (DictionariesSvc, Restangular, translHttpStatusSvc) {
      var rootId = 1;

      return {
        restrict: 'E',
        templateUrl: '../views/directives/adminunitsSelector.html',
        require: 'ngModel',
        replace: true,
        scope: {
          label: '@'
        },
        controller: adminunitsSelectorCtrl,
        link: function postLink(scope, element, attrs, ngModel) {

          ngModel.$render = function () {
            var unitId = ngModel.$modelValue;

            if (unitId) {
              scope.parseAdminUnit(unitId);
            } else {
              scope.selectUnit(0, rootId);
            }
          };

          scope.sendValueOutside = function (value) {
            ngModel.$setViewValue(value);
          };

        }
      };

      adminunitsSelectorCtrl.$inject = ['$scope', '$q', 'DictionariesSvc'];

      function adminunitsSelectorCtrl($scope, $q, DictionariesSvc) {
        $scope.adminUnits = [];
        $scope.selected = [];

        $scope.selectUnit = function (index, id) {
          $scope.adminUnits.splice(index + 1, $scope.adminUnits.length - index);

          DictionariesSvc.getAdminUnits({parentId: id})
            .then(function (units) {
              if (units.length) {
                $scope.adminUnits.push(units);
              } else {
                console.log(id);
                $scope.sendValueOutside(id);
              }
            });
        };

        $scope.parseAdminUnit = function (id) {

          function loadAdminUnit(id, list) {
            list = list || [];

            return Restangular
              .one('adminunits', id)
              .get()
              .then(function (item) {
                list.unshift(item.id);

                if (item.parentId && item.parentId !== rootId) {
                  return loadAdminUnit(item.parentId, list);
                } else {
                  return list;
                }
              }, translHttpStatusSvc.notifyAboutError);
          }

          return loadAdminUnit(id).then(function (items) {
            var promises = [];

            $scope.adminUnits = [];
            $scope.selected = items;

            angular.forEach(items, function (item, index) {
              promises.push(DictionariesSvc
                .getAdminUnits({parentId: index > 0 ? items[index - 1] : rootId})
                .then(function (units) {
                  $scope.adminUnits[index] = units
                }));
            });

            return $q.all(promises);
          })
        }
      }
    }]);
