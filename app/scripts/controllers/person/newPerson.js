'use strict';

angular.module('admissionSystemApp')
  .controller('NewPersonCtrl', ['$scope', '$stateParams', 'PersonModel', '$location',
    'DictionariesSvc', '$state', 'basePersonData', '$q', 'progressBarPersonSvc',
    function ($scope, $stateParams, PersonModel, $location, DictionariesSvc, $state, basePersonData, $q, progressBarPersonSvc) {


      $scope.person = PersonModel.personObj();
      $scope.contacts = PersonModel.contactsArr();
      $scope.addresses = PersonModel.addressesObj();
      $scope.names = PersonModel.namesArr();

      $q.all([
        DictionariesSvc.getPersonsTypes(),
        DictionariesSvc.getGenderTypes(),
        DictionariesSvc.getMarriedTypes(),
        DictionariesSvc.getAdminUnitsTypes(),
        DictionariesSvc.getAdminUnits({
          adminUnitTypeId: 6
        })
        , DictionariesSvc.getAdminUnitsTypes()
      ])
        .then(function (promisesResult) {
          $scope.personsTypes = promisesResult[0];
          $scope.person.personTypeId = promisesResult[0][0].id;
          $scope.genderTypes = promisesResult[1];
          $scope.marriedTypes = promisesResult[2];
          $scope.adminUnitsTypes = promisesResult[3];
          $scope.adminUnits = promisesResult[4];
          $scope.streetsTypesOptions = promisesResult[5];
        });

      /**
       * 1) !! if id was passed as a parameter to state - act as Person is browsing or editing
       * 2) !! else - act as new enrolment needed to be created
       */
      if ($stateParams.id) {
        PersonModel.getEntirePerson($stateParams.id).then(function (res) {
          $scope.person = PersonModel.personObj();
          $scope.contacts = PersonModel.contactsArr();
        });
      } else {
        PersonModel.clearCopy();
      }

      $scope.deletePerson = function () {
        PersonModel.deleteEntirePerson().then(function () {
          DictionariesSvc.clearStorageByRoute('persons');
          $state.go('root.person.list');
        });
      };

      $scope.sendToServerPerson = function () {
        console.log('$scope.person', $scope.person);
        console.log('$scope.names', $scope.names);
        console.log('$scope.addresses', $scope.addresses);
        console.log('$scope.contacts', $scope.contacts);
        //$scope.entirePerson.names[0].name = $scope.entirePerson.names[0].surname +
        //' ' + $scope.entirePerson.names[0].firstName +
        //' ' + $scope.entirePerson.names[0].fatherName;
        //$scope.entirePerson.person.name = $scope.entirePerson.person.surname +
        //' ' + $scope.entirePerson.person.firstName +
        //' ' + $scope.entirePerson.person.fatherName;

        //if (!$scope.entirePerson.person.photo) {
        //  $scope.entirePerson.person.photo = '/';
        //}
        //$scope.entirePerson.person.isMilitary = ($scope.entirePerson.person.isMilitary) ? 1 : 0;
        //$scope.entirePerson.person.isHostel = ($scope.entirePerson.person.isHostel) ? 1 : 0;
        //$scope.entirePerson.person.resident = ($scope.entirePerson.person.resident) ? 1 : 0;

        PersonModel.addOrEditPerson().then(function () {
          DictionariesSvc.clearStorageByRoute('persons');
          PersonModel.clearEntirePerson();

          /**
           * redirect to differend view depending on previous state.
           * if previous state was enrolment (new/edit) when go back to it
           */
          if ($stateParams.previousState) { // 3)
            $state.go($stateParams.previousState, {
              personId: $stateParams.id
            });
          } else {
            $state.go('root.person.list');
          }

        });
      };



      /**
       * disable tab "Предмети ЗНО" if there no in person paper with type "4"
       * @returns {boolean}
       */
      $scope.tabSubjDisabled = function () {
        return !PersonModel.papersArr().some(function (paper) {
          return paper.paperTypeId === 4;
        })
      };


      /**
       * on 'tab' click - change route (it leads to templete changing)
       * @param route {object}
       */
      $scope.gotToTab = function (route) {
        console.log(route);currentState = $state.current.name;
        if ($stateParams.id) {
          $state.go(route.edit, {
            id: $stateParams.id
          });
        } else {
          $state.go(route.new);
        }
      };

      $scope.personTabs = angular.copy(basePersonData.tabs);
      var currentState = $state.current.name;

      /**
       *set current tab to active while initializing a view
       */
      _.each($scope.personTabs, function (item) {
        item.active = $state.current.name === item.route.new || $state.current.name === item.route.edit;
      });
      // doind the same staff: needed to be chacked:
      //_.each($scope.personTabs, function(tab, index) {
      //  if (tab.route.new === currentState || tab.route.edit === currentState) {
      //    $scope.personTabs[index].active = true;
      //  }
      //});


      /**
       * on 'Далі' click - change route and set tab to active
       * @param nextOrPrev {int} - 1 or 2
       */
      $scope.goToNextTab = function(nextOrPrev) {
        var currentState = $state.current.name,
          nextroute;
        _.each($scope.personTabs, function(tab, index) {
          if (tab.route.new === currentState || tab.route.edit === currentState) {
            nextroute = $scope.personTabs[index + nextOrPrev].route;
            $scope.personTabs[index + nextOrPrev].active = true;
          }
        });
        $scope.gotToTab(nextroute);
      };



      progressBarPersonSvc.reset();
      $scope.$on('valBubble', function (evt, args) {
        console.log('buble!',args.name , args.isValid);
        progressBarPersonSvc.setValidity(args.name, args.isValid);
      });
    }]);
