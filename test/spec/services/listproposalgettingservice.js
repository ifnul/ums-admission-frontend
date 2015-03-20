'use strict';

describe('Service: ListProposalGettingService', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var ListProposalGettingService;
  beforeEach(inject(function (_ListProposalGettingService_) {
    ListProposalGettingService = _ListProposalGettingService_;
  }));

  it('should do something', function () {
    expect(!!ListProposalGettingService).toBe(true);
  });

});
