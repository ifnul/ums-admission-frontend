'use strict';

angular.module('admissionSystemApp')

  .factory('SubjectsSvc', ['$http', '$q', 'DictionariesSvc', function ($http, $q, DictionariesSvc) {
    var flagForFirstFunction = 0;
    var data = [];
    var chiefSubjectsArray = [];
    var subjectsForParentArray = [];
    var chiefSubjects = $q.defer();
    var subjectsForParent = $q.defer();

    //Get chief subjects function
    var getChiefSubjects = function () {

      if (flagForFirstFunction === 0) {
        flagForFirstFunction += 1;
        DictionariesSvc.getAllSubjects().then(function (res) {
          angular.extend(data, res);

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

      getChiefSubjects().then(function () {
        var i, y;
        subjectsForParentArray.length = 0;
        for (i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            if (data[i].hasChildren) {
              for (y = 0; y < data.length; y++) {
                if (data[y].parentId === id) {
                  subjectsForParentArray.push({id: data[y].id, name: data[y].name, parentId: data[y].parentId});
                }
              }
              break;
            }
          }
        }

        subjectsForParent.resolve(subjectsForParentArray);
      });

      return subjectsForParent.promise;
    };


    var getSubjectsById = function (id) {
      var returnNameDefer = $q.defer();
      var returnName = {};

      getChiefSubjects().then(function () {
        var i, y;
        for (i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            if (data[i].hasOwnProperty('parentId')) {
              returnName.id = data[i].id;
              for (y = 0; y < data.length; y++) {
                if (data[y].id === data[i].parentId) {
                  returnName.name = data[y].name;
                }
              }
              returnName.additionName = data[i].name;
            }
            else if (data[i].hasChildren === false) {
              returnName.id = data[i].id;
              returnName.name = data[i].name;
            }
            returnNameDefer.resolve(returnName);
          }
        }
      });

      return returnNameDefer.promise;
    };


    return {
      //function returns Promise with info about chief subjects (like [{hasChildren: true, id: 3, name: "Іноземна мова"}, etc.])
      getChiefSubjects: getChiefSubjects,

      //function returns Promise with info about children-subjects (like [{id: 30, name: "Французька мова", parentId: 3}, etc.])
      getSubjectsForParent: function (id) {
        return getSubjectsForParentFunction(id);
      },

      getSubjectsById: function (id) {
        return getSubjectsById(id);
      }
    };

  }]);
