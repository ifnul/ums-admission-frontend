'use strict';

describe('Service: SpecofferDictionaryServise', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var SpecofferDictionaryServise;
  beforeEach(inject(function (_SpecofferDictionaryService_) {
    SpecofferDictionaryServise = _SpecofferDictionaryService_;
  }));

  it('should do something', inject(function (SpecofferDictionaryService, $httpBackend) {

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

    var departments = SpecofferDictionaryService.getAllDepartments();
    $httpBackend.flush();

    departments.then(function(items) {
      expect(items).toEquals(sampleDepartments);
    });

  }));

});
