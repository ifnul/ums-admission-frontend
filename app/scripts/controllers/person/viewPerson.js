'use strict';

angular.module('admissionSystemApp')
  .controller('ViewPersonCtrl', ['$scope', 'DictionariesSvc', '$q', '$stateParams', 'PersonModel', '$state',
    'basePersonData',
    function ($scope, DictionariesSvc, $q, $stateParams, PersonModel, $state, basePersonData) {


      // TODO: move model to PersonModel (don't forget template )
      $scope.entirePerson = {};
      $scope.entirePerson.contacts = [];
      $scope.entirePerson.papers = [];

      $scope.brosweOrEditPerson = function (personId) {
        PersonModel.getEntirePerson(personId).then(function (res) {
          _.merge($scope.entirePerson, res);
        });
      };

      $scope.brosweOrEditPerson($stateParams.id);

      $scope.personsTypes = [];
      $scope.genderTypes = [];
      $scope.marriedTypes = [];
      $scope.adminUnits = [];
      $scope.streetsTypes = [];

      function pushData(data, array) {
        angular.forEach(data, function (item) {
          array[item.id] = item.name;
        });
      }

      $q.all([
        DictionariesSvc.getPersonsTypes(),
        DictionariesSvc.getGenderTypes(),
        DictionariesSvc.getMarriedTypes(),
        DictionariesSvc.getAdminUnits({
          adminUnitTypeId: 6
        }),
        DictionariesSvc.getStreetsTypes()
      ])
        .then(function (res) {
          pushData(res[0], $scope.personsTypes);
          pushData(res[1], $scope.genderTypes);
          pushData(res[2], $scope.marriedTypes);
          pushData(res[3], $scope.adminUnits);
          pushData(res[4], $scope.streetsTypes);
        });

      $scope.personTabs = basePersonData.tabsView;

      $scope.go = function (route) {
        $state.go(route, {
          id: $stateParams.id
        });
      };

    }])

  .filter('checkmark', function () {
    return function (input) {
      return input ? '\u2713' : '\u2718';
    };
  });
