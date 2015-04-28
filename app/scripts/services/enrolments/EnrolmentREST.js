'use strict';

angular
  .module('admissionSystemApp')
  .factory('Enrolment', ['Restangular', '$q', '$filter', function (Restangular, $q, $filter) {

    var restAngular, objCopy;


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

    function getEntireEnrolment(id) {
      var entireEnrolment = {};
      entireEnrolment.enrolment = restAngular.one('enrolment', id).get();
      entireEnrolment.benefits = restAngular.one('enrolment', id).one('benefits').getList();
      entireEnrolment.subjects = restAngular.one('enrolment', id).one('subjects').getList();

      $q.all(entireEnrolment).then(function (res) {
        objCopy = {};
        _.merge(objCopy, res);
      });
      return $q.all(entireEnrolment);
    }


  }]);
