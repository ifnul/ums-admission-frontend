'use strict';

angular.module('admissionSystemApp')
  .controller('tabProposalCtrl', ['$scope', 'DictionariesSvc', 'Cookies', '$q',
    function ($scope, DictionariesSvc, Cookies, $q) {


      $scope.entireSpecoffer.specoffer.timePeriodId = Cookies.getCookie('timeperiod');

      $q.all([
        DictionariesSvc.getAllDepartments({departmentTypeId: 1}),
        DictionariesSvc.getSpecoffersTypes(),
        DictionariesSvc.getEduformTypes(),
        DictionariesSvc.getTimePeriodCourseIds()
      ])
        .then(function (promisesResult) {
          $scope.departmentId = promisesResult[0];
          $scope.specofferTypesOptions = promisesResult[1];
          $scope.eduFormTypesOptions = promisesResult[2];
          $scope.timePeriodCourseId = promisesResult[3];
        });

  }]);
