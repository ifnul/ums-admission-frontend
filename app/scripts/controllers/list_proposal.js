'use strict';

/**
 * @ngdoc function
 * @name admissionSystemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the admissionSystemApp
 */
angular.module('admissionSystemApp')
  .controller('ListProposalCtrl', ['$scope', 'ListProposalGettingService', function ($scope, ListProposalGettingService) {

  }])

// ------------ pagination -------------

angular.module('admissionSystemApp')
  .controller('PaginationCtrl', ['$scope', 'ngTableParams', function($scope, ngTableParams) {
    var data = [
      {
        "specialityID": "6.01.0",
        "departmentID": "Math",
        "timePeriodId": 5,
        "specofferTypeId": 2349.66,
        "docSeries": 3534.49,
        "docNum": 21,
        "eduFormTypeId": "vechirna",
        "licCount": 121,
        "stateCount": 77,
        "begDate": "5/05/2022",
        "endDate": "3/03/2014",
        "parentId": "ZIDOX"
      },
      {
        "specialityID": "6.01.1",
        "departmentID": "Legal",
        "timePeriodId": 1,
        "specofferTypeId": 2827.77,
        "docSeries": 2402.15,
        "docNum": 23,
        "eduFormTypeId": "vechirna",
        "licCount": 140,
        "stateCount": 81,
        "begDate": "5/05/2022",
        "endDate": "4/04/2014",
        "parentId": "EPLOSION"
      },
      {
        "specialityID": "6.01.2",
        "departmentID": "Finance",
        "timePeriodId": 3,
        "specofferTypeId": 3219.81,
        "docSeries": 1016.75,
        "docNum": 30,
        "eduFormTypeId": "vechirna",
        "licCount": 68,
        "stateCount": 70,
        "begDate": "2/02/2019",
        "endDate": "1/01/2014",
        "parentId": "INTERODEO"
      },
      {
        "specialityID": "6.01.3",
        "departmentID": "Math",
        "timePeriodId": 2,
        "specofferTypeId": 3627.38,
        "docSeries": 2527.74,
        "docNum": 20,
        "eduFormTypeId": "denna",
        "licCount": 156,
        "stateCount": 58,
        "begDate": "2/02/2019",
        "endDate": "1/01/2014",
        "parentId": "PAPRIKUT"
      },
      {
        "specialityID": "6.01.4",
        "departmentID": "Legal",
        "timePeriodId": 1,
        "specofferTypeId": 3336.56,
        "docSeries": 3658.96,
        "docNum": 28,
        "eduFormTypeId": "zaochna",
        "licCount": 146,
        "stateCount": 61,
        "begDate": "3/03/2020",
        "endDate": "5/05/2014",
        "parentId": "TUBALUM"
      },
      {
        "specialityID": "6.01.5",
        "departmentID": "Math",
        "timePeriodId": 2,
        "specofferTypeId": 2346.02,
        "docSeries": 3705.58,
        "docNum": 33,
        "eduFormTypeId": "zaochna",
        "licCount": 160,
        "stateCount": 97,
        "begDate": "3/03/2020",
        "endDate": "3/03/2014",
        "parentId": "CALCULA"
      },
      {
        "specialityID": "6.01.6",
        "departmentID": "Finance",
        "timePeriodId": 1,
        "specofferTypeId": 2761.4,
        "docSeries": 1255.62,
        "docNum": 36,
        "eduFormTypeId": "zaochna",
        "licCount": 134,
        "stateCount": 57,
        "begDate": "3/03/2020",
        "endDate": "5/05/2014",
        "parentId": "COSMETEX"
      },
      {
        "specialityID": "6.01.7",
        "departmentID": "Math",
        "timePeriodId": 4,
        "specofferTypeId": 3626,
        "docSeries": 3646,
        "docNum": 29,
        "eduFormTypeId": "zaochna",
        "licCount": 143,
        "stateCount": 54,
        "begDate": "4/04/2021",
        "endDate": "5/05/2014",
        "parentId": "VERTIDE"
      },
      {
        "specialityID": "6.01.8",
        "departmentID": "Math",
        "timePeriodId": 4,
        "specofferTypeId": 2896.52,
        "docSeries": 2973.54,
        "docNum": 38,
        "eduFormTypeId": "zaochna",
        "licCount": 153,
        "stateCount": 96,
        "begDate": "5/05/2022",
        "endDate": "1/01/2014",
        "parentId": "QUONATA"
      },
      {
        "specialityID": "6.01.9",
        "departmentID": "Finance",
        "timePeriodId": 4,
        "specofferTypeId": 3831.47,
        "docSeries": 2920.91,
        "docNum": 21,
        "eduFormTypeId": "zaochna",
        "licCount": 107,
        "stateCount": 60,
        "begDate": "2/02/2019",
        "endDate": "4/04/2014",
        "parentId": "BLUPLANET"
      },
      {
        "specialityID": "6.01.10",
        "departmentID": "Finance",
        "timePeriodId": 2,
        "specofferTypeId": 2384.06,
        "docSeries": 1624.84,
        "docNum": 24,
        "eduFormTypeId": "denna",
        "licCount": 70,
        "stateCount": 91,
        "begDate": "5/05/2022",
        "endDate": "2/02/2014",
        "parentId": "KOOGLE"
      },
      {
        "specialityID": "6.01.11",
        "departmentID": "Finance",
        "timePeriodId": 3,
        "specofferTypeId": 2113.51,
        "docSeries": 3072.51,
        "docNum": 33,
        "eduFormTypeId": "vechirna",
        "licCount": 156,
        "stateCount": 91,
        "begDate": "1/01/2018",
        "endDate": "4/04/2014",
        "parentId": "EXERTA"
      },
      {
        "specialityID": "6.01.12",
        "departmentID": "Math",
        "timePeriodId": 2,
        "specofferTypeId": 1712.47,
        "docSeries": 3430.01,
        "docNum": 27,
        "eduFormTypeId": "vechirna",
        "licCount": 157,
        "stateCount": 90,
        "begDate": "2/02/2019",
        "endDate": "2/02/2014",
        "parentId": "PROSELY"
      },
      {
        "specialityID": "6.01.13",
        "departmentID": "Finance",
        "timePeriodId": 2,
        "specofferTypeId": 2545.07,
        "docSeries": 2014.49,
        "docNum": 22,
        "eduFormTypeId": "denna",
        "licCount": 83,
        "stateCount": 59,
        "begDate": "4/04/2021",
        "endDate": "1/01/2014",
        "parentId": "QUONK"
      },
      {
        "specialityID": "6.01.14",
        "departmentID": "Math",
        "timePeriodId": 4,
        "specofferTypeId": 1383.23,
        "docSeries": 2157.9,
        "docNum": 27,
        "eduFormTypeId": "denna",
        "licCount": 148,
        "stateCount": 74,
        "begDate": "5/05/2022",
        "endDate": "5/05/2014",
        "parentId": "EARTHPURE"
      }];

    //When instantiating ngTableParams, the function takes two arguments: parameters and settings
    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10           // count per page
    }, {
      total: data.length, // length of data
      getData: function($defer, params) {

        //getData: Defines a method for collating the data that should be displayed in ngTable.
        // ngTable always calls getData with 2 arguments, $defer and params
        //$defer is a Promise object.
        // params is a reference to the configuration supplied in the parameters object
        // (or ngTable's defaults, if not supplied in parameters).

        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  }]);

  .controller('ListProposalCtrl', ['$scope', 'ListProposalGettingService', function ($scope, ListProposalGettingService) {

  }]);
