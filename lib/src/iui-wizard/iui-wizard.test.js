(function() {
  'use strict';

  describe('iui-wizard directive', function () {
    var scope,
      element,
      el;
    beforeEach(function () {
      module('iui.wizard');
      module('templates');
    });
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();

      scope.name = 'Bart';
      scope.wizardState = {
        steps: [],
        buttons: {
          next: {
            disabled: true
          }
        }
      };
      
      element = angular.element('<div><iui-wizard name="name" wizard-state="wizardState"></iui-wizard></div>');
      el = $compile(element)(scope);
      scope.$digest();
    }));

    it('should have one `<section>`', function() {
      expect(el[0].querySelectorAll('section').length).toBe(1);
    });

    it('should have one `<header>`', function() {
      expect(el[0].querySelectorAll('header').length).toBe(1);
    });

    it('should have one `<footer>`', function() {
      expect(el[0].querySelectorAll('footer').length).toBe(1);
    });

    
  });
})();