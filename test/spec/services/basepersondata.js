'use strict';

describe('Service: basePersonData', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var basePersonData;
  beforeEach(inject(function (_basePersonData_) {
    basePersonData = _basePersonData_;
  }));

  xit('should do something', function () {
    expect(!!basePersonData).toBe(true);
  });

});
