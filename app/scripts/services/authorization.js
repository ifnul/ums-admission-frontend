'use strict';

angular
  .module('admissionSystemApp')
  .factory('AuthorizationSvc', ['$http', 'Constants', 'Restangular',
    'toaster', '$state', '$sessionStorage', '$localStorage',
    function ($http, Constants, Restangular, toaster, $state, $sessionStorage, $localStorage) {
      var token;

      function checkIfAuthorized (login, password, isRemember) {
        token = btoa(login + ':' + password); // encode a string

        switch (isRemember) {
          case true:
            $localStorage.token = token;
            break;
          case false:
            $sessionStorage.token = token;
            break;
        }

        Restangular
          .one('sessions', 'current')
          .get('', {
            Authorization: 'Basic ' + token
          })
        .then(function (res) {
          if (res.login === 'admin') {
            $state.go('root.person.list');
          }
          console.log('res', res);
        }, function (error) {
          if (error.status === 401) {
            toaster.pop('error', 'Введено невірний логін або пароль');
          }
        });
      }

      return {
        checkIfAuthorized: checkIfAuthorized,
        logout: function () {
          delete $localStorage.token;
          delete $sessionStorage.token;
          $state.go('root.signin');
        }
      };
    }]);
