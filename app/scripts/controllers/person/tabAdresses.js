'use strict';

angular.module('admissionSystemApp')
	.controller('TabAdressesCtrl', ['$scope', 'DictionariesSvc',
		function ($scope, DictionariesSvc) {

			$scope.entirePerson.addresses = {
				regAddresses: {
					addressTypeId: 1
				},
				postAddresses: {
					addressTypeId: 2
				},
				isAdressesMatch: true
			};
			// uncomment it to check whether directive can receive adminUnitId and display it properly
			// $scope.entirePerson.addresses.regAddresses.adminUnitId = 1332;
			
			DictionariesSvc.getStreetsTypes().then(function (streetTypes) {
				$scope.streetsTypesOptions = streetTypes;
			});

		}]);
