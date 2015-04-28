'use strict';

describe('Directive: personSelector', function () {

  // load the directive's module
  beforeEach(module('admissionSystemApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<person-selector></person-selector>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the personSelector directive');
  }));
});
