'use strict';

angular
	.module('admissionSystemApp')
  .directive('generalTable', function () {

    personTableController.$inject = ['$scope', '$state', '$location'];
    function personTableController($scope, $state, $location) {
      console.log();

      var index,
        searchObj,
        queryParams;

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
       * [on ulr query change - get new data ($location.search() trigger this event)]
       * var queryParams [query params from the url]
       */
      $scope.$on('$locationChangeStart', function () {
        queryParams = $location.search();
        console.log('queryParams', queryParams);
        $scope.currentPage = queryParams.page;
        $scope.itemsPerPage = queryParams.count;
        $scope.getdata({
          currentPage: queryParams.page,
          itemsPerPage: queryParams.count,
          userFilterPick: $scope.userFilterPick
        });
      });

      /**
       * [paginationClick - handal click on pagination buttons]
       * @param  {[string]} PagingClicked  []
       * @param  {[number]} page  [current page (the same as the $scope.currentPage)]
       * in result ($state.go) - change state adding new query params to it (page, count);
       */
      $scope.paginationClick = function (PagingClicked, page) {
        console.log('$scope.itemsPerPage', $scope.itemsPerPage);
        $location.search({
          page: page,
          count: $scope.itemsPerPage
        });
      };

      // item per page chooser
      $scope.itemsPerPageOptions = ['10', '25', '50', '100'];
      $scope.itemsPerPage = ($location.search().count) ? $location.search().count : $scope.itemsPerPageOptions[1];

      /**
       * [itemPerPageChanged - do the same as paginationClick but triggers by differ event]
       */
      $scope.itemPerPageChanged = function (itemsPerPage) {
        $location.search({
          page: 1,
          count: itemsPerPage
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

    /**
     * [directive description]
     * @type {Object}
     * data - main data which comes from the server. It's parsing to the table;
     * headers - table headers (could be found in servise which keeps satic data)
     * filters -  filter data (titles, values). Statis data
     * search - model for search (mainly for dropdown). Statis data
     * getdata - main function. Fro retrieving data from the serve
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

