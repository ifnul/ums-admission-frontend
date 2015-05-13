'use strict';

describe('Controller: SigninCtrl', function () {

  // load the controller's module
  beforeEach(module('admissionSystemApp'));

  var SigninCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SigninCtrl = $controller('SigninCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
