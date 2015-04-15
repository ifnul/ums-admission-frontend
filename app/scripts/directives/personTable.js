'use strict';

angular
	.module('admissionSystemApp')
  .directive('personTable', function personTable () {

  function personTableController($scope) {

    // filter (checkboxes) options
    $scope.userFilterPick = {};
    $scope.oneAtATime = {open : false};  
    $scope.removeFromUserPick = function (property, obj) {
      console.log('property',property);
      console.log('obj',obj);
      var index = $scope.userFilterPick[property].indexOf(obj);
      $scope.userFilterPick[property].splice(index, 1);
    };

    // pagination options
    $scope.maxSize = 5;  
    $scope.totalItems = 123;
    $scope.currentPage = 1;
    
    // item per page chooser
    $scope.itemsPerPageOptions = ['10', '25', '50', '100'];
    $scope.itemsPerPage = $scope.itemsPerPageOptions[1];

    // if page no. changed - do smth
    $scope.pageChanged = function(pageNumber) {
      // console.log('page changed to', pageNumber);
    };

  }

  function link(scope, element) {
    
    scope.hideFilter = false;
    scope.hideFilterFunc = function () {
      scope.hideFilter = !scope.hideFilter;
      var tableNode = angular.element(element[0].getElementsByClassName('content-data'));
      tableNode.toggleClass('col-sm-10 col-md-10');
      tableNode.toggleClass('col-sm-12 col-md-12');
    };
    
    scope.sort = function (columnName, event) {
      scope.descending = !scope.descending;

      var arrow = angular.element(event.target.getElementsByClassName('fa'));
      arrow.removeClass('fa-sort');
      if (scope.descending) {
        arrow.removeClass('fa-caret-up ').addClass('fa-caret-down');
      } else {
        arrow.removeClass('fa-caret-down').addClass('fa-caret-up');
      }
    };

  }

  var directive = {
    templateUrl: '../views/directives/personTable.html',
    restrict: 'E',
    link: link,
    controller: personTableController,
    controllerAs: 'vm',
    replace: true,
    scope: {
      data: '=?',
      headers: '=?',
      filters: '=?',
      search: '=?'
    }
  };
  
  return directive;
 });









