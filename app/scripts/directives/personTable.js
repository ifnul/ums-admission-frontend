'use strict';

/**
 * @ngdoc directive
 * @name admissionSystemApp.directive:personTable
 * @description
 * # personTable
 */

angular
	.module('admissionSystemApp')
  .directive('personTable', personTable);

function personTableController($scope) {
  var vm = this;
}

function personTable () {

	function link(scope, element) { 
	 	// element.text('this is the personTable directive');
	}

 	
 	var directive = {
 		templateUrl: '../views/directives/personTable.html',
 		restrict: 'E',
 		link: link,
 		controller: personTableController,
 		controllerAs: 'vm'
 	};

 	return directive;
 }


