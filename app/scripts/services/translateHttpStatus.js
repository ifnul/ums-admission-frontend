'use strict';

angular.module('admissionSystemApp')
  .factory('translHttpStatusSvc', ['toaster', function (toaster) {

    function translator(obj) {
      if (obj.message === 'Entity doesn\'t exist') {
        return {
          type: 'error',
          title: 'Помилка пошуку!',
          body: 'За даним запитом нічого не знайдено.' +
                'Будь-ласка, перевірте правильність запиту'
        };
      }
      switch (obj.httpCode) {
      case 401:
        return {
          type: 'error',
          title: 'Помилка авторизації',
          body: 'Будь-ласка, авторизуйтесь!'
        };
      case 404:
        return {
          type: 'error',
          title: 'Помилка пошуку!',
          body: 'За даним запитом нічого не знайдено.' +
                'Будь-ласка, перевірте правильність запиту'
        };
      case 400:
        return {
          type: 'error',
          title: 'Неправильний запит!',
          body: 'Будь-ласка, сформуйте правильний запит!'
        };
      case 408:
        return {
          type: 'error',
          title: 'Помилка!',
          body: 'Час очікування відповіді від сервера вийшов'
        };
      case 503:
        return {
          type: 'error',
          title: 'Помилка з\'єднання',
          body: 'Виникли проблема з підключенням до мережі Інтернет'
        };
      case 422:
        return {
          type: 'error',
          title: 'Невірні данні!',
          body: 'Відправлені дані не відповідають вим'
        };
      case 500:
        return {
          type: 'error',
          title: 'Помилка сервера',
          body: ''
        };
      }
    }

    return {
      translate: function (statusObj) {
        return translator(statusObj);
      },
      notifyAboutError: function (obj) {
        toaster.pop(translator({
          'httpCode': obj.status
        }));
      }
    };
  }]);
