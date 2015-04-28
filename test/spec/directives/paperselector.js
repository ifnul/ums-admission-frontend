'use strict';

describe('Directive: paperSelector', function () {

  // load the directive's module
  beforeEach(module('admissionSystemApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<paper-selector></paper-selector>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the paperSelector directive');
  }));
});
