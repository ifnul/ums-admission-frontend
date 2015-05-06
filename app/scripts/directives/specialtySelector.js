'use strict';

angular.module('admissionSystemApp')
  .directive('specialtySelector', function ($modal, SpecialtiesSvc) {

    return {
      restrict: 'E',
      templateUrl: '../views/directives/specialtySelector.html',
      require: 'ngModel',
      replace: true,
      scope: {},
      link: function (scope, element, attrs, ctrl) {
        element.find('input:eq(0)').attr('id', attrs.id);
        element.removeAttr('id');

        ctrl.$render = function () {
          var specialtyId = ctrl.$modelValue;

          if (specialtyId) {
            SpecialtiesSvc.searchSpecialty(specialtyId).then(function (data) {
              scope.cipher = data.cipher;
              scope.name = data.name;
            });
          }
        };

        var modalInstance;

        scope.openModalSpecialty = function (size) {
          modalInstance = $modal.open({
            templateUrl: '../views/modal/modalSpecialty.html',
            size: size,
            scope: scope
          });

          if (scope.cipher) {
            SpecialtiesSvc.searchSpecialtyById(scope.cipher).then(function (data) {
              scope.results = data;
            });
          } else if (scope.name) {
            SpecialtiesSvc.searchSpecialtyByName(scope.name).then(function (data) {
              scope.results = data;
            });
          }
        };

        scope.ok = function (selectedItem) {
          modalInstance.close();
          ctrl.$setViewValue(selectedItem.id);
          scope.cipher = selectedItem.cipher;
          scope.name = selectedItem.name;
        };

        scope.cancel = function () {
          modalInstance.dismiss('cancel');
        };

      }
    };

  });
