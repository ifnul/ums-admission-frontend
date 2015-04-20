'use strict';

describe('Service: getEnrolmentsList', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var getEnrolmentsList;
  beforeEach(inject(function (_getEnrolmentsList_) {
    getEnrolmentsList = _getEnrolmentsList_;
  }));

  it('should do something', function () {
    expect(!!getEnrolmentsList).toBe(true);
  });

});
