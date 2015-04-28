'use strict';

describe('Controller: TabwavesCtrl', function () {

  // load the controller's module
  beforeEach(module('admissionSystemApp'));

  var TabwavesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TabwavesCtrl = $controller('TabwavesCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
