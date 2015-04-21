'use strict';

describe('Service: SpecoffersService', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var SpecoffersService, mockDependency;
  beforeEach(inject(function (_SpecoffersService_) {
    SpecoffersService = _SpecoffersService_;
  }));


  beforeEach(function () {

    mockDependency = {
      getEntireSpecoffer: function (id) {


    return 'mockReturnValue';
  }
}
;

module(function ($provide) {
  $provide.value('myDependency', mockDependency);
});
});

it('should return value from mock dependency', inject(function (myService) {
  expect(myService.useDependency()).toBe('mockReturnValue');
}));


it('get one specoffer', inject(function (SpecoffersService, $httpBackend) {


  $httpBackend.when('GET', 'http://176.36.11.25/api-lnu/specoffers/18')

    .respond({
      "id": 18,
      "crtUser": "illay",
      "crtUserGroup": "public",
      "createDate": "2015-04-03",
      "updateDate": "2015-04-03",
      "specialtyId": 1196,
      "departmentId": 291,
      "timePeriodId": 8,
      "timePeriodCourseId": 5,
      "specofferTypeId": 19,
      "educationFormTypeId": 1,
      "licCount": 25,
      "stateCount": 0,
      "uri": "/specoffers/18"
    });

  var entireSpecoffer = SpecoffersService.getEntireSpecoffer(18);
  $httpBackend.flush();

  entireSpecoffer.then(function (items) {
    expect(items).toEquals('mockReturnValue');
  });

}));

})
;
