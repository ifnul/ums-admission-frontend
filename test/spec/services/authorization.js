'use strict';

describe('Service: authorization', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var authorization;
  beforeEach(inject(function (_authorization_) {
    authorization = _authorization_;
  }));

  xit('should do something', function () {
    expect(!!authorization).toBe(true);
  });

});
