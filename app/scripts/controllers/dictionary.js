'use strict';


angular.module('admissionSystemApp')
  .controller('dictionaryCtrl', ['$scope', 'ngTableParams', 'SpecofferDictionaryService',
    function ($scope, NgTableParams, SpecofferDictionaryService) {

      $scope.newData=[];

      $scope.dictionaries = [
        {name: 'Довідник типів часових періодів', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Hазва'}
        ], id:1, dict: function() {SpecofferDictionaryService.getTimeperiodsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів спеціальностей', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип спеціальності'}
        ], id:2, dict: function() {SpecofferDictionaryService.getSpecialtiesTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Напрями та спеціальності', headers: [
          {dictKey: 'abbrName', dictHeader: 'Абревіатура спеціальності'},
          {dictKey: 'name', dictHeader: 'Назва спеціальності'},
          {dictKey: 'cipher', dictHeader: 'Шифр спеціальності'},
          {dictKey: 'begdate', dictHeader: 'Дата початку'},
          {dictKey: 'enddate', dictHeader: 'Дата закінчення'},
          {dictKey: 'specialtyTypeId', dictHeader: 'Ідентифікатор типу спеціальності'},
          {dictKey: 'parentId', dictHeader: 'Ієрархічний ідентифікатор'}
        ], id:3, dict: function() {SpecofferDictionaryService.getAllSpecialties().then(function (data){$scope.newData = data;})}},
        {name: 'Інформація про підрозділи', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Назва підрозділу'},
          {dictKey: 'manager', dictHeader: 'Керівник підрозділу'},
          {dictKey: 'begdate', dictHeader: 'Дата створення підрозділу'},
          {dictKey: 'enddate', dictHeader: 'Дата закриття підрозділу'},
          {dictKey: 'identifir', dictHeader: 'Внутрішньо університетський ідентифікатор'},
          {dictKey: 'departmentTypeId', dictHeader: 'Ідентифікатор типу підрозділу'},
          {dictKey: 'orderId', dictHeader: 'Ідентифікатор наказу'},
          {dictKey: 'parentId', dictHeader: 'Ієрархічний ідентифікатор'}
        ], id:4, dict: function() {SpecofferDictionaryService.getAllDepartments().then(function (data){$scope.newData = data;})}},
        {name: 'Тип пропозиції', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Hазва'},
          {dictKey: 'specialtyTypeId', dictHeader: 'Ідентифікатор довідника типів спеціальностей'}
        ], id:5, dict: function() {SpecofferDictionaryService.getSpecoffersTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник форм навчання', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип форми навчання'}
        ], id:6, dict: function() {SpecofferDictionaryService.getEduformTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів пільг', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип пільги'},
          {dictKey: 'priority', dictHeader: 'Квота (1 - квота, 0 - пільга)'},
          {dictKey: 'parentId', dictHeader: 'Ієрархічний ідентифікатор'}
        ], id:7, dict: function() {SpecofferDictionaryService.getBenefitsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Дані про пільги', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Назва пільги'},
          {dictKey: 'begDate', dictHeader: 'Дата початку переваги'},
          {dictKey: 'endDate', dictHeader: 'Дата закінчення переваги'},
          {dictKey: 'description', dictHeader: 'Опис'},
          {dictKey: 'identifier', dictHeader: 'Інформація про коди пільг вступу'},
          {dictKey: 'benefitTypeId', dictHeader: 'Тип пільги'},
          {dictKey: 'parentId', dictHeader: 'Ієрархічний ідентифікатор'}
        ], id:8, dict: function() {SpecofferDictionaryService.getBenefits().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типу персон', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип персони'}
        ], id: 9, dict: function() {SpecofferDictionaryService.getPersonsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник статі персон', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Стать персони'}
        ], id: 10, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник сімейного стану', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип персони'}
        ], id:11, dict: function() {SpecofferDictionaryService.getMarriedTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів адмістративно-територіальних одиниць', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип адіністративно-територіальної одиниці'}
        ], id:12, dict: function() {SpecofferDictionaryService.getAdminUnitsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Адміністративно-територіальні одиниці', headers: [
          {dictKey: 'name', dictHeader: 'Назва адміністративно-територіальної одиниці'},
          {dictKey: 'fullName', dictHeader: 'Повна назва адміністративно-територіальної одиниці'},
          {dictKey: 'begDate', dictHeader: 'Дата початку'},
          {dictKey: 'endDate', dictHeader: 'Дата кінця'},
          {dictKey: 'adminUnitTypeId',dictHeader: 'Ідентифікатор типу адміністративно-територіальної одиниці'},
          {dictKey: 'identifier', dictHeader: 'Ідентифікатор КОАТУУ адміністративно-територіальної одиниці'},
          {dictKey: 'identifier1', dictHeader: 'Обласний ідентифікатор КОАТУУ адміністративно-територіальних одиниць'},
          {dictKey: 'identifier2', dictHeader: 'Районний ідентифікатор КОАТУУ адміністративно-територіальних одиниць'},
          {dictKey: 'identifier3', dictHeader: 'Місцевий ідентифікатор КОАТУУ адміністративно-територіальних одиниць'},
          {dictKey: 'parentId', dictHeader: 'Ієрархічний ідентифікатор'}
        ], id: 13, dict: function() {SpecofferDictionaryService.getAdminUnits().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типу адрес', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип адреси'}
        ], id: 14, dict: function() {SpecofferDictionaryService.getAddressTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів контактів', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип контакту'}
        ], id: 15, dict: function() {SpecofferDictionaryService.getContactsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типу публічних активностей', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип публічної активності'}
          ], id: 16, dict: function() {SpecofferDictionaryService.getPublicActivitiesTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Нагороди за публічні заходи', headers: [
          {dictKey: 'awardName', dictHeader: 'назва нагороди публічної активності'},
          {dictKey: 'bonus', dictHeader: 'Бонус додаткові бали за публічну активність'},
          {dictKey: 'begDate', dictHeader: 'Дата початку'},
          {dictKey: 'endDate', dictHeader: 'Дата закінчення'},
          {dictKey: 'publicActivityId', dictHeader: 'Ідинтифікатор публічної активаності'},
          {dictKey: 'enrolmentSubjectId', dictHeader: 'Ідентифікатор дисципліни ЗНО абітурієнта'}
        ], id: 17, dict: function() {SpecofferDictionaryService.getPublicActivitiesAwards().then(function (data){$scope.newData = data;})}},
        {name: 'Публічні активності', headers: [
          {dictKey: 'name', dictHeader: 'Назва активності'},
          {dictKey: 'begdate', dictHeader: 'Дата початку'},
          {dictKey: 'enddate', dictHeader: 'Дата закінчення'},
          {dictKey: 'publicActivityTypeId', dictHeader: 'Індитифікатор типу публічної активності'},
          {dictKey: 'timePeriodId', dictHeader: 'Ідинтифікатор часового періоду'}
          ], id:18, dict: function() {SpecofferDictionaryService.getPublicActivities().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник придметів ЗНО', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Назва предмету ЗНО'},
          {dictKey: 'isTesting', dictHeader: 'Чи є предмет в списку предметів ЗНО'},
          {dictKey: 'parentId', dictHeader: 'Iєрархічний ідентифікатор'}
          ], id:19, dict: function() {SpecofferDictionaryService.getEnrolmentsSubjects().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів відзнак', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип відзнаки'}
          ], id:20, dict: function() {SpecofferDictionaryService.getHonorsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів використання документів', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип використання документу'}
          ], id:21, dict: function() {SpecofferDictionaryService.getPaperUsages().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів документів', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип документу'},
          {dictKey: 'paperUsageId', dictHeader: 'Ідинтифікатор типу використання документу'}
          ], id:22, dict: function() {SpecofferDictionaryService.getPaperTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів поступлень', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Назва поступлення'},
          {dictKey: 'parentId', dictHeader: 'Iєрархічний ідентифікатор'}
          ], id:23, dict: function() {SpecofferDictionaryService.getEnrolmentsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів статусу заявки', headers: [
          {dictKey: 'abbrName', dictHeader: 'Скорочена назва'},
          {dictKey: 'name', dictHeader: 'Тип статусу'},
          {dictKey: 'description', dictHeader: 'Опис'}
          ], id:24, dict: function() {SpecofferDictionaryService.getEnrolmentsStatusTypes().then(function (data){$scope.newData = data;})}}
      ];


      $scope.pickDictionary = function () {
        if($scope.dictionaries[($scope.dictionary)-1]) {
          $scope.dictionaries[($scope.dictionary)-1].dict()
        }
      };

      var getData = function () {
        return $scope.newData;
      };
      $scope.$watch('newData', function () {
        $scope.tableParams.reload();
      });
      $scope.tableParams = new NgTableParams({
        page: 1,            // show first page
        count: 10          // count per page
      }, {
        total: function () {
          return getData().length;
        }, // length of data
        getData: function ($defer, params) {
          var moreData = getData();
          params.total(moreData.length);
          $defer.resolve(moreData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    }]);




