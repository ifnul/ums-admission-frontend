'use strict';

describe('Directive: personTable', function () {

  // load the directive's module
  beforeEach(module('admissionSystemApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<person-table></person-table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the personTable directive');
  }));
});
