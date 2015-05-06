'use strict';

angular
	.module('admissionSystemApp')
  .directive('generalTable', function () {

    personTableController.$inject = ['$scope', '$state'];
    function personTableController($scope, $state) {
      console.log();

      var index,
        searchObj;

      // filter (checkboxes) options
      $scope.userFilterPick = {};
      $scope.oneAtATime = {
        open : false
      };
      $scope.removeFromUserPick = function (property, obj) {
        index = $scope.userFilterPick[property].indexOf(obj);
        $scope.userFilterPick[property].splice(index, 1);
      };

      // search
      $scope.startSearch = function (fieldSearchBy, query) {
        searchObj = {};
        searchObj[fieldSearchBy.property] = [{
          'id': query,
          'length': 2
        }];
        $scope.getdata({
          currentPage: $scope.currentPage,
          itemsPerPage: $scope.itemsPerPage,
          userFilterPick: searchObj
        });
        $scope.userFilterPick = {};
      };

      // pagination options
      $scope.maxSize = 5;
      $scope.page = {};
      $scope.page.current = 1;

      // item per page chooser
      $scope.itemsPerPageOptions = ['10', '25', '50', '100'];
      $scope.itemsPerPage = ($state.params.count) ? $state.params.count : '10';

      $scope.itemPerPageChanged = function (option) {
        $state.go($scope.currentstate, {
            count: option
          });
        $state.params.count = option;
        $scope.currentPage = 1;
        $scope.getdata({
          currentPage: $scope.currentPage,
          itemsPerPage: option,
          userFilterPick: $scope.userFilterPick
        });
      };

      $scope.itemPerPageChanged($scope.itemsPerPage);
    }

    function link(scope, element) {

      // show or hide filter div
      scope.hideFilter = false;
      scope.hideFilterFunc = function () {
        scope.hideFilter = !scope.hideFilter;
        var tableNode = angular.element(element[0].getElementsByClassName('content-data'));

        tableNode.toggleClass('col-sm-10 col-md-10');
        tableNode.toggleClass('col-sm-12 col-md-12');
      };

      // sotring
      scope.sort = function (columnName, event) {
        scope.descending = !scope.descending;

        var params = {
            currentPage: scope.currentPage,
            itemsPerPage: scope.itemsPerPage,
            userFilterPick: scope.userFilterPick,
            sort: {}
          },
          arrow = angular.element(event.target.getElementsByClassName('fa'));

        scope.params = params;

        arrow.removeClass('fa-sort');

        if (scope.descending) {
          arrow.removeClass('fa-caret-up ').addClass('fa-caret-down');
          params.sort.orderBy = columnName + '-desc';
          scope.getdata(params);
        } else {
          arrow.removeClass('fa-caret-down').addClass('fa-caret-up');
          params.sort.orderBy = columnName + '-asc';
          scope.getdata(params);
        }
      };
    }

    var directive = {
      templateUrl: '../views/directives/generalTable.html',
      restrict: 'E',
      link: link,
      controller: personTableController,
      controllerAs: 'vm',
      replace: true,
      scope: {
        data: '=?',
        headers: '=?',
        filters: '=?',
        search: '=?',
        getdata: '&?',
        total: '@?',
        onDelete: '&?',
        onChange: '&?',
        onView: '&?',
        isView: '=',
        currentstate: '@?',
        newitemstate: '@?',
        newitemlinktitle: '@?'
      }
    };

    return directive;
  });

