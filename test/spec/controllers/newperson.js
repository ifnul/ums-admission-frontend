'use strict';

describe('Controller: NewpersonctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('admissionSystemApp'));

  var NewpersonctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewpersonctrlCtrl = $controller('NewpersonctrlCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
