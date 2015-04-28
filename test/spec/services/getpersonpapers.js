'use strict';

describe('Service: getPersonPapers', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var getPersonPapers;
  beforeEach(inject(function (_getPersonPapers_) {
    getPersonPapers = _getPersonPapers_;
  }));

  it('should do something', function () {
    expect(!!getPersonPapers).toBe(true);
  });

});
