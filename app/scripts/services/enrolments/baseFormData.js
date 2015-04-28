'use strict';

angular
  .module('admissionSystemApp')
  .constant('baseFormData', {
    searchPerson: [
        {
          title: 'по ПІБ',
          route: 'persons',
          property: 'name'
        },
        {
          title: 'по призвіщу',
          route: 'persons',
          property: 'surname'
        },
        {
          title: 'по id персони',
          route: 'persons',
          property: 'id'
        },
        {
          title: 'по номеру документу',
          route: 'persons/papers',
          property: 'docNum',
          propertyFaculty: 'docSeries'
        }
      ],
    isedustateOpt: [
      {
        value: 0,
        title: 'Не отримую освіти'
      },
      {
        value: 1,
        title: 'Не отримую освіти'
      },
      {
        value: 11,
        title: 'Не отримую освіти'
      }],
    isinterviewOpt: [
      {
        value: -1,
        title: 'Не пройшов співбесіду'
      },
      {
        value: 0,
        title: 'Не потрібно співбесіди'
      },
      {
        value: 1,
        title: 'Потрібна співбесіда'
      },
      {
        value: 11,
        title: 'Співпебісда пройдена'
      }],
    tabs: [
      {
        heading: 'Основна інформація',
        route: 'edit-enrolment.tab-enrolment'
      },
      {
        heading: 'Пільги',
        route: 'edit-enrolment.tab-benefits'
      },
      {
        heading: 'Предмети ЗНО',
        route: 'edit-enrolment.tab-enrolmentsubjects'
      },
      {
        heading: 'Статус заяви',
        route: 'edit-enrolment.tab-statuses'
      }
   ]
  });
