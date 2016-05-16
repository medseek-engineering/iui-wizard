(function() {
  'use strict';

  angular
    .module('iuiWizard')
    .directive('wizardButton', wizardButton);


  function wizardButton() {
    const directive = {
      scope: {
        button: '=',
        callback: '='
      },
      replace: true,
      // ES6 template syntax
      transclude: true,
      template: `
        <button 
          class="{{button.className}}"
          role="button"
          type="button"
          ng-click="callback()"
          ng-disabled="button.disabled"
          ng-transclude>
        </button>
      `
    };

    return directive;

  }

})();