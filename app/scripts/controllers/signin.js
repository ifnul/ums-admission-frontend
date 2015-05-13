'use strict';

angular
	.module('admissionSystemApp')
  .controller('SigninCtrl', ['$scope', 'AuthorizationSvc',
    function ($scope, AuthorizationSvc) {
      // atob()
      var signin = this;

      signin.auth = {};
      signin.auth.isRemember = false;

      signin.clicked = function (login, password, isRemember) {
        AuthorizationSvc.checkIfAuthorized(login, password, isRemember);
      };

    }]);
