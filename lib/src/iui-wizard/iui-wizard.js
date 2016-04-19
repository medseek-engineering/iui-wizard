(function() {
  'use strict';

  angular.module('iuiWizard')
    .directive('iuiWizard', wizard);

  function wizard() {
    var directive = {
      restrict: 'E',
      templateUrl: '/$iui-wizard/iui-wizard/iui-wizard.html',
      controller: WizardController,
      scope: {
        steps: '='
      }
    };
    return directive;
  }

  WizardController.$inject = [];

  function WizardController() {
    
  }


})();