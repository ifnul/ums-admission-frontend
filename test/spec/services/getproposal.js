'use strict';

describe('Service: getProposal', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var getProposal;
  beforeEach(inject(function (_getProposal_) {
    getProposal = _getProposal_;
  }));

  xit('should do something', function () {
    expect(!!getProposal).toBe(true);
  });

});
