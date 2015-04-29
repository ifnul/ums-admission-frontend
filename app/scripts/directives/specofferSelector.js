'use strict';

angular
  .module('admissionSystemApp')
  .directive('specofferSelector', function () {

    specofferSelectorDirectiveCtrl.$inject = ['$scope', '$modal', 'DictionariesSvc', 'decodeSpecofferSvc', 'Restangular'];
    function specofferSelectorDirectiveCtrl ($scope, $modal, DictionariesSvc, decodeSpecofferSvc, Restangular) {
      $scope.searchBy = {};
      var modalInstance;

      $scope.openModalSpecoffer = function (size) {
        modalInstance = $modal.open({
          templateUrl: '../views/modal/modalChooser.html',
          size: size,
          scope: $scope
        });
        startSearchSpecoffers();
      };

      function startSearchSpecoffers () {
        DictionariesSvc.getAllSpecoffers($scope.searchBy).then(function (rawSpecoffer) {
          decodeSpecofferSvc.specofferDecoded(rawSpecoffer).then(function (decodedSpecoffer) {
            $scope.data = decodedSpecoffer;
          });
        });
      }

      $scope.ok = function (obj) {
        modalInstance.close();
        $scope.selected = [obj];
        $scope.sendValueOutside(obj.id);
      };

      $scope.cancel = function () {
        modalInstance.dismiss('cancel');
      };

      $scope.parseSpecOffer = function (specOfferId) {
        Restangular.one('specoffers', specOfferId).get().then(function (rawSpecOffer) {
          decodeSpecofferSvc.specofferDecoded([rawSpecOffer]).then(function (decodedSpecoffer) {
            $scope.selected = decodedSpecoffer;
          });
        });
      };

    }

    return {
      restrict: 'E',
      templateUrl: '../views/directives/specofferSelector.html',
      require: 'ngModel',
      replace: true,
      scope: {
        departments: '=?',
        specoffertypes: '=?',
        headers: '=?'
      },
      controller: specofferSelectorDirectiveCtrl,
      link: function postLink (scope, element, attrs, ngModel) {
        var specOfferId;

        ngModel.$render = function () {
          specOfferId = ngModel.$modelValue;
          if (specOfferId) {
            scope.parseSpecOffer(specOfferId);
          }
        };

        scope.sendValueOutside = function (value) {
          ngModel.$setViewValue(value);
        };
      }
    };
  });
