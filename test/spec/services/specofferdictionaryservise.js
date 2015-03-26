'use strict';

describe('Service: SpecofferDictionaryServise', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var SpecofferDictionaryServise;
  beforeEach(inject(function (_SpecofferDictionaryServise_) {
    SpecofferDictionaryServise = _SpecofferDictionaryServise_;
  }));

  it('should do something', function () {
    expect(!!SpecofferDictionaryServise).toBe(true);
  });

});
