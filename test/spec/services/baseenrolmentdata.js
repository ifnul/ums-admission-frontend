'use strict';

describe('Service: baseEnrolmentData', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var baseEnrolmentData;
  beforeEach(inject(function (_baseEnrolmentData_) {
    baseEnrolmentData = _baseEnrolmentData_;
  }));

  it('should do something', function () {
    expect(!!baseEnrolmentData).toBe(true);
  });

});
