'use strict';

angular.module('admissionSystemApp')
  .controller('HeaderCtrl', ['AuthorizationSvc', '$state', function (AuthorizationSvc, $state) {
    var header = this;
    
    header.logout = function () {
      AuthorizationSvc.logout();
    };

  }]);
