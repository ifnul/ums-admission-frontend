'use strict';

angular.module('admissionSystemApp')
  .controller('TabAdressesCtrl', ['$scope', 'DictionariesSvc',
    function ($scope, DictionariesSvc) {

      DictionariesSvc.getStreetsTypes().then(function (streetTypes) {
        $scope.streetsTypesOptions = streetTypes;
      });

    }]);
