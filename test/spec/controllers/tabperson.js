'use strict';

describe('Controller: TabPersonCtrl', function () {

  // load the controller's module
  beforeEach(module('admissionSystemApp'));

  var TabPersonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TabPersonCtrl = $controller('TabPersonCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
