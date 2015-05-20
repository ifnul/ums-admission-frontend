'use strict';

angular.module('admissionSystemApp')
  .controller('tabPersonPapers', ['$scope', '$http', '$modal', '$rootScope', 'DictionariesSvc', '$filter', '$q',
    'paperDecodeSvc', '$state', '$stateParams',
    function ($scope, $http, $modal, $rootScope, DictionariesSvc, $filter, $q, paperDecodeSvc, $state,
              $stateParams) {

      if ($state.includes('root.person.view.*')) {
        $scope.personView = true;
      }

      $scope.newDocument = function () {
        $state.go('root.person.edit.papers', {
          id: $stateParams.id
        });
      };

      /* all ng-shows on a view*/
      $scope.isVisible = {
        isSaveToTable: false,
        isCreating: true,
        isAddToTable: true,
        publicActiveTable: false,
        publicActiveSelect: false,
        studyTable: false,
        studySelect: false,
        docPinTable: false,
        docPinSelect: false,
        markTable: false,
        markSelect: false
      };

      $scope.headers = [
        {name: 'paperTypeId', display: 'назва документу'},
        {name: 'docSeries', display: 'серія документу'},
        {name: 'docNum', display: 'номер документу'},
        {name: 'docDate', display: 'дата видачі'},
        {name: 'docIssued', display: 'ким видано'},
        {name: 'isChecked', display: 'звірен з оригіналом'},
        {name: 'isForeign', display: 'іноземного зразка'},
        {name: 'publicActivityTypeId', display: 'категорія нагорд'},
        {name: 'publicActivityAwardId', display: 'нагорода'},
        {name: 'honorsTypeId', display: 'тип відзнаки'},
        {name: 'mark', display: 'середній бал'},
        {name: 'docPin', display: 'пін-код'}
      ];

      $scope.inputData = [];

      $scope.$watchCollection('entirePerson.papers', function () {
        for (var i = 0; i < $scope.entirePerson.papers.length; i++) {
          $scope.inputData = [];
          var tempObj = {};

          (function (i) {

            _.merge(tempObj, $scope.entirePerson.papers[i]);
            paperDecodeSvc.paperDecoded(tempObj).then(function (res) {
              $scope.inputData.push(res);

              if (res.award) {
                $scope.isVisible.publicActiveTable = true;
              }
              if (res.honorsTypeId) {
                $scope.isVisible.studyTable = true;
              }
              if (res.mark) {
                $scope.isVisible.markTable = true;
              }
              if (res.docPin) {
                $scope.isVisible.docPinTable = true;
              }

            });

          })(i);
        }
      });

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

      var paperTypeNames = [],
        publicAwards = [],
        publicActivities = [],
        decodeHonorTypes = [];

      $q.all([
        DictionariesSvc.getPaperUsages(),
        DictionariesSvc.getPaperTypes(),
        DictionariesSvc.getPublicActivities(),
        DictionariesSvc.getHonorsTypes()
      ])
        .then(function (res) {
          $scope.paperUsage = res[0];
          pushData(res[1], paperTypeNames);
          $scope.newData = res[1];
          pushData(res[2], publicActivities);
          $scope.publicActiv = res[2];
          pushData(res[3], decodeHonorTypes);
          $scope.honorTypes = res[3];
        });

      $scope.setAdditionalData = function (id) {
        DictionariesSvc.getPublicActivitiesAwards(id).then(function (awards) {
          $scope.newAddingData = awards;
          pushAwardsData(awards, publicAwards);
        });
      };

      $scope.filterPaperTypes = function (paper) {
        return paper.paperUsageId === $scope.currentObj.abbrName;
      };

      $scope.currentObj = {};
      $scope.currentObj.pickAward = {};
      $scope.currentObj.isChecked = 0;
      $scope.currentObj.isForeign = 0;

      var cloneView,
        cloneViewDecode,
        cloneMainNotDecode;

      /* the function that's adding the object to the row of table  */
      $scope.addToTable = function () {
        $scope.currentObj.docDate = $filter('date')($scope.currentObj.docDate, 'yyyy-MM-dd');
        cloneMainNotDecode = _.clone($scope.currentObj);
        if (cloneMainNotDecode.publicActivityTypeId) {
          cloneMainNotDecode.award = {};
          //cloneMainNotDecode.award.publicActivityTypeId = cloneMainNotDecode.publicActivityTypeId;
          cloneMainNotDecode.award.publicActivityAwardId = cloneMainNotDecode.pickAward.id;
          cloneMainNotDecode.award.bonus = cloneMainNotDecode.pickAward.bonus;
        }
        delete cloneMainNotDecode.pickAward;
        delete cloneMainNotDecode.publicActivityTypeId;
        delete cloneMainNotDecode.abbrName;
        $scope.entirePerson.papers.push(cloneMainNotDecode);

        cloneView = _.clone($scope.currentObj);
        cloneViewDecode = decodeData(cloneView);
        if (cloneViewDecode.publicActivityTypeId) {
          cloneView.award = {};
          cloneView.award.publicActivityTypeId = cloneViewDecode.publicActivityTypeId;
          cloneView.award.publicActivityAwardId = cloneViewDecode.pickAward.awardName;
          cloneView.award.bonus = cloneViewDecode.pickAward.bonus;
        }
        delete cloneViewDecode.pickAward;
        delete cloneViewDecode.publicActivityTypeId;
        delete cloneViewDecode.abbrName;
        $scope.inputData.push(cloneViewDecode);

        $scope.isVisible.isAddToTable = true;
        $scope.isVisible.isSaveToTable = false;
        $scope.currentObj = {};
        $scope.currentObj.pickAward = {};
        $scope.currentObj.isChecked = 0;
        $scope.currentObj.isForeign = 0;

        $scope.isVisible.publicActiveSelect = false;
        $scope.isVisible.docPinSelect = false;
        $scope.isVisible.studySelect = false;
        $scope.isVisible.markSelect = false;
      };

      function decodeData(obj) {
        obj.paperTypeId = paperTypeNames[obj.paperTypeId];
        obj.publicActivityTypeId = publicActivities[obj.publicActivityTypeId];
        obj.publicActivityAwardId = publicAwards[obj.publicActivityAwardId];
        obj.honorsTypeId = decodeHonorTypes[obj.honorsTypeId];
        return obj;
      }

      /* the function that's deleting the object(row from table)  */
      $scope.deleteData = function (idx) {

        $scope.inputData.splice(idx, 1);
        $scope.entirePerson.papers.splice(idx, 1);
      };

      var objToEdit,
        objToEditDecoded;

      /* the function that's editing the object, and let's to change current data in this object  */
      $scope.editData = function (item, idx) {
        $scope.isVisible.isCreating = false;
        $scope.isVisible.publicActiveSelect = false;
        $scope.isVisible.docPinSelect = false;
        $scope.isVisible.studySelect = false;
        $scope.isVisible.markSelect = false;

        objToEdit = {};
        objToEditDecoded = {};
        $scope.currentObj = {};

        objToEdit = $scope.entirePerson.papers[idx];
        _.merge($scope.currentObj, objToEdit);
        objToEditDecoded = $scope.inputData[idx];
        $scope.addSelect(objToEdit);
        $scope.isVisible.isAddToTable = false;
        $scope.isVisible.isSaveToTable = true;

        angular.forEach($scope.newData, function (item) {
          if (item.id === objToEdit.paperTypeId) {
            $scope.currentObj.abbrName = item.paperUsageId;
            return false;
          }
        });

        if (objToEdit.award && objToEdit.award.publicActivityAwardId < 64) {
          $scope.currentObj.publicActivityTypeId = 1;
          $scope.setAdditionalData($scope.currentObj.publicActivityTypeId);
        } else if (objToEdit.award && objToEdit.award.publicActivityAwardId >= 64) {
          $scope.currentObj.publicActivityTypeId = 2;
          $scope.setAdditionalData($scope.currentObj.publicActivityTypeId);
        }
      };

      /* the function that's saving the object, and let's to update the changes  */
      $scope.saveData = function () {
        $scope.currentObj.docDate = $filter('date')($scope.currentObj.docDate, 'yyyy-MM-dd');
        _.merge(objToEdit, $scope.currentObj);
        _.merge(objToEditDecoded, decodeData($scope.currentObj));
        $scope.currentObj = {};
        $scope.currentObj.pickAward = {};
        $scope.currentObj.isChecked = 0;
        $scope.currentObj.isForeign = 0;

        if (objToEdit.publicActivityTypeId) {
          objToEdit.award.publicActivityAwardId = objToEdit.pickAward.id;
          objToEdit.award.bonus = objToEdit.pickAward.bonus;
        }
        delete objToEdit.abbrName;
        delete objToEdit.pickAward;
        delete objToEdit.publicActivityTypeId;

        if (objToEditDecoded.publicActivityTypeId) {
          objToEditDecoded.award.publicActivityTypeId = objToEditDecoded.publicActivityTypeId;
          objToEditDecoded.award.publicActivityAwardId = objToEditDecoded.pickAward.awardName;
          objToEditDecoded.award.bonus = objToEditDecoded.pickAward.bonus;
        }
        delete objToEditDecoded.abbrName;
        delete objToEditDecoded.pickAward;
        delete objToEditDecoded.publicActivityTypeId;

        $scope.isVisible.isAddToTable = true;
        $scope.isVisible.isSaveToTable = false;

        $scope.isVisible.publicActiveSelect = false;
        $scope.isVisible.docPinSelect = false;
        $scope.isVisible.studySelect = false;
        $scope.isVisible.markSelect = false;
      };

      /* the function that's adding the select with children of chosen category  */
      $scope.addSelect = function (paper) {
        if (paper.paperTypeId === 29) {
          $scope.isVisible.publicActiveSelect = true;
          $scope.isVisible.publicActiveTable = true;
        } else if (paper.paperTypeId === 4) {
          $scope.isVisible.docPinTable = true;
          $scope.isVisible.docPinSelect = true;
        } else if (_.contains([2, 7, 9, 10, 11, 12, 13, 22, 23], paper.paperTypeId)) {
          $scope.isVisible.studyTable = true;
          $scope.isVisible.studySelect = true;
        } else if (_.contains([30, 54], paper.paperTypeId)) {
          $scope.isVisible.markTable = true;
          $scope.isVisible.markSelect = true;
        }
      };
    }]);
