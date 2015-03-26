/**
 * Created by kmuzytc on 23.03.2015.
 */
'use strict';

/**
 * @ngdoc function
 * @name admissionSystemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the admissionSystemApp
 */
angular.module('admissionSystemApp')

//http://176.36.11.25/api-lnu/enrolments/subjects
//http://104.236.29.16:8080/is-lnu-rest-api/api/enrolments/subjects
  .factory('Subjects', ['$http', '$q', function ($http, $q) {
    var flagForFirstFunction = 0;
    var flagForSecondFunction = 0;
    var data = [];
    var chiefSubjectsArray = [];
    var subjectsForParentArray = [];
    var chiefSubjects = $q.defer();
    var subjectsForParent = $q.defer();

    //Get subjects query description
    var req = {
      method: 'GET',
      url: 'http://104.236.29.16:8080/is-lnu-rest-api/api/enrolments/subjects',
      headers: {
        'Authorization': 'Basic YWRtaW46bmltZGE='
      }
    };

    //Get chief subjects function
    var getChiefSubjects = function () {

      if (flagForFirstFunction === 0) {
        flagForFirstFunction += 1;
        $http(req).then(function (res) {
          angular.extend(data, res.data.resources);

          for (var i = 0; i < data.length; i++) {
            if (!data[i].hasOwnProperty('hasChildren')) {
              data[i].hasChildren = false;
              if (data[i].hasOwnProperty('parentId')) {
                data[data[i].parentId - 1].hasChildren = true;
              }
            }
          }
          for (var y = 0; y < data.length; y++) {
            if (!data[y].hasOwnProperty('parentId')) {
              chiefSubjectsArray.push({id: data[y].id, name: data[y].name, hasChildren: data[y].hasChildren});
            }
          }

          chiefSubjects.resolve(chiefSubjectsArray);
        });
      }

      return chiefSubjects.promise;
    };


    //Get subjects for chief subject function
    var getSubjectsForParentFunction = function (id) {

      if(flagForSecondFunction === 0) {
        flagForSecondFunction += 1;
        getChiefSubjects().then(function () {
          if (data[id - 1].hasChildren) {
            for (var y = 0; y < data.length; y++) {
              if (data[y].parentId == id) {
                subjectsForParentArray.push({id: data[y].id, name: data[y].name, parentId: data[y].parentId});
              }
            }
          }

          subjectsForParent.resolve(subjectsForParentArray);
        });
      }

      return subjectsForParent.promise;
    };

    return {
      //function returns Promise with info about chief subjects (like [{hasChildren: true, id: 3, name: "Іноземна мова"}, etc.])
      getChiefSubjects: getChiefSubjects,

      //function returns Promise with info about children-subjects (like [{id: 30, name: "Французька мова", parentId: 3}, etc.])
      getSubjectsForParent: function (id) {return getSubjectsForParentFunction(id);}
    }
  }]);
