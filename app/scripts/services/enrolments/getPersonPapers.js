'use strict';

/* function result stored in papersTypes.rightPapersTypes array
  1) get person by ID; 2) get paperTypes (stored in wholePapersTypes)
  3) paperTypes filters under next rule:  if paperType object in wholePapersTypes
     match an paperTypeID in personPapers, it goes to rightPapersTypes. Else it doesn't.
  4) Every paperType object expands with property personPaperId which value equal to personPaper ID. */

angular.module('admissionSystemApp')
  .factory('getPersonPapersSvc', ['DictionariesSvc', 'Restangular',
    function (DictionariesSvc, Restangular) {

      var papersTypes = {
        wholePapersTypes: [],
        rightPapersTypes: []
      },
        personPapers = [];

      function setRightPersonPapers (personId) {
        papersTypes.rightPapersTypes.length = 0;
        DictionariesSvc.getPaperTypes({
          paperUsageId : 2
        }).then(function (paperTypes) { // (1)
          papersTypes.wholePapersTypes = paperTypes;

          Restangular.one('persons', personId).one('papers').getList().then(function (papers) { // (2)
            personPapers = papers;
            _.forEach(papersTypes.wholePapersTypes, function (paperTypeObj) {
              _.forEach(personPapers, function (personPaperObj) {
                if (paperTypeObj.id === personPaperObj.paperTypeId) { // (3)
                  paperTypeObj.personPaperId = personPaperObj.id; // (4)
                  papersTypes.rightPapersTypes.push(paperTypeObj);
                }
              });
            });
          });
        });
      }

      return {
        setRightPersonPapers: function (personId) {
          return setRightPersonPapers(personId);
        },
        getRightPapersTypes: papersTypes.rightPapersTypes
      };
    }]);
