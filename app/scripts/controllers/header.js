'use strict';

angular.module('admissionSystemApp')
  .controller('HeaderCtrl', ['AuthorizationSvc', function (AuthorizationSvc) {
    var header = this;

    header.logout = function () {
      AuthorizationSvc.logout();
    };

  }]);
