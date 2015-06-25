'use strict';

angular
  .module('admissionSystemApp')
  .factory('copyTimeperiod', ['$http', '$q', 'DictionariesSvc', 'SpecoffersService', 'Constants',
    function ($http, $q, DictionariesSvc, SpecoffersService, Constants) {

      //This var modifies request
      var req = {
          method: 'POST',
          url: Constants.basicURL+'timeperiods',
          headers: {
            'Authorization': Constants.BasicAuth,
            'Content-Type': 'application/json'
          },
          data: {}
        },
        createTimeperiod,
        copyToTimeperiod;

      //Method creates new timeperiod
      createTimeperiod = function (numValueInput, nameInput, begDateInput, endDateInput) {
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
      copyToTimeperiod = function (oldTimeperiod, newTimeperiod, begDate, endDate) {
        var deffered = $q.defer(),
            percentComplete;

        DictionariesSvc.clearStorageByRoute('specoffers');
        DictionariesSvc.getAllSpecoffers({
          timePeriodId: oldTimeperiod
        }).then(function (specoffers) {
          var specofferArray = specoffers,
            promises = [],
            x, y, z, i = 0;

          for (x = 0; x < specofferArray.length; x++) {
            promises.push(SpecoffersService.getEntireSpecoffer(specofferArray[x].id).then(function (specoffer) {
              var obj = specoffer;

              obj.specoffer.timePeriodId = newTimeperiod;
              obj.specoffer.begDate = begDate;
              obj.specoffer.endDate = endDate;
              obj.specoffer.duration = 123;
              obj.specoffer.note = '';

              //delete inappropriate properties from specoffer object
              delete obj.specoffer.id;
              delete obj.specoffer.createDate;
              delete obj.specoffer.crtUser;
              delete obj.specoffer.crtUserGroup;
              delete obj.specoffer.updateDate;

              //delete id from subjects
              for (y = 0; y < obj.subjects.length; y++) {
                delete obj.subjects[y].id;
              }

              //delete id from benefits
              for (z = 0; z < obj.benefits.length; z++) {
                delete obj.benefits[z].id;
              }

              //post redacted specoffer to server
              SpecoffersService.clearCopy();
              return SpecoffersService.addOrEditSpecoffer(obj).then(function () {
                percentComplete = (i / specofferArray.length) * 100;
                deffered.notify(percentComplete);
                i++;
              });
            }));
          }

          return $q.all(promises);
        }).then(function () {
          deffered.resolve();
        });

        return deffered.promise;
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
    }
  ]);
