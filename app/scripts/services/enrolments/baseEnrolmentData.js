'use strict';

angular.module('admissionSystemApp')
  .value('baseEnrolmentData', {
    filters: [
        {
          title: 'Бюджет',
          property: 'isState',
          length: 2,
          content: [  { id: 1, name: 'Бюджетна ф.н.' } ,
                      { id: 2, name: 'Не бюджетна' } ],
          open: true
        },
        {
          title: 'Контракт',
          property: 'isContract',
          length: 2,
          content: [  { id: 1, name: 'Контактна ф.н.' } ,
                      { id: 2, name: 'Не контрактна' } ],
          open: true
        },
        {
          title: 'Наявність пільги',
          property: 'isPrivilege',
          length: 2,
          content: [  { id: 1, name: 'Пільга наявна' } ,
                      { id: 2, name: 'немає пільг' } ],
          open: true
        },
        {
          title: 'Потреба в гуртож.',
          property: 'isHostel',
          length: 2,
          content: [  { id: 1, name: 'Потребує гуртож.' } ,
                      { id: 2, name: 'Не потребує гуртож.' } ],
          open: true
        },
        {
          title: 'Тип поступленя',
          property: 'enrolmentTypeId',
          length: 0,
          content: [],
          open: false
        },
        {
          title: 'Підрозділ',
          property: 'departmentId',
          length: 0,
          content: [],
          open: false
        }
      ],
    search: [
        {
          title: 'ідетиф. персони (id)',
          property: 'personId'
        },
        {
          title: 'серії док.',
          property: 'docSeries'
        },
        {
          title: 'номеру док.',
          property: 'docNum'
        },
        {
          title: 'ідетиф. пропозиції (id)',
          property: 'specOfferId'
        },
        {
          title: 'ідетиф. док. персони (id)',
          property: 'personPaperId'
        },
        {
          title: 'даті створення заяви (РРР-ММ-ДД)',
          property: 'evDate'
        },
        {
          title: 'пріоритету (0-15)',
          property: 'priority'
        }
      ],
    headers: [
        { name: 'id', display: '№', visible: true }, 
        { name: 'personId', display: 'Персона', visible: true }, 
        { name: 'specOfferId', display: 'Пропозиція (id)', visible: true }, 
        { name: 'isState', display: 'Бюджет', visible: true }, 
        { name: 'isContract', display: 'Контракт', visible: true }, 
        { name: 'departmentId', display: 'Підрозділ', visible: true }, 
        { name: 'personPaperId', display: 'Документи персони', visible: false }, 
        { name: 'mark', display: 'Загальний бал', visible: false }, 
        { name: 'isPrivilege',  display: 'Наявність пільг',  visible: true }, 
        { name: 'docSeries',  display: 'Серія док.',  visible: true }, 
        { name: 'docNum',  display: 'Номер док.',  visible: true }, 
        { name: 'isHostel',  display: 'Потреб. гуртож',  visible: true }, 
        { name: 'enrolmentTypeId',  display: 'Тип поступлення',  visible: true }, 
        { name: 'evDate', display: 'Дата створення', visible: false }, 
        { name: 'begDate', display: 'Дата дії (з)', visible: true }, 
        { name: 'endDate', display: 'Дата дії (по)', visible: false }, 
        { name: 'parentId', display: 'Ієрарх. ідетиф.', visible: false }
      ],
    expandFilters: function(data, prop) {
      var neededObj = _.find(this.filters, {
        'property': prop
      });  
      neededObj.length = data.length;
      _.forEach(data, function (value) {
        var opt = {id: value.id, name: value.name };
        neededObj.content.push(opt);
      });    
    },
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
      ]
  });
