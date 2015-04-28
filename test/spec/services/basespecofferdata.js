'use strict';

describe('Service: baseSpecofferData', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var baseSpecofferData;
  beforeEach(inject(function (_baseSpecofferData_) {
    baseSpecofferData = _baseSpecofferData_;
  }));

  xit('should do something', function () {
    expect(!!baseSpecofferData).toBe(true);
  });

});
