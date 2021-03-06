(function() {
  'use strict';

  angular
    .module('iui.wizard')
    .factory('wizardService', wizardService);


  wizardService.$inject = [
    'wizardSettings',
    '$state',
    '$q'
  ];
  function wizardService(wizardSettings, $state, $q) {
    const factory = {
      resetWizardState: resetWizardState,
      setStep: setStep,
      getStepClass: getStepClass,
      getNextItem: getNextItem,
      getPreviousItem: getPreviousItem,
      filterParents: filterParents,
      goToStep: goToStep,
      fireCallbackIfExist: fireCallbackIfExist,
      applyStepNumbers: applyStepNumbers
    };

    return factory;

    

    function fireCallbackIfExist(callbacks, callbackName, state) {
      if (!callbacks ||
          !angular.isFunction(callbacks[callbackName])) {
        return state;
      }
      callbacks[callbackName](state);
    }

    function filterParents(steps) {
      return steps.filter(function(step) {
        return !_.where(steps, {parent: step.id }).length;
      });
    }

    function getCurrentItem(steps, value) {
      return steps.filter(function(step) {
        return step.id === value.id;
      })[0];
    }

    function getNextItem(array, value) {
      var nextItem;
      var currentItem = getCurrentItem(array, value);
      var index = array.indexOf(currentItem);
      if(index >= 0 && index < array.length - 1) {
        nextItem = array[index + 1];
      }
      return nextItem;
    }

    function getPreviousItem(array, value) {
      var previousItem;
      var currentItem = getCurrentItem(array, value);
      var index = array.indexOf(currentItem);
      if(index > 0) {
        previousItem = array[index - 1];
      }
      return previousItem;
    }

    function setStep(wizardState, stepId) {

      var step = _.findWhere(wizardState.steps, {id: stepId}) || wizardState.steps[0];

      // reset
      wizardState.currentMajorStep.isOpen = false;
      wizardState.buttons = step.buttons || {};
      
      var parent;

      if (step.parent) {
        parent = _.findWhere(wizardState.steps, {id: step.parent});
        parent.disabled = false;
        parent.isOpen = true;
      }

      step.disabled = false;
      wizardState.currentMajorStep = parent || step;
      wizardState.currentStep = step;

      return wizardState;
    }

    function goToStep(wizardState, step) {
      return $state.go(step.id);
    }

    function resetWizardState(newWizardState) {
      return angular.copy(newWizardState);
    }

    function applyStepNumbers(steps) {
      let stepNum = 0;
      return steps.map(function(oStep) {
        let step = Object.assign({}, oStep);
        if(!step.parent) {
          stepNum = stepNum + 1;
        }
        step.stepNumber = stepNum;
        return step;
      });
    }

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