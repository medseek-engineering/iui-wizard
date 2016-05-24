(function () {
  'use strict';

  describe('wizardService', function () {
    var wizardService, $rootScope;


    var wizardSettings = {
      classNames: {
        wizardStep: {
          active: 'item-active',
          completed: 'item-completed',
          disabled: 'item-disabled',
          hasSubsteps: 'item-has-substeps',
          substepsOpen: 'item-substeps-open'
        }
      }
    };

    beforeEach(function () {
      module('iui.wizard');
      module(function($provide) {
        $provide.constant('wizardSettings', wizardSettings);
      });
      inject(function(_wizardService_, _$rootScope_) {
        wizardService = _wizardService_;
        $rootScope = _$rootScope_;
      });
    });

    describe('when calling getStepClass(step, currentMajorStep, currentStep)', function() {
      describe('where wizard step is complete and the current major step '+
               'and current step are the same as the wizard step', function() {
        var step = {
          completed: true
        };
        var currentMajorStep = step;
        var currentStep = step;
        var result;
        
        beforeEach(function() {
          result = wizardService.getStepClass(step, currentMajorStep, currentStep);
        });
        it('should contain the completed className', function() {
          function filterClassName(className) {
            return className === 'item-completed';
          }
          expect(result.filter(filterClassName).length).toBe(1);
        });
        it('should contain the active className', function() {
          function filterClassName(className) {
            return className === 'item-active';
          }
          expect(result.filter(filterClassName).length).toBe(1);
        });
      });

      describe('where wizard step is NOT complete and the current major step '+
               'and current step are the same as the wizard step', function() {
        var step = {
          completed: false
        };
        var currentMajorStep = step;
        var currentStep = step;
        var result;
        
        beforeEach(function() {
          result = wizardService.getStepClass(step, currentMajorStep, currentStep);
        });
        it('should NOT contain the completed className', function() {
          function filterClassName(className) {
            return className === 'item-completed';
          }
          expect(result.filter(filterClassName).length).toBe(0);
        });
        it('should contain the active className', function() {
          function filterClassName(className) {
            return className === 'item-active';
          }
          expect(result.filter(filterClassName).length).toBe(1);
        });
      });

      describe('where wizard minor steps is open and the current major step '+
               'and current step are the same as the wizard step', function() {
        var step = {
          isOpen: true
        };
        var currentMajorStep = step;
        var currentStep = step;
        var result;
        
        beforeEach(function() {
          result = wizardService.getStepClass(step, currentMajorStep, currentStep);
        });
        it('should NOT contain the substeps open className', function() {
          function filterClassName(className) {
            return className === 'item-substeps-open';
          }
          expect(result.filter(filterClassName).length).toBe(1);
        });
      });

      describe('where wizard minor steps is NOT open and the current major step '+
               'and current step are the same as the wizard step', function() {
        var step = {
          isOpen: false
        };
        var currentMajorStep = step;
        var currentStep = step;
        var result;
        
        beforeEach(function() {
          result = wizardService.getStepClass(step, currentMajorStep, currentStep);
        });
        it('should NOT contain the substeps open className', function() {
          function filterClassName(className) {
            return className === 'item-substeps-open';
          }
          expect(result.filter(filterClassName).length).toBe(0);
        });
      });

      describe('where wizard step is disabled and the current major step '+
               'and current step are the same as the wizard step', function() {
        var step = {
          disabled: true
        };
        var currentMajorStep = step;
        var currentStep = step;
        var result;
        
        beforeEach(function() {
          result = wizardService.getStepClass(step, currentMajorStep, currentStep);
        });
        it('should NOT contain the disabled className', function() {
          function filterClassName(className) {
            return className === 'item-disabled';
          }
          expect(result.filter(filterClassName).length).toBe(1);
        });
      });

      describe('where wizard step is NOT disabled and the current major step '+
               'and current step are the same as the wizard step', function() {
        var step = {
          disabled: false
        };
        var currentMajorStep = step;
        var currentStep = step;
        var result;
        
        beforeEach(function() {
          result = wizardService.getStepClass(step, currentMajorStep, currentStep);
        });
        it('should NOT contain the disabled className', function() {
          function filterClassName(className) {
            return className === 'item-disabled';
          }
          expect(result.filter(filterClassName).length).toBe(0);
        });
      });

      describe('where step={disabled: false, steps: [{id: \'1\'}, {id: \'2\'}]}; '+
               'currentMajorStep = step; currentStep = step', function() {
        var step = {
          disabled: false,
          steps: [
            {
              id: '1'
            },
            {
              id: '2'
            }
          ]
        };
        var currentMajorStep = step;
        var currentStep = step;
        var result;
        
        beforeEach(function() {
          result = wizardService.getStepClass(step, currentMajorStep, currentStep);
        });
        it('should NOT contain the disabled className', function() {
          function filterClassName(className) {
            return className === 'item-disabled';
          }
          expect(result.filter(filterClassName).length).toBe(0);
        });
        it('should contain the has substeps className', function() {
          function filterClassName(className) {
            return className === 'item-has-substeps';
          }
          expect(result.filter(filterClassName).length).toBe(1);
        });
      });

      describe('where step={disabled: false, steps: [{id: \'1\'}, {id: \'2\'}]}; '+
               'currentMajorStep = step; currentStep = step', function() {
        var step = {
          disabled: true,
          steps: [
            {
              id: '1'
            },
            {
              id: '2'
            }
          ]
        };
        var currentMajorStep = step;
        var currentStep = step;
        var result;
        
        beforeEach(function() {
          result = wizardService.getStepClass(step, currentMajorStep, currentStep);
        });
        it('should contain the disabled className', function() {
          function filterClassName(className) {
            return className === 'item-disabled';
          }
          expect(result.filter(filterClassName).length).toBe(1);
        });
        it('should NOT contain the has substeps className', function() {
          function filterClassName(className) {
            return className === 'item-has-substeps';
          }
          expect(result.filter(filterClassName).length).toBe(0);
        });
      });

      describe('where currentMajorStep = { id: \'yodle\', steps: [{ parent: \'yodle\', id: \'boom1\'},'+
               '{ parent: \'yodle\', id: \'boom2\'}]}; '+
               'step = currentMajorStep.steps[0];  currentStep = currentMajorStep.steps[0]', function() {
        var currentMajorStep = {
          name: 'boom Parent',
          id: 'yodle',
          steps: [
            {
              parent: 'yodle',
              id: 'boom1'
            },
            {
              parent: 'yodle',
              id: 'boom2'
            }
          ]
        };
        var step = currentMajorStep.steps[0];
        var currentStep = currentMajorStep.steps[0];
        var result;
        
        beforeEach(function() {
          result = wizardService.getStepClass(step, currentMajorStep, currentStep);
        });

        it('should contain the active className', function() {
          function filterClassName(className) {
            return className === 'item-active';
          }
          expect(result.filter(filterClassName).length).toBe(1);
        });
      });

      describe('where currentMajorStep = { id: \'yodle\', steps: [{ parent: \'yodle\', id: \'boom1\'},'+
               '{ parent: \'yodle\', id: \'boom2\'}]}; step = currentMajorStep.steps[0];'+
               'currentStep = currentMajorStep.steps[1]', function() {
        var currentMajorStep = {
          name: 'boom Parent',
          id: 'yodle',
          steps: [
            {
              parent: 'yodle',
              id: 'boom1'
            },
            {
              parent: 'yodle',
              id: 'boom2'
            }
          ]
        };
        var step = currentMajorStep.steps[0];
        var currentStep = currentMajorStep.steps[1];
        var result;
        
        beforeEach(function() {
          result = wizardService.getStepClass(step, currentMajorStep, currentStep);
        });

        it('should NOT contain the active className', function() {
          function filterClassName(className) {
            return className === 'item-active';
          }
          expect(result.filter(filterClassName).length).toBe(0);
        });
      });
    });

  });
})(window.app);