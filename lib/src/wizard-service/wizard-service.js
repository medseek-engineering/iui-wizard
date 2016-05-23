(function() {
  'use strict';

  angular
    .module('iui.wizard')
    .factory('wizardService', wizardService);


  wizardService.$inject = ['wizardSettings'];
  function wizardService(wizardSettings) {
    const factory = {
      getStepClass: getStepClass
    };

    return factory;

    function getStepClass(step, currentMajorStep, currentStep) {
      if(!step || !currentMajorStep || !currentStep) {
        return;
      }

      var classExpression = [
        {
          className: wizardSettings.classNames.wizardStep.active,
          expression: currentMajorStep.id === step.id
        },
        {
          className: wizardSettings.classNames.wizardStep.active,
          expression: step.parent && (currentStep.id === step.id)
        },
        {
          className: wizardSettings.classNames.wizardStep.completed,
          expression: step.completed
        },
        {
          className: wizardSettings.classNames.wizardStep.disabled,
          expression: step.disabled
        },
        {
          className: wizardSettings.classNames.wizardStep.hasSubsteps,
          expression: step.steps && step.steps.length && !step.disabled
        },
        {
          className: wizardSettings.classNames.wizardStep.substepsOpen,
          expression: step.isOpen
        }
      ];

      return  classExpression
                .filter(function(classObject) {
                  return classObject.expression;
                })
                .map(function(classObject) {
                  return classObject.className;
                });
    }

  }

})();