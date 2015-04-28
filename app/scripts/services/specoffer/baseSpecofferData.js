'use strict';

angular.module('admissionSystemApp')
  .constant('baseSpecofferData', {
    headers: [
      {
        name: 'id',
        display: '№',
        visible: true
      },
      {
        name: 'specialtyId',
        display: 'Спеціальність',
        visible: true
      },
      {
        name: 'cipher',
        display: 'Шифр',
        visible: true
      },
      {
        name: 'departmentId',
        display: 'Структурний підрозділ',
        visible: true
      },
      {
        name: 'timePeriodCourseId',
        display: 'Курс зарахування',
        visible: true
      },
      {
        name: 'specofferTypeId',
        display: 'Тип пропозиції',
        visible: true
      },
      {
        name: 'educationFormTypeId',
        display: 'Форма навчання',
        visible: true
      },
      {
        name: 'licCount',
        display: 'Ліцензований обсяг',
        visible: true
      },
      {
        name: 'stateCount',
        display: 'Державне замовлення',
        visible: true
      }
    ]
  });
