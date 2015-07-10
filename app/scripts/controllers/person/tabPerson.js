'use strict';

angular.module('admissionSystemApp')
  .controller('TabPersonCtrl', ['$scope', 'DictionariesSvc', '$q', '$filter', 'PersonModel',
    function ($scope, DictionariesSvc, $q, $filter, PersonModel) {

      $scope.$watch('person', function (newVal) {
        console.log("enrolment:", newVal);
      });

      $scope.person = PersonModel.personObj();
      $scope.names = PersonModel.namesArr();
      //$scope.person.begDate = $filter('date')($scope.person.begDate, 'yyyy-MM-dd');
  }]);
