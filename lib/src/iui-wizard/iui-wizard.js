(function() {
  'use strict';

  // Follow the Angular Style Guide: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

  angular.module('iui.wizard')
    .directive('iuiWizard', iuiWizard);

  function iuiWizard() {
    // Babel is preprocessing JS, so we can use ES2015 features https://babeljs.io/docs/learn-es2015/
    const directive = {
      restrict: 'E',
      templateUrl: '/$iui-wizard/iui-wizard/iui-wizard.html',
      // Controller names must be capitalized because they are constructors
      controller: WizardController,
      // controllerAs & bindToController in directive syntax is only available in Ang 1.3+
      controllerAs: 'wizard',
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
    const vm = this;
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
      $scope.$watch(() => $scope.wizardState.steps, watchSteps, true);
      $scope.$watch(() => $scope.wizardState.buttons, watchButtons, true);
    }

    function watchButtons(newVal) {
      if (!newVal) {
        return;
      }

      vm.settings.buttons = _.mapValues(wizardSettings.buttons, function(button, buttonKey) {
        return _.extend({}, button, $scope.wizardState.buttons[buttonKey]);
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
      $scope.callbacks.nextClick($scope.wizardState);
    }

    function previousClick() {
      $scope.callbacks.previousClick($scope.wizardState);
    }

    function cancelClick() {
      $scope.callbacks.cancelClick($scope.wizardState);
    }

    function saveClick() {
      $scope.callbacks.saveClick($scope.wizardState);
    }

    function stepClick($event, step) {
      if (step.steps && step.steps.length) {
        $event.stopPropagation();
        step.isOpen = !step.isOpen;
        return;
      }
      if ($scope.callbacks.goToStep) {
        $scope.callbacks.goToStep($scope.wizardState, step);
      }
    }
  }


})();