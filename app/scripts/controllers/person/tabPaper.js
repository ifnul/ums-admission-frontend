'use strict';

angular.module('admissionSystemApp')
  .controller('tabPersonPapers', ['$scope', '$http', '$modal', '$rootScope', 'DictionariesSvc', function ($scope, $http, $modal, $rootScope, DictionariesSvc) {

    /* all ng-shows on a view*/
    $scope.isVisible = {
      isSaveToTable:false,
      isCreating:true,
      isAddToTable :true,
      publicActiveTable:false,
      publicActivSelect : false
    };

    $scope.headers = [
      {name: 'abbrName', display: 'категорія документів'},
      {name: 'name', display: 'назва документу'},
      {name: 'docSeries', display: 'серія документу'},
      {name: 'docNum', display: 'номер документу'},
      {name: 'dataIssued', display: 'дата видачі'},
      {name: 'dataDate', display: 'дата завершення'},
      {name: 'publicActivityTypeId', display: 'категорія нагорд'},
      {name: 'awardName', display: 'нагорода'}
    ];

    /* function that's making decoding in data */
    function pushData(data, array) {
      angular.forEach(data, function (item) {
        array[item.id] = item.name;
      });
    }

    function pushAwardsData(data, array) {
      angular.forEach(data, function (item) {
        array[item.id] = item.awardName;
      });
    }

    var paperTypeNames = [];
    var paperUsageNames = [];
    var publicAwards = [];
    var publicActivities = [];

    /* getting from service the categories of papers */
    DictionariesSvc.getPaperUsages().then(function (paperUsage) {
      $scope.paperUsage = paperUsage;
      pushData(paperUsage, paperUsageNames);
    });

    /* function that's setting the children in our category of papers(if category have chosen, return all children from this category) */
    $scope.setNewData = function (id) {
      DictionariesSvc.getPaperTypes().then(function (paperType) {
        pushData(paperType, paperTypeNames);
        $scope.newData = [];
        for (var i = 0; i < paperType.length; i++) {
          if (paperType[i].paperUsageId === id) {
            $scope.newData.push(paperType[i]);
          }
        }
      })
    };

    /* getting from service the categories of awards */
    DictionariesSvc.getPublicActivities().then(function (publicActiv) {
      $scope.publicActiv = publicActiv;
      pushData(publicActiv, publicActivities);
    });

    /* function that's setting the children in our category of awards(if category have chosen, return all children from this category) */
    $scope.setAdditionalData = function (id) {
      DictionariesSvc.getPublicActivitiesAwards(id).then(function (awards){
        pushAwardsData(awards, publicAwards);
        $scope.newAddingData = [];
        for(var a = 0; a < awards.length; a++){
          if(awards[a].publicActivityId === id) {
            $scope.newAddingData.push(awards[a]);
          }
        }
      })
    };

    $scope.currentObj = {};
    $scope.entirePerson.papers = [];
    $scope.inputData = [];
    var cloneView;
    var cloneViewDecode;
    var insideArray;

    /* the function that's adding the object to the row of table  */
    $scope.addToTable = function () {
      var generetedId =  1 + Math.floor( Math.random() * (10000+1-1) );
      var cloneMainNotDecode = _.clone($scope.currentObj);
      cloneMainNotDecode.uniqueID = generetedId;
      $scope.inputData.push(cloneMainNotDecode);

      cloneView = _.clone($scope.currentObj);
      insideArray = {};
      cloneView["insideArray"] = insideArray;
      cloneView.uniqueID = generetedId;
      cloneViewDecode = decodeData(cloneView);
      insideArray.awardName = cloneViewDecode.awardName;
      insideArray.publicActivityTypeId = cloneViewDecode.publicActivityTypeId;
      delete cloneViewDecode.awardName;
      delete cloneViewDecode.publicActivityTypeId;

      $scope.entirePerson.papers.push(cloneViewDecode);
      $scope.isVisible.isAddToTable = true;
      $scope.isVisible.isSaveToTable = false;
      $scope.currentObj = {};
      _.merge(objToEditDecoded, decodeData($scope.currentObj));

    };

    function decodeData (obj) {
      obj.abbrName = paperUsageNames[obj.abbrName];
      obj.name = paperTypeNames[obj.name];
      obj.publicActivityTypeId = publicActivities[obj.publicActivityTypeId];
      obj.awardName = publicAwards[obj.awardName];
      return obj;
    }

    /* the function that's deleting the object(row from table)  */
    $scope.deleteData = function (item){

      var indexMainData = _.findIndex($scope.inputData, {uniqueID:item.uniqueID});
      var indexDataDecoded = _.findIndex($scope.entirePerson.papers, {uniqueID:item.uniqueID});

      $scope.inputData.splice(indexMainData, 1);
      $scope.entirePerson.papers.splice(indexDataDecoded, 1);
    };

    var objToEdit;
    var objToEditDecoded;

    /* the function that's editing the object, and let's to change current data in this object  */
    $scope.editData = function (item) {

      objToEdit = _.find($scope.inputData, {uniqueID:item.uniqueID});
      _.merge($scope.currentObj, objToEdit);
      objToEditDecoded = _.find($scope.entirePerson.papers, {uniqueID:item.uniqueID});
      $scope.addSelect(objToEdit.name);
      $scope.isVisible.isAddToTable = false;
      $scope.isVisible.isSaveToTable = true;
    };

    /* the function that's saving the object, and let's to update the changes  */
    $scope.saveData = function () {

      _.merge(objToEdit, $scope.currentObj);
      _.merge(objToEditDecoded, decodeData($scope.currentObj));
      $scope.currentObj = {};
      delete cloneViewDecode.awardName;
      delete cloneViewDecode.publicActivityTypeId;
      $scope.isVisible.isAddToTable = true;
      $scope.isVisible.isSaveToTable = false;
    };

    /* the function that's adding the select with children of chosen category  */
    $scope.addSelect = function (name) {
      if (name === 29) {
        $scope.isVisible.publicActivSelect = true;
        $scope.isVisible.publicActiveTable = true;
      }
      else{
        $scope.isVisible.publicActivSelect = false;
      }
    };
  }]);
