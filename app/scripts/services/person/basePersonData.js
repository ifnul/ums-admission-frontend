'use strict';

angular
  .module('admissionSystemApp')
  .constant('basePersonData', {
    filters: [
      {
        title: 'Стать',
        property: 'genderTypeId',
        length: 3,
        content: [
          {
            id: 1, name: 'Стать чоловіча'
          } , {
            id: 2, name: 'Стать жіноча'
          } , {
            id: 3, name: 'Стать не визначена'
          }],
        open: true
      },
      {
        title: 'Тип персони',
        property: 'personTypeId',
        length: 6,
        content: [
          {
            id: 1, name: 'абітурієнт'
          } , {
            id: 2, name: 'студент'
          } , {
            id: 3, name: 'науковець'
          } , {
            id: 4, name: 'працівник'
          } , {
            id: 5, name: 'випускник'
          } , {
            id: 10, name: 'сторонній'
          }
        ],
        open: true
      },
      {
        title: 'Потреба в гуртожитку',
        property: 'isHostel',
        length: 2,
        content: [
          {
            id: 1, name: 'Потребує гуртожитку'
          } , {
            id: 2, name: 'Не потребує гуртожитку'
          }
        ],
        open: true
      },
      {
        title: 'Військовозобов\'яз.',
        property: 'isMilitary',
        length: 2,
        content: [
          {
            id: 1, name: 'Військовозобов\'яз.'
          } , {
            id: 2, name: 'не є військовозобов\'яз.'
          }
        ],
        open: true
      },
      {
        title: 'Резидент',
        property: 'resident',

        content: [
          {
            id: 1, name: 'іноземець'
          } , {
            id: 2, name: 'не є іноземцем'
          }
        ],
        open: true
      }
    ],
    search: [
      {
        title: 'призвіщу',
        property: 'surname'
      },
      {
        title: 'id персони',
        property: 'id'
      },
      {
        title: 'номеру ОС',
        property: 'docNum'
      },
      {
        title: 'серії ОС',
        property: 'docSeries'
      }
    ],
    headers: [
      {
        name: 'id',
        display: '№',
        visible: true
      },
      {
        name: 'name',
        display: 'ПІБ',
        visible: true
      },
      {
        name: 'firstName',
        display: 'Ім’я',
        visible: false
      },
      {
        name: 'fatherName',
        display: 'По-батькові',
        visible: false
      },
      {
        name: 'surname',
        display: 'Прізвище',
        visible: false
      },
      {
        name: 'personTypeId',
        display: 'Тип персони',
        visible: true
      },      {
        name: 'genderTypeId',
        display: 'Стать',
        visible: true
      },
      {
        name: 'marriedTypeId',
        display: 'Сімейний стан',
        visible: true
      },
      {
        name: 'citizenCountryId',
        display: 'Громад-во',
        visible: true
      },
      {
        name: 'docSeries',
        display: 'Серія ОС',
        visible: true
      },
      {
        name: 'docNum',
        display: 'Номер ОС',
        visible: true
      },
      {
        name: 'resident',
        display: 'Резидент',
        visible: true
      },
      {
        name: 'birthPlace',
        display: 'Місце народж.',
        visible: true
      },
      {
        name: 'begDate',
        display: 'Дата народж.',
        visible: true
      },
      {
        name: 'isMilitary',
        display: 'ВЗ',
        visible: true
      },
      {
        name: 'isHostel',
        display: 'Гуртожиток',
        visible: true
      },
      {
        name: 'identifier',
        display: 'Мат. відп',
        visible: false
      }
    ],
    tabs: [
      {
        heading: 'Основна інформація',
        route: {
          new: 'root.person.new.main',
          edit: 'root.person.edit.main'
        }
      },
      {
        heading: 'Адреса',
        route: {
          new: 'root.person.new.addresses',
          edit: 'root.person.edit.addresses'
        }
      },
      {
        heading: 'Контакти',
        route: {
          new: 'root.person.new.contacts',
          edit: 'root.person.edit.contacts'
        }
      },
      {
        heading: 'Документи',
        route: {
          new: 'root.person.new.papers',
          edit: 'root.person.edit.papers'
        }
      },
      {
        heading: 'Предмети ЗНО',
        route: {
          new: 'root.person.new.personsubjects',
          edit: 'root.person.edit.personsubjects'
        }
      },
      {
        heading: 'Заяви',
        route: {
          new: 'root.person.new.enrolments',
          edit: 'root.person.edit.enrolments'
        }
      }
   ],
    tabsView: [
      {
        heading: 'Персона',
        route: 'root.person.view.main'
      },
      {
        heading: 'Заяви',
        route: 'root.person.view.enrolments'
      }
    ]
  });
