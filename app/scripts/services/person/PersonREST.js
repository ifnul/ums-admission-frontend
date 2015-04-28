'use strict';

angular.module('admissionSystemApp')
  .factory('Person', ['Restangular', '$q', '$filter',
    function (Restangular, $q, $filter) {

      var restAngular,
        objCopy,
        promises,
        newPromise;

      restAngular =
        Restangular.withConfig(function (Configurer) {
          Configurer.setRequestInterceptor(function (element, operation) {
            if (operation === 'post' || operation === 'put') {
              element.begDate = $filter('date')(element.begDate, 'yyyy-MM-dd');
              element.endDate = $filter('date')(element.endDate, 'yyyy-MM-dd');
              delete element.uri;
            }
            return element;
          });
        });

      objCopy = {};

      function separateAddresses(arr) {
        var addresses = {};

        addresses.regAddresses = arr[0].addressTypeId === 1 ? arr[0] : arr[1];
        addresses.postAddresses = arr[1].addressTypeId === 2 ? arr[1] : arr[0];
        addresses.isAdressesMatch = _.isEqual(
          [arr[0].street, arr[0].zipCode, arr[0].apartment],
          [arr[1].street, arr[1].zipCode, arr[1].apartment]);
        return addresses;
      }

      function assembleAddresses(obj) {
        var arr = [];

        if (obj.isAdressesMatch) {
          _.forEach(obj.regAddresses, function (value, key) {
            if (!(key === 'id' || key === 'uri' || key === 'addressTypeId')) {
              obj.postAddresses[key] = value;
            }
          });
        }
        arr.push(obj.regAddresses);
        arr.push(obj.postAddresses);
        return arr;
      }

      function getEntirePerson(id) {
        var entirePerson, i;

        entirePerson = {};
        entirePerson.person = restAngular.one('persons', id).get();
        entirePerson.addresses = restAngular.one('persons', id).customGET('addresses', {
          personId: id
        }).then(function (arr) {
          return separateAddresses(arr.resources);
        });
        entirePerson.contacts = restAngular.one('persons', id).one('contacts').getList();
        entirePerson.names = restAngular.one('persons', id).one('names').getList();
        entirePerson.papers = restAngular.one('persons', id).one('papers').getList();
        entirePerson.awards = restAngular.one('persons', id).one('awards').getList();
        entirePerson.enrolmentsubjects = restAngular.one('persons', id).one('enrolmentsubjects').getList();

        $q.all(entirePerson).then(function (res) {
          for (i = 0; i < res.papers.length; i++) {
            angular.forEach(res.awards, function (award) {
              if (res.papers[i].id === award.personPaperId) {
                res.papers[i].award = award;
              }
            });
          }
          delete res.awards;
          objCopy = {};
          _.merge(objCopy, res);
          _.merge(entirePerson, res);
        });
        return $q.all(entirePerson);
      }

      function addArrayOfItems(itemsArr, personId, route) {
        var promises, newPromise, i;

        promises = [];
        for (i = 0; i < itemsArr.length; i += 1) {
          itemsArr[i].personId = personId;
          newPromise = restAngular.one('persons', personId).one(route).post('', itemsArr[i]);
          promises.push(newPromise);
        }
        return $q.all(promises);
      }

      function addPapersAwardsSubjects(itemsArr, itemsArrSubj, personId) {
        var i;

        for (i = 0; i < itemsArr.length; i += 1) {
          itemsArr[i].personId = personId;
          if (itemsArr[i].hasOwnProperty('award')) {
            addAward(itemsArr[i], personId);
          } else if (itemsArr[i].paperTypeId === 4) {
            addSubjects(itemsArr[i], itemsArrSubj, personId);
          } else {
            newPromise = restAngular.one('persons', personId).one('papers').post('', itemsArr[i]);
            promises.push(newPromise);
          }
        }
        return $q.all(promises);
      }

      function addAward(item, personId) {
        var awardToPut = {};

        _.merge(awardToPut, item.award);
        delete item.award;
        awardToPut.personId = personId;
        newPromise = restAngular.one('persons', personId).one('papers').post('', item).then(function (response) {
          awardToPut.personPaperId = response.id;
          return restAngular.one('persons', personId).one('awards').post('', awardToPut);
        });
        promises.push(newPromise);
      }

      function addSubjects(item, itemsArrSubj, personId) {
        var subjPromises, subjPromise, i;

        newPromise = restAngular.one('persons', personId).one('papers').post('', item).then(function (response) {
          subjPromises = [];
          for (i = 0; i < itemsArrSubj.length; i += 1) {
            itemsArrSubj[i].personPaperId = response.id;
            subjPromise = restAngular.one('persons', personId).one('enrolmentsubjects').post('', itemsArrSubj[i]);
            subjPromises.push(subjPromise);
          }
          return $q.all(subjPromises);
        });
        promises.push(newPromise);
      }

      function addEntirePerson(obj) {
        var id = $q.defer();

        restAngular.all('persons').post(obj.person).then(function (response) {
          id.resolve(response.id);
        });
        return id.promise;
      }

      function addOrEditPerson(currentObj) {
        if (!objCopy.person) {
          return addEntirePerson(currentObj).then(function (personId) {
            currentObj.person.id = personId;
            return $q.all([
              addArrayOfItems(assembleAddresses(currentObj.addresses), personId, 'addresses'),
              addArrayOfItems(currentObj.contacts, personId, 'contacts'),
              addArrayOfItems(currentObj.names, personId, 'names'),
              addPapersAwardsSubjects(currentObj.papers, currentObj.enrolmentsubjects, personId)
            ]);
          });
        } else {
          return editEntirePerson(currentObj);
        }
      }

      function editEntirePerson(newObj) {
        var promisePerson, personId;

        personId = objCopy.person.id;
        if (!angular.equals(newObj.person, objCopy.person)) {
          promisePerson = restAngular.one('persons', personId).customPUT(newObj.person);
        }

        return $q.all([
          compareArrays(assembleAddresses(newObj.addresses), assembleAddresses(objCopy.addresses),
            personId, 'addresses'),
          compareArrays(newObj.contacts, objCopy.contacts, personId, 'contacts'),
          compareArrays(newObj.names, objCopy.names, personId, 'names'),
          comparePapersAwardsSubjects(newObj.papers, objCopy.papers, newObj.enrolmentsubjects,
            objCopy.enrolmentsubjects, personId),
          promisePerson
        ])
          .then(function () {
            objCopy = {};
          });
      }

      function compareArrays(newArr, oldArr, personId, route) {
        var promises = [];

        _.forEach(newArr, function (item) {
          var promise, oldItem;

          if (!item.personId) {
            item.personId = personId;
            promise = restAngular.one('persons', personId).one(route).customPOST(item);
            promises.push(promise);
          } else {
            oldItem = _.find(oldArr, {
              'id': item.id
            });
            if (!angular.equals(oldItem, item)) {
              promise = restAngular.one('persons', personId).one(route, oldItem.id).customPUT(item);
              promises.push(promise);
            }
          }
        });

        _.forEach(oldArr, function (item) {
          var promise;

          if (!_.some(newArr, {
              'id': item.id
            })) {
            promise = restAngular.one('persons', personId).one(route, item.id).remove();
            promises.push(promise);
          }
        });

        return $q.all(promises);
      }

      function compareSubjectArrays(newArr, oldArr, personId, personPaperId) {
        var promises = [];

        _.forEach(newArr, function (item) {
          var promise, oldItem;

          if (!item.personId) {
            item.personId = personId;
            item.personPaperId = personPaperId;
            promise = restAngular.one('persons', personId).one('enrolmentsubjects').customPOST(item);
            promises.push(promise);
          } else {
            oldItem = _.find(oldArr, {
              'id': item.id
            });
            if (!angular.equals(oldItem, item)) {
              promise = restAngular.one('persons', personId).one('enrolmentsubjects', item.id).customPUT(item);
              promises.push(promise);
            }
          }
        });

        _.forEach(oldArr, function (item) {
          var promise;

          if (!_.some(newArr, {
              'id': item.id
            })) {
            promise = restAngular.one('persons', personId).one('enrolmentsubjects', item.id).remove();
            promises.push(promise);
          }
        });

        return $q.all(promises);
      }

      function comparePapersAwardsSubjects(newArrPapers, oldArrPapers, newArrSubjects, oldArrSubjects, personId) {

        _.forEach(newArrPapers, function (item) {
          var oldItem, newAward, oldAward;

          if (!item.personId) {
            item.personId = personId;
            if (item.hasOwnProperty('award')) {
              addAward(item, personId);
            } else if (item.paperTypeId === 4) {
              addSubjects(item, newArrSubjects, personId);
            } else {
              newPromise = restAngular.one('persons', personId).one('papers').customPOST(item);
              promises.push(newPromise);
            }
          } else {
            oldItem = _.find(oldArrPapers, {
              'id': item.id
            });
            if (item.hasOwnProperty('award')) {
              newAward = {};
              oldAward = {};
              _.merge(newAward, item.award);
              _.merge(oldAward, oldItem.award);
              delete item.award;
              delete oldItem.award;
              if (!angular.equals(oldAward, newAward)) {
                newPromise = restAngular.one('persons', personId).one('awards', newAward.id).customPUT(newAward);
                promises.push(newPromise);
              }
            } else if (item.paperTypeId === 4) {
              compareSubjectArrays(newArrSubjects, oldArrSubjects, personId, item.id);
            }
            if (!angular.equals(oldItem, item)) {
              newPromise = restAngular.one('persons', personId).one('papers', item.id).customPUT(item);
              promises.push(newPromise);
            }
          }
        });

        _.forEach(oldArrPapers, function (item) {
          if (!_.some(newArrPapers, {
              'id': item.id
            })) {
            if (item.hasOwnProperty('award')) {
              var awardToDel = {};

              _.merge(awardToDel, item.award);
              delete item.award;
              promises.push(restAngular.one('persons', personId).one('awards', awardToDel.id).remove());
            } else if (item.paperTypeId === 4) {
              _.forEach(oldArrSubjects, function (enrolmentsubject) {
                promises.push(restAngular.one('persons', personId).one('enrolmentsubjects', enrolmentsubject.id)
                  .remove());
              });
            }
            promises.push(restAngular.one('persons', personId).one('papers', item.id).remove());
          }
        });

        return $q.all(promises);
      }

      function deletePerson(objToDelete) {
        var promises = [],
          personId = objToDelete.person.id;

        promises.push(restAngular.one('persons', personId).remove());

        _.forEach(assembleAddresses(objToDelete.addresses), function (address) {
          promises.push(restAngular.one('persons', personId).one('addresses', address.id).remove());
        });

        _.forEach(objToDelete.contacts, function (contact) {
          promises.push(restAngular.one('persons', personId).one('contacts', contact.id).remove());
        });

        _.forEach(objToDelete.names, function (name) {
          promises.push(restAngular.one('persons', personId).one('names', name.id).remove());
        });

        _.forEach(objToDelete.papers, function (paper) {
          if (paper.hasOwnProperty('award')) {
            var awardToDel = {};

            _.merge(awardToDel, paper.award);
            delete paper.award;
            promises.push(restAngular.one('persons', personId).one('awards', awardToDel.id).remove());
            promises.push(restAngular.one('persons', personId).one('papers', paper.id).remove());
          } else {
            promises.push(restAngular.one('persons', personId).one('papers', paper.id).remove());
          }
        });

        _.forEach(objToDelete.enrolmentsubjects, function (enrolmentsubject) {
          promises.push(restAngular.one('persons', personId).one('enrolmentsubjects', enrolmentsubject.id).remove());
        });

        return $q.all(promises).then(function () {
          objCopy = {};
        });
      }

      function deleteEntirePerson(objToDelete, id) {
        if (!objToDelete.person) {
          return getEntirePerson(id).then(deletePerson);
        } else {
          return deletePerson(objToDelete);
        }
      }

      return {
        getEntirePerson: getEntirePerson,

        addOrEditPerson: addOrEditPerson,

        deleteEntirePerson: function (id) {
          return deleteEntirePerson(objCopy, id);
        },

        clearCopy: function () {
          objCopy = {};
        }
      };
    }]);
