'use strict';

angular.module('admissionSystemApp')
  .directive('personSelector', function () {

  	function personSelectorDirectiveCtrl ($scope, $modal, DictionariesSvc, personDecodeSvc) {
  		
  		var modalInstance;
	    $scope.openModalSpecialty = function (size) {
	      modalInstance = $modal.open({
	        templateUrl: '../views/modal/modalPersonChooser.html',
	        size: size,
	        scope:$scope
	      });

	      var params = {};

	      params[$scope.fieldSearchBy.property] = $scope.querySearchBy;
	      console.log('params', params);

	      DictionariesSvc.getPersons(params).then(function (rawPersons) {
	      	personDecodeSvc.personDecoded(rawPersons).then(function (personsDecoded) {
	      		$scope.data = personsDecoded;
	      		console.log('$scope.data', $scope.data);
	      	});
	      	
	      	
	      });
	    };

	    // DictionariesSvc.getPersons({property: string})
	    // DictionariesSvc.getAllPapers({})
			

      $scope.ok = function (obj) {
        modalInstance.close();
        $scope.selected = obj;
        console.log('$scope.selected', $scope.selected);
      };
	    $scope.cancel = function () {
	      modalInstance.dismiss('cancel');

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
      link: function postLink(scope, element, attrs, ngModel) {
      	 
      	 var personId = ngModel.$modelValue;
      	 console.log('personId', personId);

      }
    };
  });

