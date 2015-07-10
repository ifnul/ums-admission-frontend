'use strict';

angular
  .module('admissionSystemApp')
  .factory('EnrolmentModel', ['Restangular', '$q', '$filter', function (Restangular, $q, $filter) {

    var restAngular, objCopy;

    /**
     * @type {{object}} entire enrolment model
     */
    var today = $filter('date')(new Date(),'yyyy-MM-dd');
    var entireEnrolment = {};
    entireEnrolment.enrolment = {};
    entireEnrolment.enrolment.evDate = today;
    entireEnrolment.enrolment.begDate = today;
    entireEnrolment.enrolment.endDate = "";
    entireEnrolment.enrolment.isContract = 1;
    entireEnrolment.enrolment.isState = 1;
    entireEnrolment.enrolment.isInterview = 0;
    entireEnrolment.enrolment.isEducationState = 0;
    entireEnrolment.enrolment.enrolmentTypeId = 32;
    entireEnrolment.enrolmentsubjects = [];
    entireEnrolment.benefits = [];
    entireEnrolment.statuses = [];

    /**
     * clear EntireEnrolment object (set it to default values)
     */
    function clearEntireEnrolment () {
      entireEnrolment = {};
      entireEnrolment.enrolment = {};
      entireEnrolment.enrolment.evDate = today;
      entireEnrolment.enrolment.begDate = today;
      entireEnrolment.enrolment.endDate = "";
      entireEnrolment.enrolment.isContract = 1;
      entireEnrolment.enrolment.isState = 1;
      entireEnrolment.enrolment.isInterview = 0;
      entireEnrolment.enrolment.isEducationState = 0;
      entireEnrolment.enrolment.enrolmentTypeId = 32;
      entireEnrolment.enrolmentsubjects = [];
      entireEnrolment.benefits = [];
      entireEnrolment.statuses = [];
    }

      /**
       * restAngular configuration
       * applying only to rest action of this servise
       */
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

      /**
       * get entire enrolment entireEnrolment = {enrolment: [], benefits: [], enrolmentssubject: [], statuses : {}}
       * @param id - id of enrolment which need to be retreived
       * @returns {Promise} - return entireEnrolment obj
       */
    function getEntireEnrolment(id) {
        var entire = {};
        entire.enrolment = restAngular.one('enrolments', id).get();
        entire.benefits = restAngular.one('enrolments', id).one('benefits').getList();
        entire.enrolmentsubjects = restAngular.one('enrolments', id).one('enrolmentsubjects').getList();
        entire.statuses = restAngular.one('enrolments', id).one('statuses').getList();

      $q.all(entire).then(function (res) {
        objCopy = {};
        _.merge(objCopy, res);
        _.merge(entireEnrolment, res);
      });
      return $q.all(entire);  // note: this promise is never used!
    }

      /**
       * send array of items (enrolment | benefits | enrolmentssubject | statuses) to server
       * @param itemsArr {array} -
       * @param enrolmentId {number} - id
       * @param route {stirng} route to put data
       * @returns {Promise} with result
       */
    function addArrayOfItems(itemsArr, enrolmentId, route) {
      var promises, benefitPromise, i;

      promises = [];
      for (i = 0; i < itemsArr.length; i += 1) {
        itemsArr[i].enrolmentId = enrolmentId;
        benefitPromise = restAngular.one('enrolments', enrolmentId).one(route).post('', itemsArr[i]);
        promises.push(benefitPromise);
      }
      return $q.all(promises);
    }

      /**
       * adding only enrolment object (it's single objedct)
       * @param enrolment {object}
       * @returns {promise} with id (server give ID to new enrolment)
       */
    function addEntireEnrolment(enrolment) {
      var id = $q.defer();

      restAngular.all('enrolments').post(enrolment).then(function (response) {
        id.resolve(response.id);
      }, function(err) {
        id.reject(err);
      });
      return id.promise;
    }

      /**
       * !! STARTING FUNCTION !!
       * decide if entire specoffer need to be edit (put) or add (post)
       * @param currentObj - entire specoffer obj;
       * like this: {enrolment: [], benefits: [], enrolmentssubject: [], statuses : {}}
       */
    function addOrEditEnrolment() {
      if (!objCopy.enrolment) {
        console.log('entireEnrolment', entireEnrolment);
        return addEntireEnrolment(entireEnrolment.enrolment).then(function (enrolmentId) {
          console.log('enrolmentId', enrolmentId);
          entireEnrolment.enrolment.id = enrolmentId;
          return $q.all([
            addArrayOfItems(entireEnrolment.enrolmentsubjects, enrolmentId, 'enrolmentsubjects'),
            addArrayOfItems(entireEnrolment.benefits, enrolmentId, 'benefits'),
            addArrayOfItems(entireEnrolment.statuses, enrolmentId, 'statuses')
          ]);
        }, function(err) {
          console.log(err);
          return err;
        });
      } else {
        return editEntireEnrolment(entireEnrolment);
      }
    }

      /**
       * MAIN function for editing entire enrolment
       * manipulate with objCopy to compare if property change or not (and than do aciton or not)
       * objCopy {object} - is a copy that was made than data comes from server (see getEntireEnrolment func)
       * @param newOnj
       */
    function editEntireEnrolment(newOnj) {
      var enrolmentId, promiseSpecoffer;

      enrolmentId = objCopy.enrolment.id;
      if (!angular.equals(newOnj.enrolment, objCopy.enrolment)) {
        promiseSpecoffer = restAngular.one('enrolments', enrolmentId).customPUT(newOnj.enrolment);
      }

      return $q.all([
        compareArrays(newOnj.enrolmentsubjects, objCopy.enrolmentsubjects, enrolmentId, 'enrolmentsubjects'),
        compareArrays(newOnj.benefits, objCopy.benefits, enrolmentId, 'benefits'),
        compareArrays(newOnj.statuses, objCopy.statuses, enrolmentId, 'statuses'),
        promiseSpecoffer
      ])
        .then(function () {
          objCopy = {};
        });
    }

      /**
       * - if item doesn't have id property - POST NEW item.
       * - else check if item correspond the items with same ID in oldAdd. If false - PUT it.
       * - check if there are there are deleted items
       * @param newArr {array} e.g. [{id: '2', note: 'some note'}, {...}]
       * @param oldArr {array}
       * @param enrolmentId {number}
       * @param route {string}
       * @returns {Promise}
       */
    function compareArrays(newArr, oldArr, enrolmentId, route) {

      var promises = [];

      _.forEach(newArr, function (item) {
        var promise, oldItem;

        if (!item.enrolmentId) {
          item.enrolmentId = enrolmentId;
          promise = restAngular.one('enrolments', enrolmentId).one(route).customPOST(item);
          promises.push(promise);
        } else {
          oldItem = _.find(oldArr, {
            'id': item.id
          });
          if (!angular.equals(oldItem, item)) {
            promise = restAngular.one('enrolments', enrolmentId).one(route, oldItem.id).customPUT(item);
            promises.push(promise);
          }
        }
      });

      _.forEach(oldArr, function (item) {
        var promise;

        if (!_.some(newArr, {
            'id': item.id
          })) {
          promise = restAngular.one('enrolments', enrolmentId).one(route, item.id).remove();
          promises.push(promise);
        }
      });

      return $q.all(promises);
    }

      /**
       * produce deleting
       * @param objToDelete
       * @returns {*}
       */
    function deleteEnrolment(objToDelete) {
      var promises = [],
        enrolmentId = objToDelete.enrolment.id;

      promises.push(restAngular.one('enrolments', enrolmentId).remove());

      _.forEach(objToDelete.benefits, function (benefit) {
        promises.push(restAngular.one('enrolments', enrolmentId).one('benefits', benefit.id).remove());
      });

      _.forEach(objToDelete.enrolmentsubjects, function (subject) {
        promises.push(restAngular.one('enrolments', enrolmentId).one('enrolmentsubjects', subject.id).remove());
      });

      _.forEach(objToDelete.statuses, function (statuses) {
        promises.push(restAngular.one('enrolments', enrolmentId).one('statuses', statuses.id).remove());
      });

      return $q.all(promises).then(function () {
        objCopy = {};
      });
    }


      /**
       * delete entire enrolment form the server
       * @param objToDelete  - obj which need to be deleted
       * @param id
       * @returns {*}
       */
    function deleteEntireEnrolment(objToDelete, id) {
      if (!objToDelete.enrolment) {
        return getEntireEnrolment(id).then(deleteEnrolment);
      } else {
        return deleteEnrolment(objToDelete);
      }
    }

      /**
       * PUBLIC METHODS!
       */
    return {
      getEntireEnrolment: getEntireEnrolment,

      addOrEditEnrolment: addOrEditEnrolment,

      deleteEntireEnrolment: function (id) {
        return deleteEntireEnrolment(objCopy, id);
      },
      clearCopy: function () {
        objCopy = {};
      },
      clearEntireEnrolment: function () {
        clearEntireEnrolment();
      },
      enrolmentObj: function() {
        return entireEnrolment.enrolment;
      },
      enrolmentSubjectsArr: function() {
        return entireEnrolment.enrolmentsubjects;
      },
      benefitsArr: function() {
        return entireEnrolment.benefits;
      },
      statusesArr: function() {
        return entireEnrolment.statuses;
      }
    }
  }]);
