'use strict';

describe('Service: translateHttpStatus', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var translateHttpStatus;
  beforeEach(inject(function (_translateHttpStatus_) {
    translateHttpStatus = _translateHttpStatus_;
  }));

  it('should do something', function () {
    expect(!!translateHttpStatus).toBe(true);
  });

});
