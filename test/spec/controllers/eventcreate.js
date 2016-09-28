'use strict';

describe('Controller: EventcreateCtrl', function () {

  // load the controller's module
  beforeEach(module('eventPlannerApp'));

  var EventcreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventcreateCtrl = $controller('EventcreateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventcreateCtrl.awesomeThings.length).toBe(3);
  });
});
