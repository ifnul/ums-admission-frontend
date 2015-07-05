'use strict';

/*1) lister an event from personSelector directive
   (if peson ID change - get new list of person papers)
  2) get personPaperId from outside (ng-model) (if it's availible: e.g. enrolment are editing)
	 read person ID from attr and pass it to getPersonPapers Svc */

angular
  .module('admissionSystemApp')
  .directive('paperSelector', function () {

    paperSelectorDirectiveCtrl.$inject = ['$scope', 'getPersonPapersSvc', '$stateParams'];
    function paperSelectorDirectiveCtrl($scope, getPersonPapersSvc, $stateParams) {
      $scope.papertypeId = getPersonPapersSvc.getRightPapersTypes;

      $scope.parsePersonPaperId = function (personId, personPaperId) {
        getPersonPapersSvc.setRightPersonPapers(personId).then(function() {
          $scope.enrolment.personPaperId = personPaperId;
        });
      };

      $scope.$on('person-id-changed', function (event, args) { // (1)
        $scope.enrolment.personPaperId = undefined;
        $scope.personid = args.personId;
        getPersonPapersSvc.setRightPersonPapers(args.personId);
      });
    }

    return {
      templateUrl: '../views/directives/paperSelector.html',
      restrict: 'E',
      require: 'ngModel',
      replace: true,
      scope: {
        onNewPersonPaper: '&?'
      },
      controller: paperSelectorDirectiveCtrl,
      link: function postLink (scope, element, attrs, ngModel) {
        var personPaperId;

        scope.enrolment = {};
        ngModel.$render = function () { // (2)
          personPaperId = ngModel.$modelValue;
          scope.personid = attrs.personid;
          if (personPaperId) {
            scope.personid = attrs.personid;
            scope.parsePersonPaperId(scope.personid, personPaperId);
          }
        };



        if (attrs.personid) {
          scope.parsePersonPaperId(attrs.personid);
        }

        scope.paperSelected = function (personPaperId) {
          ngModel.$setViewValue(personPaperId);
        };
      }
    };
  });
