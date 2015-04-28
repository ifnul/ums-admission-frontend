'use strict';

describe('Service: enrolmentsDecode', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var enrolmentsDecode;
  beforeEach(inject(function (_enrolmentsDecode_) {
    enrolmentsDecode = _enrolmentsDecode_;
  }));

  xit('should do something', function () {
    expect(!!enrolmentsDecode).toBe(true);
  });

});
