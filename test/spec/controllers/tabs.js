'use strict';

describe('Controller: TabsctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('admissionSystemApp'));

  var TabsctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TabsctrlCtrl = $controller('TabsctrlCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
