'use strict';


angular.module('admissionSystemApp')
  .controller('ListPersonCtrl', function($scope, personDecodeServise, SpecofferDictionaryService) {

    $scope.dataDecoded = [];
    
    SpecofferDictionaryService.getPersons().then(function (rawPersons) {
      personDecodeServise.personDecoded(rawPersons).then(function (decodedPersons) {
        $scope.dataDecoded = decodedPersons;
      });
    });

    $scope.filters = [
      {
        title: 'Стать',
        property: 'genderTypeId',
        length: 3,
        content: [  { id: 1, name: 'Стать чоловіча' } ,
                    { id: 2, name: 'Стать жіноча' } ,
                    { id: 3, name: 'Стать не визначена' }  ],
        open: true
      },
      {
        title: 'Тип персони',
        property: 'personTypeId',
        length: 6,
        content: [  { id: 1, name: 'абітурієнт' } ,
                    { id: 2, name: 'студент' } ,
                    { id: 3, name: 'науковець' } ,
                    { id: 4, name: 'працівник' } ,
                    { id: 5, name: 'випускник' } ,
                    { id: 10, name: 'сторонній' }  ],
        open: true
      },
      {
        title: 'Потреба в гуртожитку',
        property: 'isHostel',
        length: 2,
        content: [  { id: 1, name: 'Потребує гуртожитку' } ,
                    { id: 2, name: 'Не потребує гуртожитку' }  ],
        open: true
      },
      {
        title: 'Військовозобов\'яз.',
        property: 'isMilitary',
        length: 2,
        content: [  { id: 1, name: 'Військовозобов\'яз.' } ,
                    { id: 2, name: 'не є військовозобов\'яз.' }  ],
        open: true
      },
      {
        title: 'Резидент',
        property: 'resident',

        content: [  { id: 1, name: 'іноземець' } ,
                    { id: 2, name: 'не є іноземцем' }  ],
        open: true
      }
    ];

    $scope.search = [
      {
        title: 'призвіщу',
        property: 'surname'
      },
      {
        title: 'номеру ОС',
        property: 'docNum'
      },
      {
        title: 'серії ОС',
        property: 'docSeries'
      },
    ];

    $scope.headers = [
      { name: 'id', display: 'id', visible: false }, 
      { name: 'name', display: 'ПІБ', visible: true }, 
      { name: 'firstName', display: 'Ім’я', visible: false }, 
      { name: 'fatherName', display: 'По-батькові', visible: false }, 
      { name: 'surname', display: 'Прізвище', visible: false }, 
      { name: 'personTypeId', display: 'Тип персони', visible: true },
      { name: 'genderTypeId', display: 'Стать', visible: true }, 
      { name: 'marriedTypeId', display: 'Сімейний стан', visible: true }, 
      { name: 'citizenCountryId',  display: 'Громад-во',  visible: true }, 
      { name: 'docSeries',  display: 'Серія ОС',  visible: true }, 
      { name: 'docNum',  display: 'Номер ОС',  visible: true }, 
      { name: 'resident',  display: 'Резидент',  visible: true }, 
      { name: 'birthPlace',  display: 'Місце народж.',  visible: true }, 
      { name: 'begDate', display: 'Дата народж.', visible: true }, 
      { name: 'isMilitary', display: 'ВЗ', visible: true }, 
      { name: 'isHostel', display: 'Гуртожиток', visible: true }, 
      { name: 'identifier', display: 'Мат. відп', visible: false }
    ];


  });