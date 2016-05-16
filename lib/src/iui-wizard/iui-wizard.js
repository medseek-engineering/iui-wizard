(function() {
  'use strict';

  // Follow the Angular Style Guide: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

  angular.module('iuiWizard')
    .directive('iuiWizard', iuiWizard);

  function iuiWizard() {
    // Babel is preprocessing JS, so we can use ES2015 features https://babeljs.io/docs/learn-es2015/
    let directive = {
      restrict: 'E',
      templateUrl: '/$iui-wizard/iui-wizard/iui-wizard.html',
      // Controller names must be capitalized because they are constructors
      controller: WizardController,
      // controllerAs & bindToController in directive syntax is only available in Ang 1.3+
      controllerAs: 'wizard',
      bindToController: true,
      transclude: true,
      scope: {
        name: '@',
        steps: '=',
        buttons: '=',
        callbacks: '='
      }
    };
    return directive;
  }

  WizardController.$inject = ['$scope', 'wizardSettings'];

  function WizardController($scope, wizardSettings) {
    // Define Variables up top
    let vm = this;
    vm.settings = angular.copy(wizardSettings);
    vm.stepsDropdown = {
      isOpen: false
    };

    vm.stepClick = stepClick;

    vm.dropdown = {
      isOpen: false
    };

    // if activate function is necessary
    // this gives you the ability to order the sequence of method calls
    // made when the directive is created
    activate();

    function activate() {
      $scope.$watch(() => vm.steps, watchWizardSteps);
      $scope.$watch(() => vm.buttons, watchButtons);
    }

    function watchWizardSteps(newVal) {
      if (!newVal || !newVal.length) {
        return;
      }
      vm.currentStep = _.findWhere(newVal, { active: true });
      vm.currentStep.isOpen = true;
      vm.currentStep.index = newVal.indexOf(vm.currentStep) + 1;
    }

    function watchButtons(newVal) {
      if (!newVal) {
        return;
      }

      vm.settings.buttons = _.mapValues(wizardSettings.buttons, function(button, buttonKey) {
        return _.extend({}, button, vm.buttons[buttonKey]);
      });
      
    }

    function stepClick($event, step) {
      if (step.steps && step.steps.length) {
        $event.stopPropagation();
        step.isOpen = !step.isOpen;
      }
      if (vm.callbacks.goToStep) {
        vm.callbacks.goToStep(step);
      }
    }
  }


})();