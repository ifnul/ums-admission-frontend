'use strict';

describe('Controller: ListpersonctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('admissionSystemApp'));

  var ListpersonctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListpersonctrlCtrl = $controller('ListpersonctrlCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
