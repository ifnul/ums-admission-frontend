'use strict';

describe('Directive: validator', function () {

  // load the directive's module
  beforeEach(module('admissionSystemApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<validator></validator>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the validator directive');
  }));
});
