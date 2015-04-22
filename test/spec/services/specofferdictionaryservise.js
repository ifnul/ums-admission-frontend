'use strict';

describe('Service: SpecofferDictionaryServise', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var SpecofferDictionaryServise;
  beforeEach(inject(function (_SpecofferDictionaryService_) {
    SpecofferDictionaryServise = _SpecofferDictionaryService_;
  }));

    // test for get all departments
    it('get all departments', inject(function (SpecofferDictionaryService, $httpBackend) {

      var sampleDepartments = [
        {
          "id": 1,
          "departmentTypeId": 2,
          "name": "Керівництво",
          "identifir": "01",
          "uri": "/departments/1"
        },
        {
          "id": 2,
          "departmentTypeId": 3,
          "name": "Ректор",
          "identifir": "01.01",
          "uri": "/departments/2"
        }
      ];

      $httpBackend.when('GET', 'http://176.36.11.25/api-lnu/departments?limit=300&offset=0')
        .respond({
          "offset": 0,
          "limit": 20,
          "count": 644,
          "resources": sampleDepartments
        });

      var departments = SpecofferDictionaryService.getAllDepartments({departmentTypeId: 1});
      $httpBackend.flush();

      departments.then(function (items) {
        expect(items).toEquals(sampleDepartments);
      });

    }));


    // test for get all specoffers
    it('get all specoffers', inject(function (SpecofferDictionaryService, $httpBackend) {

      var sampleSpecoffers = [
        {
          "id": 6,
          "specialtyId": 1205,
          "departmentId": 291,
          "timePeriodId": 8,
          "timePeriodCourseId": 5,
          "specofferTypeId": 19,
          "educationFormTypeId": 1,
          "licCount": 30,
          "stateCount": 0,
          "uri": "/specoffers/6"
        },
        {
          "id": 7,
          "specialtyId": 761,
          "departmentId": 291,
          "timePeriodId": 8,
          "timePeriodCourseId": 5,
          "specofferTypeId": 19,
          "educationFormTypeId": 1,
          "licCount": 60,
          "stateCount": 0,
          "uri": "/specoffers/7"
        }
      ];

      $httpBackend.when('GET', 'http://176.36.11.25/api-lnu/specoffers?limit=300&offset=0')
        .respond({
          "offset": 0,
          "limit": 20,
          "count": 374,
          "resources": sampleSpecoffers
        });


      var specoffers = SpecofferDictionaryService.getAllSpecoffers();
      $httpBackend.flush();

      specoffers.then(function (items) {
        expect(items).toEquals(sampleSpecoffers);
      });

    }));


    // test for get all subjects
    it('get all subjects', inject(function (SpecofferDictionaryService, $httpBackend) {

      var sampleSubjects = [
        {
          "id": 1,
          "name": "Українська мова",
          "isTesting": 0,
          "uri": "/enrolments/subjects/1"
        },
        {
          "id": 2,
          "name": "Українська література",
          "isTesting": 0,
          "uri": "/enrolments/subjects/2"
        }
      ];

      $httpBackend.when('GET', 'http://176.36.11.25/api-lnu/enrolments/subjects?limit=300&offset=0')
        .respond({
          "offset": 0,
          "limit": 300,
          "count": 43,
          "resources": sampleSubjects
        });


      var specoffers = SpecofferDictionaryService.getAllSubjects();
      $httpBackend.flush();

      specoffers.then(function (items) {
        expect(items).toEquals(sampleSubjects);
      });

    }));


    // test for get all specialties
    it('get all specialties', inject(function (SpecofferDictionaryService, $httpBackend) {

      var sampleSpecialties = [
        {
          "id": 1,
          "specialtyTypeId": 1,
          "name": "Специфічні категорії",
          "cipher": "1801",
          "uri": "/specialties/1"
        },
        {
          "id": 2,
          "specialtyTypeId": 1,
          "name": "Державне управління",
          "cipher": "1501",
          "uri": "/specialties/2"
        }
      ];

      $httpBackend.when('GET', 'http://176.36.11.25/api-lnu/specialties?limit=300&offset=0')
        .respond({
          "offset": 0,
          "limit": 300,
          "count": 1520,
          "resources": sampleSpecialties
        });


      var specialties = SpecofferDictionaryService.getAllSpecialties();
      $httpBackend.flush();

      specialties.then(function (items) {
        expect(items).toEquals(sampleSpecialties);
      });

    }));


    // test for get all specoffersTypes
    it('get all specoffersTypes', inject(function (SpecofferDictionaryService, $httpBackend) {

      var sampleSpecoffersTypes = [
        {
          "id": 1,
          "name": "Молодший спеціаліст на основі базової загальної середньої освіти",
          "uri": "/specoffers/types/1"
        },
        {
          "id": 2,
          "name": "Молодший спеціаліст на основі повної загальної середньої освіти",
          "uri": "/specoffers/types/2"
        }
      ];

      $httpBackend.when('GET', 'http://176.36.11.25/api-lnu/specoffers/types?limit=300&offset=0')
        .respond({
          "offset": 0,
          "limit": 40,
          "count": 33,
          "resources": sampleSpecoffersTypes
        });


      var specoffersTypes = SpecofferDictionaryService.getSpecoffersTypes();
      $httpBackend.flush();

      specoffersTypes.then(function (items) {
        expect(items).toEquals(sampleSpecoffersTypes);
      });

    }));

    // test for get all education form types
    it('get all education form types', inject(function (SpecofferDictionaryService, $httpBackend) {

      var EduformTypes = [
        {
          "id": 1,
          "name": "денна",
          "uri": "/educations/forms/types/1"
        },
        {
          "id": 2,
          "name": "заочна",
          "uri": "/educations/forms/types/2"
        }
      ];

      $httpBackend.when('GET', 'http://176.36.11.25/api-lnu/educations/forms/types?limit=300&offset=0')
        .respond({
          "offset": 0,
          "limit": 38,
          "count": 5,
          "resources": EduformTypes
        });


      var eduformTypes = SpecofferDictionaryService.getEduformTypes();
      $httpBackend.flush();

      eduformTypes.then(function (items) {
        expect(items).toEquals(EduformTypes);
      });

    }));


    // test for get all course types
    it('get all course types', inject(function (SpecofferDictionaryService, $httpBackend) {

      var TimePeriodCourseIds = [
        {
          "id": 1,
          "name": "1 курс",
          "abbrName": "1",
          "uri": "/courses/types/1"
        },
        {
          "id": 2,
          "name": "2 курс",
          "abbrName": "2",
          "uri": "/courses/types/2"
        }
      ];

      $httpBackend.when('GET', 'http://176.36.11.25/api-lnu/courses/types?limit=300&offset=0')
        .respond({
          "offset": 0,
          "limit": 20,
          "count": 5,
          "resources": TimePeriodCourseIds
        });


      var timePeriodCourseIds = SpecofferDictionaryService.getTimePeriodCourseIds();
      $httpBackend.flush();

      timePeriodCourseIds.then(function (items) {
        expect(items).toEquals(TimePeriodCourseIds);
      });

    }));


    // test for get all timeperiods
    it('get all course types', inject(function (SpecofferDictionaryService, $httpBackend) {

      var timeperiods = [
        {
          "id": 8,
          "numValue": 2014,
          "timePeriodTypeId": 1,
          "name": "Всупна компанія 2014",
          "begDate": "2014-07-11",
          "endDate": "2014-07-31",
          "uri": "/timeperiods/8"
        },
        {
          "id": 9,
          "numValue": 2014,
          "timePeriodTypeId": 1,
          "name": "Всупна компанія 2015",
          "begDate": "2015-07-01",
          "endDate": "2015-07-31",
          "uri": "/timeperiods/9"
        }
      ];

      //timeperiods?timePeriodTypeId=1

      $httpBackend.when('GET', 'http://176.36.11.25/api-lnu/timeperiods?limit=300&offset=0&timePeriodTypeId=1')
        .respond({
          "offset": 0,
          "limit": 38,
          "count": 3,
          "resources": timeperiods
        });


      var timePeriod = SpecofferDictionaryService.getTimeperiods({timePeriodTypeId:1});
      $httpBackend.flush();

      timePeriod.then(function (items) {
        expect(items).toEquals(timeperiods);
      });

    }));


    // test for get all benefits
    it('get all benefits', inject(function (SpecofferDictionaryService, $httpBackend) {

      var benefits = [
        {
          "id": 1,
          "benefitTypeId": 2,
          "name": "Особи, яким Законом України «Про статус ветеранів війни, гарантії їх соціального захисту» надано таке право",
          "abbrName": "NULL",
          "description": "Особи, яким Законом України «Про статус ветеранів війни, гарантії їх соціального захисту» надано таке право",
          "uri": "/benefits/1"
        },
        {
          "id": 2,
          "benefitTypeId": 2,
          "name": "Діти-сироти та діти, які залишилися без піклування батьків, а також особи з числа дітей-сиріт та дітей, позбавлених батьківського піклування, віком від 18 до 23 років",
          "abbrName": "NULL",
          "description": "Діти-сироти та діти, які залишилися без піклування батьків, а також особи з числа дітей-сиріт та дітей, позбавлених батьківського піклування, віком від 18 до 23 років",
          "uri": "/benefits/2"
        }
      ];

      $httpBackend.when('GET', 'http://176.36.11.25/api-lnu/benefits?limit=300&offset=0')
        .respond({
          "offset": 0,
          "limit": 20,
          "count": 5,
          "resources": benefits
        });


      var benefitsTypes = SpecofferDictionaryService.getBenefits();
      $httpBackend.flush();

      benefitsTypes.then(function (items) {
        expect(items).toEquals(benefits);
      });

    }));

});
