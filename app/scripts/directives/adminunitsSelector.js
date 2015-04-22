'use strict';

angular.module('admissionSystemApp')
  .directive('adminunitsSelector', function (DictionariesSvc, Restangular) {

  	function adminunitsSelectorCtrl ($scope, DictionariesSvc) {

  		$scope.wholeAdress = [];
	   	$scope.adminUnitId = {};

	   	Restangular.one('adminunits', 1).get().then(function (country) {
	  		$scope.adminunits = [country];
	  	});

	   	// clear out adminutins 
  		$scope.clearAdress = function () {
	   		Restangular.one('adminunits', 1).get().then(function (country) {
	  			$scope.adminunits = [country];
	  		});
	  		$scope.wholeAdress.length = 0;
	  		$scope.adminUnitId.selected = undefined;
	  		$scope.disabled = false;
  		};

  		// upload new adminunit on-select event
  		$scope.adminUtinSelected = function (model, item) {
  			$scope.wholeAdress.push(item.name);
	  		DictionariesSvc.getAdminUnits({parentId: model}).then(function (adminunits) {
	  			if (adminunits.length < 1) {
	  				$scope.disabled = true;
	  				$scope.sendValueOutside($scope.adminunits[0].id);
	  			} else {
	  				$scope.adminunits = adminunits;
	  			}
	  		});
  		};

  		// make directive receive adminUnit id from outside and parse to html
  		$scope.parseAdminUnit = function (id) {
        $scope.disabled = true;
        var i = 0;
			  Restangular.one('adminunits', id).get().then(function callBack (adminunits) {
			  	i++;
			  	if (adminunits.parentId) {
			  		$scope.wholeAdress.unshift(adminunits.name);
			  		Restangular.one('adminunits', adminunits.parentId).get().then(callBack); 		
			  	} 
			  	if (i === 1) {
						$scope.adminUnitId.selected = adminunits;
			  	}
			  });
  		};
  	}

    return {
      restrict: 'E',
      templateUrl: '../views/directives/adminunitsSelector.html',
      require: 'ngModel',
      replace: true,
      scope: {},
      controller: adminunitsSelectorCtrl,
      link: function postLink(scope, element, attrs, ngModel) {

        ngModel.$render = function() {
          var adminUnitId = ngModel.$modelValue;
          if (adminUnitId) {
          	scope.parseAdminUnit(adminUnitId);
          }
        };

      	scope.sendValueOutside = function (value) {
					ngModel.$setViewValue(value);
      	};

      }
    };
  });
