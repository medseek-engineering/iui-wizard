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
      setCallbacks: setCallbacks
    };

    return factory;

    function setCallbacks(wizardCallbacks) {
      return {
        goToStep: goToStep,
        nextClick: nextClick,
        previousClick: previousClick,
        cancelClick: cancelClick,
      };
      function nextClick(wizardState) {     
        var nextItem = getNextItem(filterParents(wizardState.steps), wizardState.currentStep);

        if (!nextItem) {
          return fireCallbackIfExist(wizardCallbacks, 'complete', wizardState);
        }
        if (!wizardState.currentStep.onComplete ||
            !angular.isFunction(wizardState.currentStep.onComplete)) {
          return goToStep(wizardState, nextItem);
        }
        return $q.when(wizardState.currentStep.onComplete(wizardState,wizardState.currentStep, nextItem))
                 .then(()=>goToStep(wizardState, nextItem));

      }

      function previousClick(wizardState) {
        var previousItem = getPreviousItem(filterParents(wizardState.steps), wizardState.currentStep);

        if (!previousItem) {
          return cancelClick(wizardState);
        }

        return goToStep(wizardState, previousItem);
      }

      function cancelClick(wizardState) {
        return fireCallbackIfExist(wizardCallbacks, 'cancel', wizardState);
      }

    }

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

      var step = _.findWhere(wizardState.steps, {id: stepId});
      if (!step) {
        step = wizardState.steps[0];
      }
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
      return $state.go(step.id).then(()=>setStep(wizardState, step.id));
    }

    function resetWizardState(newWizardState) {
      return angular.copy(newWizardState);
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