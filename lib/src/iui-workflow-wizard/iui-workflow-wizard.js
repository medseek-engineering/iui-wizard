(function() {
  'use strict';

  // Follow the Angular Style Guide: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

  angular.module('iui.wizard')
    .directive('iuiWorkflowWizard', iuiWorkflowWizard);

  function iuiWorkflowWizard() {
    const directive = {
      restrict: 'E',
      template: `<iui-wizard
                  ng-if="wizard.state"
                  name="{{wizardName}}"
                  wizard-state="wizard.state"
                  callbacks="wizard.callbacks">
                  <iui-wizard-form-wrapper
                    wizard-state="wizard.state"
                    submit-callback="wizard.callbacks.nextClick"
                    submit-label="{{wizard.state.buttons.next.name || wizard.settings.buttons.next.name }}">
                    <div ui-view></div>
                  </iui-wizard-form-wrapper> 
                </iui-wizard>`,
      controller: WorkflowWizardController,
      controllerAs: 'wizard',
      link: postLink,
      scope: {
        wizardName: '@',
        wizardWorkflow: '=',
        wizardCallbacks: '=',
        wizardData: '='
      }
    };
    return directive;

    function postLink(scope, element, attrs, controller) {
      scope.$watch(()=>scope.wizardWorkflow, watchWizardWorkflow);

      function watchWizardWorkflow(stepValue) {
        if (!stepValue) {
          return;
        }
        controller.activate(stepValue);
      }
    }
  }

  WorkflowWizardController.$inject = [
    'wizardService',
    '$state',
    '$q',
    '$scope',
    'wizardSettings',
    '$rootScope'
  ];
  function WorkflowWizardController(wizardService, $state, $q, $scope, wizardSettings, $rootScope) {
    // Define Variables up top
    const vm = this;
    vm.activate = activate;
    vm.settings = wizardSettings;
    vm.callbacks = {
      nextClick: nextClick,
      previousClick: previousClick,
      cancelClick: cancelClick,
      goToStep: wizardService.goToStep
    };


    function setStepsToDisabled(steps) {
      let newSteps = steps.map(setStepToDisabled);

      newSteps[0].disabled = false;
      return newSteps;
    }

    function setStepToDisabled(oStep) {
      let step = Object.assign({}, oStep);
      step.disabled = true;
      return step;
    }

    function mapStepNameToName(step) {
      //let step = Object.assign({}, oStep);
      step.name = step.stepName;
      return step;
    }

    function getStepsFromWorkflow(workflow) {
      return workflow.map(function(stepId) {
        return $state.get(stepId);
      });
    }

    function activate(workflow) {

      let steps = setStepsToDisabled(
                    wizardService.applyStepNumbers(
                      getStepsFromWorkflow(workflow)
                        .map(mapStepNameToName)
                    )
                  );

      let currentStepId = $state.current.name || steps[0].id;
      let currentStep = _.findWhere(steps, { id: currentStepId }) || steps[0];
  
      vm.state = {
        steps: steps,
        currentMajorStep: currentStep,
        currentStep: currentStep,
        buttons: currentStep.buttons || {}
      };

      $scope.$on('$stateChangeSuccess', onStateChangeSuccess);

      $scope.$watch(()=>vm.state.buttons.next && vm.state.buttons.next.disabled,
                    watchDisabledNext);
      return $state.go(vm.state.currentStep.id);
    }

    function watchDisabledNext(newVal) {
      if (newVal === undefined) {
        return;
      }

      let currentStep = _.findWhere(vm.state.steps, {id: vm.state.currentStep.id });

      currentStep.complete = !newVal;

      var nextItem =
          wizardService
            .getNextItem(wizardService.filterParents(vm.state.steps), currentStep);

      if (currentStep.complete) {
        if (!nextItem){
          return;
        }
        nextItem.disabled = false;
      } else {
         vm.state.steps = disableNextSteps(vm.state.steps, currentStep);
      }

    }


    function disableNextSteps(steps, currentStep) {

      let currentStepIndex = steps.indexOf(currentStep);

      if (currentStepIndex < 0) {
        return steps;
      }

      return steps.map(function(oStep, stepIndex) {
        let step = Object.assign({}, oStep);
        if (stepIndex > currentStepIndex) {
          step.disabled = true;
        }
        return step;
      });

    }

    

    function nextClick(wizardState) {
      if (!wizardState.currentStep.onComplete ||
          !angular.isFunction(wizardState.currentStep.onComplete)) {
        return stepComplete();
      }
      return $q.when(wizardState.currentStep.onComplete($scope.wizardData))
               .then(stepComplete);

      function stepComplete() {
        wizardState.currentStep.complete = true;

        var nextItem =
          wizardService
            .getNextItem(wizardService.filterParents(wizardState.steps), wizardState.currentStep);

        if (!nextItem) {
          return complete(wizardState);
        }
        nextItem.disabled = false;

        return wizardService.goToStep(wizardState, nextItem);
      }

    }

    

    function previousClick(wizardState) {
      var previousItem =
        wizardService
          .getPreviousItem(wizardService.filterParents(wizardState.steps), wizardState.currentStep);

      if (!previousItem) {
        return cancelClick(wizardState);
      }

      return wizardService.goToStep(wizardState, previousItem);
    }

    function cancelClick(wizardState) {
      return cancel(wizardState);
    }

    function cancel(wizardState) {
      return wizardService.fireCallbackIfExist($scope.wizardCallbacks,
                                               'cancel',
                                               {wizardState: wizardState,
                                                wizardData: $scope.wizardData});
    }

    function complete(wizardState) {
      return wizardService.fireCallbackIfExist($scope.wizardCallbacks,
                                               'complete',
                                               {wizardState: wizardState,
                                                wizardData: $scope.wizardData});
    }

    function onStateChangeSuccess(evt, toState) {
      return wizardService.setStep(vm.state, toState.id);
    }




  }


})();