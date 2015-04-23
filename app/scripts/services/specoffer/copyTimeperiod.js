'use strict';

angular.module('admissionSystemApp')
  .factory('copyTimeperiod', ['$http', '$q', 'DictionariesSvc', 'SpecoffersService', function ($http, $q, DictionariesSvc, SpecoffersService) {


    //This var modifies request
    var req = {
    method: 'POST',
    url: 'http://104.236.29.16:8080/is-lnu-rest-api/api/timeperiods',
    headers: {
    'Authorization': 'Basic YWRtaW46bmltZGE=',
    'Content-Type': 'application/json'
  },
    data: {}
  };

    //Method creates new timeperiod
    var createTimeperiod = function (numValueInput, nameInput, begDateInput, endDateInput) {
      var createdTimeperiodId = $q.defer();
      req.data = {
        numValue: numValueInput,
        timePeriodTypeId: 1,
        name: nameInput,
        begDate: begDateInput,
        endDate: endDateInput
      };
      $http(req).then(function (data) {
        createdTimeperiodId.resolve(data.data.id);
      });

      return createdTimeperiodId.promise;
    };

    //Method copy data from current timeperiod to selected timeperiod
    var copyToTimeperiod = function (oldTimeperiod, newTimeperiod, begDate, endDate) {
      DictionariesSvc.clearStorageByRoute('specoffers');
      DictionariesSvc.getAllSpecoffers(oldTimeperiod).then(function (specoffers) {
        var specofferArray = specoffers;
        var x = 0;

        for (x; x < 2; x++) {
          var y = 0;
          var z = 0;

          SpecoffersService.getEntireSpecoffer(specofferArray[x].id).then(function (specoffer) {
            var obj = specoffer;
            obj.specoffer.timePeriodId = newTimeperiod;
            obj.specoffer.begDate = begDate;
            obj.specoffer.endDate = endDate;
            obj.specoffer.note = '';

            //delete inappropriate properties from specoffer object
            delete obj.specoffer.id;
            delete obj.specoffer.createDate;
            delete obj.specoffer.crtUser;
            delete obj.specoffer.crtUserGroup;
            delete obj.specoffer.updateDate;

            //delete id from subjects
            for (y; y < obj.subjects.length; y++) {
              delete obj.subjects[y].id;
            }

            //delete id from benefits
            for (z; z < obj.benefits.length; z++) {
              delete obj.benefits[z].id;
            }

            //post redacted specoffer to server
            SpecoffersService.clearCopy();
            SpecoffersService.addOrEditSpecoffer(obj);
          })
        }
      });
    };

    return {

      //Method creates new timeperiod
      createTimeperiod: function (numValueInput, nameInput, begDateInput, endDateInput) {
        return createTimeperiod(numValueInput, nameInput, begDateInput, endDateInput);
      },

      //Method copy data from current timeperiod to selected timeperiod
      copyToTimeperiod: function (oldTimeperiod, newTimeperiod, begDate, endDate) {
        return copyToTimeperiod(oldTimeperiod, newTimeperiod, begDate, endDate);
      }
    };
  }]);
