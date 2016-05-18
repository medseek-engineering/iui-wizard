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
        wizardState: '=',
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
    vm.nextClick = nextClick;
    vm.previousClick = previousClick;
    vm.cancelClick = cancelClick;
    vm.saveClick = saveClick;

    vm.dropdown = {
      isOpen: false
    };

    // if activate function is necessary
    // this gives you the ability to order the sequence of method calls
    // made when the directive is created
    activate();

    function activate() {
      $scope.$watch(() => vm.wizardState.steps, watchSteps, true);
      $scope.$watch(() => vm.wizardState.buttons, watchButtons, true);
    }

    function watchButtons(newVal) {
      if (!newVal) {
        return;
      }

      vm.settings.buttons = _.mapValues(wizardSettings.buttons, function(button, buttonKey) {
        return _.extend({}, button, vm.wizardState.buttons[buttonKey]);
      });
      
    }

    function watchSteps(newVal) {
      if (!newVal) {
        return;
      }
      function mapSteps(step) {
        step.steps = _.where(newVal, {parent: step.id });
        return step;
      }

      vm.steps = newVal.filter(filterSubSteps).map(mapSteps);
    }

    function filterSubSteps(step) {
      return !step.parent;
    }

    function nextClick() {
      vm.callbacks.nextClick(vm.wizardState);
    }

    function previousClick() {
      vm.callbacks.previousClick(vm.wizardState);
    }

    function cancelClick() {
      vm.callbacks.cancelClick(vm.wizardState);
    }

    function saveClick() {
      vm.callbacks.saveClick(vm.wizardState);
    }

    function stepClick($event, step) {
      if (step.steps && step.steps.length) {
        $event.stopPropagation();
        step.isOpen = !step.isOpen;
        return;
      }
      if (vm.callbacks.goToStep) {
        vm.callbacks.goToStep(vm.wizardState, step);
      }
    }
  }


})();