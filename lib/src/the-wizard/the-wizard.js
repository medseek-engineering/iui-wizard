(function() {
  'use strict';

  // Follow the Angular Style Guide: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

  angular.module('iui.wizard')
    .directive('theWizard', theWizard);

  function theWizard() {
    // Babel is preprocessing JS, so we can use ES2015 features https://babeljs.io/docs/learn-es2015/
    const directive = {
      restrict: 'E',
      template: `<iui-wizard
                  ng-if="wizard.state"
                  name="{{wizardName}}"
                  wizard-state="wizard.state"
                  callbacks="wizard.callbacks">
                  <div ui-view></div>
                </iui-wizard>`,
      // Controller names must be capitalized because they are constructors
      controller: TheWizardController,
      controllerAs: 'wizard',
      link: postLink,
      scope: {
        wizardName: '@',
        wizardSteps: '=',
        wizardCallbacks: '='
      }
    };
    return directive;

    function postLink(scope, element, attrs, controller) {
      // resets the wizard to the original state each time the directive is initialized
      //scope.state.wizard = controller.callbacks.resetWizardState(controller.appointmentState.defaultWizardState);
      
      scope.$watch(function() {
        return scope.wizardSteps;
      }, function(stepValue) {
        if (!stepValue) {
          return;
        }
        controller.activate(stepValue, scope.wizardCallbacks);
      });
      
    }
  }

  TheWizardController
    .$inject = ['wizardService', '$scope', 'wizardRouterHelper', '$state', '$location'];
  function TheWizardController(wizardService, $scope, wizardRouterHelper, $state, $location) {
    // Define Variables up top
    const vm = this;
    vm.activate = activate;

    function activate(steps, wizardCallbacks) {
      var stepNum = 0;
      var mappedSteps = steps.map(function(step, stepIndex) {
        if (!step.url) {
          step.url = '/'+step.id;
        }
        if(step.parent) {
          step.parent = getChildStateName(step.parent);
          step.stepNumber = stepNum;
        } else {
          stepNum = stepNum + 1;
          step.stepNumber = stepNum;
        }
        step.id = getChildStateName(step.id, step.parent);

        return step;
      });

      vm.state = {
        steps: mappedSteps,
        currentMajorStep: mappedSteps[0],
        currentStep: mappedSteps[0],
        buttons: mappedSteps[0].buttons,
      };
      var stepStates = getStatesFromSteps(mappedSteps);
      wizardRouterHelper.configureStates(stepStates);
      vm.callbacks = wizardService.setCallbacks(wizardCallbacks);
      wizardService.setStep(vm.state, vm.state.currentStep.id);
    }

    function getChildStateName(stepId, parentStepId) {
      if (!$state.current.name) {
        return stepId;
      }
      if (!parentStepId) {
        return $state.current.name + '.' + stepId;
      }
      return parentStepId + '.' + stepId;
    }

    function getStatesFromSteps(steps) {
      return steps.map(function(step) {
        return {
          state: step.id,
          config: {
            template: step.template,
            url: step.url
          }
        };
      });

    }




  }


})();