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
      link: link,
      replace: true,
      templateUrl: '/$iui-wizard/wizard-step/wizard-step.html'
    };

    return directive;

    function link(scope) {
      scope.stepClass = stepClass;

      function stepClass(step, currentMajorStep, currentStep) {

        console.log(step);

        if(!step || !currentMajorStep || !currentStep) {
          return;
        }

        var classExpression = [
          {
            className:'wizard-item-active',
            expression: currentMajorStep.id === step.id
          },
          {
            className:'wizard-item-active',
            expression: step.parent && (currentStep.id === step.id)
          },
          {
            className:'wizard-item-completed',
            expression: step.completed
          },
          {
            className:'wizard-item-disabled',
            expression: step.disabled
          },
          {
            className:'has-substeps',
            expression: step.steps && step.steps.length && !step.disabled
          },
          {
            className:'substeps-open',
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

  }

})();