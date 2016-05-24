(function() {
  'use strict';

  angular
    .module('iui.wizard')
    .directive('wizardStep', wizardStep);

  function wizardStep() {
    const directive = {
      scope: {
        step: '=',
        currentMajorStep: '=',
        currentStep: '=',
        stepClick: '=',
        buttonClass: '='
      },
      controller: WizardStepController,
      replace: true,
      templateUrl: '/$iui-wizard/wizard-step/wizard-step.html'
    };

    return directive;
  }

  WizardStepController.$inject = ['$scope', 'wizardService'];
  function WizardStepController($scope, wizardService) {
    $scope.getStepClass = wizardService.getStepClass;
  }

})();