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
      replace: true,
      templateUrl: '/$iui-wizard/wizard-step/wizard-step.html'
    };

    return directive;

  }

})();