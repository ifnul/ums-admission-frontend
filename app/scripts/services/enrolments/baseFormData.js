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
        title: 'Отримую освіту'
      },
      {
        value: 11,
        title: 'Є вища освіта'
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
        route: {
          new: 'root.enrolment.new.main',
          edit: 'root.enrolment.edit.main'
        }
      },
      {
        heading: 'Пільги',
        route: {
          new: 'root.enrolment.new.benefits',
          edit: 'root.enrolment.edit.benefits'
        }
      },
      {
        heading: 'Предмети ЗНО',
        route: {
          new: 'root.enrolment.new.enrolmentsubjects',
          edit: 'root.enrolment.edit.enrolmentsubjects'
        }
      },
      {
        heading: 'Статус заяви',
        route: {
          new: 'root.enrolment.new.statuses',
          edit: 'root.enrolment.edit.statuses'
        }
      }
   ]
  });
