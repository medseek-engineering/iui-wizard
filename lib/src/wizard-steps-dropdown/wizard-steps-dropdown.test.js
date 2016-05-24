(function() {
  'use strict';

  describe('wizard-steps-dropdown directive', function () {
    var scope,
      element,
      el;
    beforeEach(function () {
      module('iui.wizard');
      module('templates');
    });
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();

      scope.steps = [
        {
          id: 'step.1',
          name: 'step 1',
          complete: false,
          steps: []
        },
        {
          id: 'step.2',
          name: 'step 2',
          complete: false,
          steps: []
        }
      ];

      scope.wizard = {
        wizardState: {
          currentMajorStep: scope.steps[0],
          currentStep: scope.steps[0]
        }
      };

      scope.currentMajorStep = scope.steps[0];
      scope.currentStep = scope.steps[0];

      scope.stepClick = jasmine.createSpy();
      
      var theElement = `<div>
                        <wizard-steps-dropdown
                          class="wizard-mobile-hide"
                          settings="wizard.settings"
                          steps="steps"
                          current-major-step="wizard.wizardState.currentMajorStep"
                          current-step="wizard.wizardState.currentStep"
                          step-click="wizard.stepClick"></wizard-steps-dropdown></div>`;

      element = angular.element(theElement);
      el = $compile(element)(scope);
      scope.$digest();
    }));

    it('should have two `<li>`', function() {
      expect(el[0].querySelectorAll('li').length).toBe(2);
    });

    it('should have one `.btn-wizard-current-step`', function() {
      expect(el[0].querySelectorAll('.btn-wizard-current-step').length).toBe(1);
    });

    

    
  });
})();