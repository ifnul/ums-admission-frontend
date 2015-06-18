'use strict';

describe('Service: personDecodeSvc', function() {

  describe('when I call personDecoded(rawData) method', function() {
    // load the service's module
    beforeEach(module('admissionSystemApp'));

    // instantiate service
    var personDecodeSvc;
    beforeEach(inject(function(_personDecodeSvc_) {
      personDecodeSvc = _personDecodeSvc_;
    }));

    it('decoded data shoul match the pattern', inject(function(personDecodeSvc) {

      // .respond()

      // expect(foo.setBar).toHaveBeenCalled();

      var rawData = [{
        'id': 25,
        'personTypeId': 3,
        'genderTypeId': 1,
        'marriedTypeId': 1,
        'citizenCountryId': 1,
        'name': 'Максим',
        'firstName': 'Максим',
        'fatherName': 'Олегович',
        'surname': 'Федько',
        'photo': '',
        'docSeries': 'testSerial',
        'docNum': '111',
        'identifier': '',
        'resident': 1,
        'birthPlace': 'Kiev',
        'begDate': '2015-08-08',
        'endDate': '2015-07-04',
        'isMilitary': 1,
        'isHostel': 1,
        'uri': '/persons/25'
      }];

      var dataDecoded = [{
        'id': 25,
        'personTypeId': 'науковець',
        'genderTypeId': 'Чоловіча',
        'marriedTypeId': 'одружений',
        'citizenCountryId': 'Ураїна',
        'name': 'Максим',
        'firstName': 'Максим',
        'fatherName': 'Олегович',
        'surname': 'Федько',
        'photo': '',
        'docSeries': 'testSerial',
        'docNum': '111',
        'identifier': '',
        'resident': 'інозем.',
        'birthPlace': 'Kiev',
        'begDate': '2015-08-08',
        'endDate': '2015-07-04',
        'isMilitary': 'ВЗ',
        'isHostel': 'потреб. гуртож.',
        'uri': '/persons/25'
      }];

      personDecodeSvc.personDecoded(rawData).then(function(data) {
        expect(data).toEqual(dataDecoded);
      });

    }));
  });
});
