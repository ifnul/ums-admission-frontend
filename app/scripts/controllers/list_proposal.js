'use strict';

/**
 * @ngdoc function
 * @name admissionSystemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the admissionSystemApp
 */
angular.module('admissionSystemApp')
  .controller('ListProposalCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })

  .controller('mainTable', function($scope){
    $scope.headers = ['Напрям', 'Назва', 'Форма', 'Орк','Структурний підрозділ', 'Ліц.обсяг', 'Держю замовлення','Термю навч.', 'Дата початку'];
    //$scope.rows = ['6.44.3242', 'Філологія', 'Денна', 'Бакалавр','Факультет іноземних мов', '43', '0','4', '01.09.2015'];
    $scope.rows = [
      {direct: '6.44.3242', name: 'Філологія', forma: "Денна", ork: "Бакалавр", struc: 'Факультет іноземних мов',lic: '43', state: '0', period: "4",data: "01.09.2015"},
      {direct: '6.44.3242', name: 'Філологія', forma: "Денна", ork: "Бакалавр", struc: 'Факультет іноземних мов',lic: '43', state: '0', period: "4",data: "01.09.2015"}
    ];

    $scope.show = {};
    for(var key in $scope.headers){
      $scope.show[key] = true;
    }
  });
