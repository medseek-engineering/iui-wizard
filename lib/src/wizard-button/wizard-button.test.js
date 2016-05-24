(function() {
  'use strict';

  describe('wizard-button directive', function () {
    var scope,
      element,
      el;
    beforeEach(function () {
      module('iui.wizard');
      module('templates');
    });
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();

      scope.button = {
        className: 'george'
      };

      scope.callback = jasmine.createSpy();
      
      var theElement = `<div>
                          <wizard-button
                            callback="callback"
                            class="ringo"
                            button="button">paul</wizard-button>
                        </div>`;

      element = angular.element(theElement);
      el = $compile(element)(scope);
      scope.$digest();
    }));

    it('should have one `<button>`', function() {
      expect(el[0].querySelectorAll('button').length).toBe(1);
    });

    it('should have a role of `button`', function() {
      expect(el[0].querySelector('button').getAttribute('role')).toBe('button');
    });

    it('should have a class of `ringo`', function() {
      expect(el[0].querySelectorAll('.ringo').length).toBe(1);
    });

    it('should have a class of `george`', function() {
      expect(el[0].querySelectorAll('.george').length).toBe(1);
    });

    it('should contain the text `paul`', function() {
      expect(el[0].querySelector('button').innerText).toBe('paul');
    });

    describe('when clicking the button', function() {
      beforeEach(function() {
        el[0].querySelector('button').click();
      });
      it('should trigger the callback', function() {
        expect(scope.callback).toHaveBeenCalled();
      });
    });

    
  });
})();