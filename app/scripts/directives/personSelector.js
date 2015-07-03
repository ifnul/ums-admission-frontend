'use strict';

/* 1) pass selected obj (person id) to view;
    2) send selected obj (person id) id to ng-model;
    3) broadcast that another\new person has choosen by user */

angular
.module('admissionSystemApp')
  .directive('personSelector', function () {

    personSelectorDirectiveCtrl.$inject = ['$scope', '$modal', '$rootScope', 'searchPersonSvc'];
    function personSelectorDirectiveCtrl ($scope, $modal, $rootScope, searchPersonSvc) {
      $scope.data = searchPersonSvc.searchResult;
      $scope.selected = searchPersonSvc.selectedPerson;

      var modalInstance;

      $scope.openModalPeson = function (size) {
        modalInstance = $modal.open({
          templateUrl: '../views/modal/modalChooser.html',
          size: size,
          scope: $scope
        });
        $scope.modalTitle = 'Оберіть персону';
        searchPersonSvc.searchPersons($scope.querySearchBy, $scope.fieldSearchBy.property, $scope.fieldSearchBy.route);
      };


      $scope.ok = function (obj) {
        modalInstance.close();
        if (obj) {
          $scope.selected = [obj]; // (1)
          $scope.sendValueOutside(obj.id); // (2)
          $rootScope.$broadcast('person-id-changed', {
            personId: obj.id
          }); // (3)
        }
      };

      $scope.cancel = function () {
        modalInstance.dismiss('cancel');
      };

      $scope.parsePerson = function (personId) {
        searchPersonSvc.parseSinglePersons(personId);
      };
    }

    return {
      restrict: 'E',
      templateUrl: '../views/directives/personSelector.html',
      require: 'ngModel',
      replace: true,
      scope: {
        search: '=',
        headers: '='
      },
      controller: personSelectorDirectiveCtrl,
      link: function postLink (scope, element, attrs, ngModel) {
        var personId;

        ngModel.$render = function () {
          personId = ngModel.$modelValue;
          if (personId) {
            scope.parsePerson(personId);
          }
        };

        scope.sendValueOutside = function (value) {
          ngModel.$setViewValue(value);
        };
      }
    };
  });

