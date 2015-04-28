'use strict';

describe('Service: searchPerson', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var searchPerson;
  beforeEach(inject(function (_searchPerson_) {
    searchPerson = _searchPerson_;
  }));

  it('should do something', function () {
    expect(!!searchPerson).toBe(true);
  });

});
