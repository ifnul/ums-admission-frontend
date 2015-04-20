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
			// personId
			// adminUnitId

			$scope.$watch('entirePerson.addresses', function(newVal) {
				console.log('entireSpecofferCopy watch', newVal);
			}, true);

			DictionariesSvc.getStreetsTypes().then(function (streetTypes) {
				$scope.streetsTypesOptions = streetTypes;
			});

		}]);
