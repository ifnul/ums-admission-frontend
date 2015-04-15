'use strict';

angular.module('admissionSystemApp')
.controller('TabAdressesCtrl', function ($scope) {

	$scope.entirePerson.addresses = { 
		regAddresses: {},
		postAddresses: {},
		isAdressesMatch: true
	};
  
	$scope.streetsTypesOptions = [
	{ 'id': 1, 'name': 'вулиця', 'abbrName': 'вул.', 'uri': '/streets/types/1' },
	{ 'id': 2, 'name': 'бульвар', 'abbrName': 'бульв.', 'uri': '/streets/types/2' },
	{ 'id': 3, 'name': 'площа', 'abbrName': 'пл.', 'uri': '/streets/types/3' },
	{ 'id': 4, 'name': 'провулок', 'abbrName': 'пров.', 'uri': '/streets/types/4' },
	{ 'id': 5, 'name': 'проспект', 'abbrName': 'просп.', 'uri': '/streets/types/5' } ];

});
