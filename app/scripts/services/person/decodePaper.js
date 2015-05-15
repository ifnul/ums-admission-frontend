'use strict';

angular
  .module('admissionSystemApp')
  .factory('paperDecodeSvc', ['$q', 'DictionariesSvc', function ($q, DictionariesSvc) {

    function decode(rawPaper) {

      var paperTypeNames = [],
        publicAwards1 = [],
        publicAwards2 = [],
        publicActivities = [],
        decodeHonorTypes = [];

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

      return $q.all([
        DictionariesSvc.getPaperTypes(),
        DictionariesSvc.getPublicActivities(),
        DictionariesSvc.getHonorsTypes(),
        DictionariesSvc.getPublicActivitiesAwards(1),
        DictionariesSvc.getPublicActivitiesAwards(2)
      ])
        .then(function (res) {
          pushData(res[0], paperTypeNames);
          pushData(res[1], publicActivities);
          pushData(res[2], decodeHonorTypes);
          pushAwardsData(res[3], publicAwards1);
          pushAwardsData(res[4], publicAwards2);

          rawPaper.paperTypeId = paperTypeNames[rawPaper.paperTypeId];
          if (rawPaper.award && rawPaper.award.publicActivityAwardId < 64) {
            rawPaper.award.publicActivityAwardId = publicAwards1[rawPaper.award.publicActivityAwardId];
            rawPaper.award.publicActivityTypeId = 'Всеукраїнські учнівські олімпіади із базових предметів (IV етап)';
          } else if (rawPaper.award && rawPaper.award.publicActivityAwardId >= 64) {
            rawPaper.award.publicActivityAwardId = publicAwards2[rawPaper.award.publicActivityAwardId];
            rawPaper.award.publicActivityTypeId = 'Всеукраїнські конкурси — захисти науково-дослідницьких робіт учнів - членів Малої академії наук України';
          }
          if (rawPaper.honorsTypeId) {
            rawPaper.honorsTypeId = decodeHonorTypes[rawPaper.honorsTypeId];
          }

          return rawPaper;
        });
    }

    return {
      paperDecoded: function (rawData) {
        return decode(rawData);
      }
    };
  }]);

