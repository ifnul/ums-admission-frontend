'use strict';

angular.module('admissionSystemApp')
  .constant('Constants', {
    basicURL: 'http://104.236.29.16:8080/is-lnu-rest-api/api/',
    BasicAuth: 'Basic YWRtaW46bmltZGE='
  })
  .constant('_', window._);
