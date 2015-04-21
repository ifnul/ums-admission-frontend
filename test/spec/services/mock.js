angular.module('userMock', ['ngMock'])
  .run(function ($httpBackend) {
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
    };
    $httpBackend.whenPOST('https://api.example.com/users/1').respond(function () {
      return [200, entireSpecoffer];
    });
  });
