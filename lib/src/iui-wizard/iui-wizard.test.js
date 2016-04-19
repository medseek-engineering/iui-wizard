(function() {
  'use strict';

  describe('iui-wizard directive', function () {
    var scope,
      element,
      el;
    beforeEach(function () {
      module('iuiWizard');
      module('templates');
    });
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();

      scope.testSteps = [];
      
      element = angular.element('<div><iui-wizard steps="testSteps"></iui-wizard></div>');
      el = $compile(element)(scope);
      scope.$digest();
    }));

    it('should have one `<section>`', function() {
      expect(el[0].querySelectorAll('section').length).toBe(1);
    });

    
  });
})();