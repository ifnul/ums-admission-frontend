'use strict';

angular.module('admissionSystemApp')
  .directive('specialtySelector', function ($modal, SpecialtyGettingService) {

    var modalCtrl = function (SpecialtyGettingService, $scope, $modalInstance, id, name) {

      $scope.selected = {};

      if (id) {
        SpecialtyGettingService.searchSpecialtyById(id).then(function (data) {
          $scope.results = data;

          $scope.selected = {
            result: $scope.results[0]
          };
        });
      } else if (name) {
        SpecialtyGettingService.searchSpecialtyByName(name).then(function (data) {
          $scope.results = data;

          $scope.selected = {
            result: $scope.results[0]
          };
        });
      }

      $scope.ok = function () {
        $modalInstance.close($scope.selected.result);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    };

    return {
      restrict: 'E',
      templateUrl: '../views/directives/specialtySelector.html',
      require: 'ngModel',
      replace: true,
      scope: {},
      link: function (scope, element, attrs, ctrl) {
        element.find('input:eq(0)').attr('id', attrs.id);
        element.removeAttr('id');

        ctrl.$render = function() {
          var specialtyId = ctrl.$modelValue;

          if (specialtyId) {
            SpecialtyGettingService.searchSpecialty(specialtyId).then(function (data) {
              scope.cipher = data.cipher;
              scope.name = data.name;
            });
          }
        };


        scope.openModalSpecialty = function (size) {
          var modalInstance = $modal.open({
            templateUrl: '../views/modal/modalSpecialty.html',
            controller: modalCtrl,
            size: size,
            resolve: {
              id: function () {
                return scope.cipher;
              },
              name: function () {
                return scope.name;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            ctrl.$setViewValue(selectedItem.id);
            scope.cipher = selectedItem.cipher;
            scope.name = selectedItem.name;
          });

        };
      }
    };

  });
