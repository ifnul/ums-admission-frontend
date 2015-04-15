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
        var entireSpecoffer = {
          specoffer: {
            'timePeriodId': 8,
            'eduFormTypeId': 2,
            'specofferTypeId': 2,
            'docSeries': 'RRT',
            'docNum': '12345',
            'begDate': '2014-02-08',
            'endDate': '2018-02-08',
            'licCount': 12,
            'stateCount': 13,
            'departmentId': 21,
            'specialtyId': 123,
            'note': 'NEW_NOTE',
            'timePeriodCourseId': 1
          },
          benefites: [
            {
              'benefitId': 1,
              'note': 'newNote'
            },
            {
              'benefitId': 2,
              'note': 'oldNode'
            }
          ],
          subjects: [
            {
              'mark': 3,
              'isMajor': false,
              'alternative': false,
              'weightSubject': 0.9,
              'enrolmentSubjectId': 1,
              'note': 'HERE'
            },
            {
              'mark': 2,
              'isMajor': false,
              'alternative': false,
              'weightSubject': 1,
              'enrolmentSubjectId': 1,
              'note': 'THERE'
            }
          ]
        }

        return 'mockReturnValue';
      }
    }
  });

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
