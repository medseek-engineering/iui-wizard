(function() {
  'use strict';

  describe('wizard-step directive', function () {
    var scope,
      element,
      el;
    beforeEach(function () {
      module('iui.wizard');
      module('templates');
    });
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();

      scope.step = {
        id: 'step.1',
        name: 'step 1',
        complete: false,
        steps: [
          {
            id: 'step.a',
            name: 'step a'
          },
          {
            id: 'step.b',
            name: 'step b'
          }
        ]
      };

      scope.currentMajorStep = scope.step;
      scope.currentStep = scope.step.steps[0];

      scope.stepClick = jasmine.createSpy();
      
      var theElement = `<ol>
                          <wizard-step
                            current-step="currentStep"
                            current-major-step="currentMajorStep"
                            step-click="stepClick"
                            step="step"></wizard-step>
                        </ol>`;

      element = angular.element(theElement);
      el = $compile(element)(scope);
      scope.$digest();
    }));

    it('should have one `<li>`', function() {
      expect(el[0].querySelectorAll('li').length).toBe(1);
    });

    it('should NOT have SVG', function() {
      expect(el[0].querySelectorAll('svg').length).toBe(0);
    });

    describe('when the step is marked as complete', function() {
      beforeEach(function() {
        scope.step.complete = true;
        scope.$digest();
      });
      it('should have SVG', function() {
        expect(el[0].querySelectorAll('svg').length).toBe(1);
      });
    });

    describe('when the step is marked as complete', function() {
      beforeEach(function() {
        scope.step.isOpen = true;
        scope.$digest();
      });
      it('should have one `<ol>`', function() {
        expect(el[0].querySelectorAll('ol').length).toBe(1);
      });
      it('should have three `<li>`', function() {
        expect(el[0].querySelectorAll('li').length).toBe(3);
      });
    });

    describe('when clicking the button', function() {
      beforeEach(function() {
        el[0].querySelector('button').click();
      });
      it('should trigger the stepClick callback', function() {
        expect(scope.stepClick).toHaveBeenCalled();
      });
    });

    
  });
})();