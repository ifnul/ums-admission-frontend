'use strict';

angular
	.module('admissionSystemApp')
  .directive('generalTable', function () {

    personTableController.$inject = ['$scope', '$state', '$location'];
    function personTableController($scope, $state, $location) {
      console.log();

      var index,
        searchObj;
        //queryParams;

      // filter (checkboxes) options
      $scope.userFilterPick = {};
      $scope.oneAtATime = {
        open : false
      };

      /**
       * [removeFromUserPick description]
       * @param  {[string]} property [key by which we will be seeking, e.g. - 'isContract']
       * @param  {[obj]} obj         [obj in which we will be seeking, e.g. - {id: 1, name: "Контактна ф.н."}]
       * in result - delete specific object form userFilterPick;
       */
      $scope.removeFromUserPick = function (property, obj) {
        index = $scope.userFilterPick[property].indexOf(obj);
        $scope.userFilterPick[property].splice(index, 1);
      };


      /**
       * [startSearch - search by ]
       * @param  {[obj]} fieldSearchBy [property by which we will be seeking
       *                               e.g: api/enrolments?docSeries=RRLF, where docSeries is property]
       * @param  {[string]} query      [user input, e.g. - 'RRLF']
       * in result - trigger function from the controller to get data form the server
       */
      $scope.startSearch = function (fieldSearchBy, query) {
        $scope.currentPage = 1;
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

      /**
       * [paginationClick - handal click on pagination buttons]
       * @param  {[string]} PagingClicked  []
       * @param  {[number]} page  [current page (the same as the $scope.currentPage)]
       * in result ($state.go) - change state adding new query params to it (page, count);
       */
      $scope.paginationClick = function (PagingClicked, page) {
        $location.search({
          page: page,
          count: $scope.itemsPerPage
        });

        $scope.getdata({
          currentPage: page,
          itemsPerPage: $scope.itemsPerPage,
          userFilterPick: $scope.userFilterPick
        });
      };

      // item per page chooser
      $scope.itemsPerPageDefault = 10;
      $scope.itemsPerPageOptions = ['10', '20', '50', '100'];
      $scope.itemsPerPage = ($location.search().count) ? $location.search().count : $scope.itemsPerPageOptions[1];

      /**
       * [itemPerPageChanged - do the same as paginationClick but triggers by differ event]
       */
      $scope.itemPerPageChanged = function (itemsPerPage) {
        $scope.currentPage = 1;
        $location.search({
          page: $scope.currentPage,
          count: itemsPerPage
        });

        $scope.getdata({
          currentPage: $scope.currentPage,
          itemsPerPage: itemsPerPage,
          userFilterPick: $scope.userFilterPick
        });
      };
    }

    function link(scope, element) {

      /**
       * [hideFilterFunc - show or hide filter div (blick with filter on the left side of the table)]
       */
      scope.hideFilter = false;
      scope.hideFilterFunc = function () {
        scope.hideFilter = !scope.hideFilter;
        var tableNode = angular.element(element[0].getElementsByClassName('content-data'));

        tableNode.toggleClass('col-sm-10 col-md-10');
        tableNode.toggleClass('col-sm-12 col-md-12');
      };

      /**
       * [sort - handle sorting data in table]
       * @param  {[string]} columnName    [column name which was clicked]
       * @param  {[jquery obj]} event      [click event (click occurs on column)]
       * params - obj which will be passed to **getdata** function to retrieve data from the serve
       * manipulation with classes provide the actual state of the column's caret (down(-desc) of up(-asc))
       */
      scope.sort = function (columnName, event) {
        scope.descending = !scope.descending;

        var params = {
            currentPage: scope.currentPage,
            itemsPerPage: scope.itemsPerPage,
            userFilterPick: scope.userFilterPick,
            sort: {}
          },
          arrow = angular.element(event.target.getElementsByClassName('fa')),
          sortArrows = angular.element('.fa.fa-caret-up, .fa.fa-caret-down');

        sortArrows.removeClass('fa-caret-up');
        sortArrows.removeClass('fa-caret-down');
        sortArrows.addClass('fa-sort');

        scope.params = params;

        arrow.removeClass('fa-sort');

        if (scope.descending) {
          arrow.removeClass('fa-caret-up').addClass('fa-caret-down');
          params.sort.orderBy = columnName + '-desc';
          scope.getdata(params);
        } else {
          arrow.removeClass('fa-caret-down').addClass('fa-caret-up');
          params.sort.orderBy = columnName + '-asc';
          scope.getdata(params);
        }
      };
    }

    /**
     * [directive description]
     * @type {Object}
     * data - main data which comes from the server. It's parsing to the table;
     * headers - table headers (could be found in servise which keeps satic data)
     * filters -  filter data (titles, values). Statis data
     * search - model for search (mainly for dropdown). Statis data
     * getdata - main function. For retrieving data from the server
     * total - total number of items which comes form the server (actually it is data.length)
     * onDelete, onChange - handle deleting/changing of single item.
     * onView - handle redirect to person view. Only for person item.
     * isView - boolean. whether show button for  onView handler. If person item - true;
     * currentstate, newitemstate, newitemlinktitle - route states;
     */
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

