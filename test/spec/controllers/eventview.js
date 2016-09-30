'use strict';

describe('Controller: EventviewCtrl', function () {

  // load the controller's module
  beforeEach(module('eventPlannerApp'));

  var EventviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventviewCtrl = $controller('EventviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventviewCtrl.awesomeThings.length).toBe(3);
  });
});
