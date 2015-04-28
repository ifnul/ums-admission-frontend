'use strict';

angular.module('admissionSystemApp')
  .service('Cookies', function () {
    this.setCookie = function (cname, cvalue, exdays) {
      var d, expires;

      d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + '; ' + expires;
    };

    this.getCookie = function (cname) {
      var name, ca, c, i;

      name = cname + '=';
      ca = document.cookie.split(';');
      for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return parseInt(c.substring(name.length, c.length));
        }
      }
      return undefined;
    };
  });
