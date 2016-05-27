(function() {
  'use strict';

  angular
    .module('iui.wizard')
    .directive('wizardButton', wizardButton);


  function wizardButton() {
    const directive = {
      restrict: 'E',
      scope: {
        button: '=',
        callback: '='
      },
      replace: true,
      transclude: true,
      // ES6 template syntax
      template: `
        <button 
          role="button"
          type="button"
          ng-class="button.className"
          ng-click="callback($event, button)"
          ng-disabled="button.disabled"
          ng-transclude>
        </button>
      `
    };

    return directive;

  }

})();