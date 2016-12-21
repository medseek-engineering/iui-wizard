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
        wizardCallbacks: '=',
        wizardData: '='
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
        controller.activate(stepValue);
      });
      
    }
  }

  TheWizardController.$inject = [
    'wizardService',
    'wizardRouterHelper',
    '$state',
    '$q',
    '$scope'
  ];
  function TheWizardController(wizardService, wizardRouterHelper, $state, $q, $scope) {
    // Define Variables up top
    const vm = this;
    vm.activate = activate;
    vm.callbacks = {
      nextClick: nextClick,
      previousClick: previousClick,
      cancelClick: cancelClick,
      goToStep: wizardService.goToStep
    };

    function activate(steps, wizardCallbacks) {
      // how do we know what the substate is of this wizard?

      var currentStepId = $state.current.name || steps[0].id;
      var currentStep = _.findWhere(steps, { id: currentStepId }) || steps[0];
  
      var tempState = {
        steps: steps,
        currentMajorStep: currentStep,
        currentStep: currentStep,
        buttons: {}
      };


      return wizardService.goToStep(tempState, tempState.currentStep)
        .then(function(wizardState) {
          vm.state = wizardState;
        });
    }

    function nextClick(wizardState) {     
      var nextItem =
        wizardService
          .getNextItem(wizardService.filterParents(wizardState.steps), wizardState.currentStep);

      if (!nextItem) {
        return complete(wizardState);
      }
      if (!wizardState.currentStep.onComplete ||
          !angular.isFunction(wizardState.currentStep.onComplete)) {
        return wizardService.goToStep(wizardState, nextItem);
      }
      return $q.when(wizardState.currentStep.onComplete($scope.wizardData, wizardState, nextItem))
               .then(()=>wizardService.goToStep(wizardState, nextItem));

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




  }


})();