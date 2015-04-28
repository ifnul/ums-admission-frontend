'use strict';

describe('Service: baseFormData', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var baseFormData;
  beforeEach(inject(function (_baseFormData_) {
    baseFormData = _baseFormData_;
  }));

  it('should do something', function () {
    expect(!!baseFormData).toBe(true);
  });

});
