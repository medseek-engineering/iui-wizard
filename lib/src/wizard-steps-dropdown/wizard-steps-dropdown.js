(function() {
  'use strict';

  angular
    .module('iui.wizard')
    .directive('wizardStepsDropdown', wizardStepsDropdown);


  function wizardStepsDropdown() {
    const directive = {
      restrict: 'E',
      scope: {
        steps: '=',
        currentMajorStep: '=',
        currentStep: '=',
        stepClick: '=',
        settings: '='
      },
      replace: true,
      templateUrl: '/$iui-wizard/wizard-steps-dropdown/wizard-steps-dropdown.html'
    };

    return directive;

  }

})();