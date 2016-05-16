'use strict';

(function () {
  'use strict';

  angular.module('iui.wizard', ['iui.wizardTemplates', 'iuiWizard']);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiWizard', []);
})();
'use strict';

(function () {
  'use strict';

  var iuiWizardConfig = {};

  angular.module('iuiWizard').value('iuiWizardConfig', iuiWizardConfig);
})();
'use strict';

(function () {
  'use strict';

  // Follow the Angular Style Guide: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

  angular.module('iuiWizard').directive('iuiWizard', iuiWizard);

  function iuiWizard() {
    // Babel is preprocessing JS, so we can use ES2015 features https://babeljs.io/docs/learn-es2015/
    var directive = {
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
    var vm = this;
    vm.settings = angular.copy(wizardSettings);

    // if activate function is necessary
    // this gives you the ability to order the sequence of method calls
    // made when the directive is created
    activate();

    function activate() {
      $scope.$watch(function () {
        return vm.steps;
      }, watchWizardSteps);
      $scope.$watch(function () {
        return vm.buttons;
      }, watchButtons);
    }

    function watchWizardSteps(newVal) {
      if (!newVal || !newVal.length) {
        return;
      }
      vm.currentStep = _.findWhere(newVal, { active: true });
      vm.currentStep.index = newVal.indexOf(vm.currentStep) + 1;
    }

    function watchButtons(newVal) {
      if (!newVal) {
        return;
      }

      vm.settings.buttons = _.mapValues(wizardSettings.buttons, function (button, buttonKey) {
        return _.extend({}, button, vm.buttons[buttonKey]);
      });
    }
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('iuiWizard').directive('wizardButton', wizardButton);

  function wizardButton() {
    var directive = {
      scope: {
        button: '=',
        callback: '='
      },
      replace: true,
      // ES6 template syntax
      transclude: true,
      template: '\n        <button \n          class="{{button.className}}"\n          role="button"\n          type="button"\n          ng-click="callback()"\n          ng-disabled="button.disabled"\n          ng-transclude>\n        </button>\n      '
    };

    return directive;
  }
})();
'use strict';

(function () {
  'use strict';

  var wizardSettings = {
    text: {
      'step': 'Step',
      'of': 'of',
      'options': 'Options'
    },
    buttons: {
      next: {
        title: 'Next',
        visible: true,
        callback: null,
        disabled: false,
        className: ''
      },
      previous: {
        title: 'Previous',
        visible: true,
        callback: null,
        disabled: false,
        className: ''
      },
      save: {
        title: 'Save',
        visible: false,
        callback: null,
        disabled: false,
        className: ''
      },
      cancel: {
        title: 'Cancel',
        visible: true,
        callback: null,
        disabled: false,
        className: ''
      }
    }
  };

  angular.module('iuiWizard').constant('wizardSettings', wizardSettings);
})();
'use strict';

(function (module) {
  try {
    module = angular.module('iui.wizardTemplates');
  } catch (e) {
    module = angular.module('iui.wizardTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-wizard/icons/symbol-defs.html', '<svg style="display: none">\n' + '  <symbol id="icon-arrow-right" viewBox="0 0 792 792">\n' + '    <path d="M200.87,637.74L442.084,396L200.87,154.26L275.128,80L591.13,396L275.128,712L200.87,637.74z"/>\n' + '  </symbol>\n' + '  <symbol id="icon-arrow-left" viewBox="0 0 792 792">\n' + '    <path d="M591.13,154.26L349.916,396L591.13,637.74L516.872,712L200.87,396L516.872,80L591.13,154.26z"/>\n' + '  </symbol>\n' + '</svg>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.wizardTemplates');
  } catch (e) {
    module = angular.module('iui.wizardTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-wizard/iui-wizard/iui-wizard.html', '<section class="wizard">\n' + '  <header class="wizard-header">\n' + '    <h1 class="wizard-name" ng-bind="wizard.name"></h1>\n' + '    <h2 class="wizard-current-step wizard-desktop-hide">\n' + '      {{wizard.settings.text.step}} {{wizard.currentStep.index }}: {{wizard.currentStep.name}}\n' + '    </h2>\n' + '    <div class="btn-group btn-group-wizard-steps wizard-mobile-hide">\n' + '      <button\n' + '        type="button" \n' + '        class="btn btn-wizard-current-step dropdown-toggle">\n' + '        {{wizard.settings.text.step}} {{wizard.currentStep.index }}<span class="wizard-mobile-hide"> {{wizard.settings.text.of}} {{wizard.steps.length}}</span>: {{wizard.currentStep.name}}\n' + '        <span class="caret"></span>\n' + '      </button>\n' + '      <ol class="dropdown-menu wizard-steps-dropdown-menu wizard-steps wizard-major-steps">\n' + '        <li\n' + '          ng-repeat="step in wizard.steps track by step.id"\n' + '          ng-class="{\'wizard-item-active\': step.active,  \'wizard-item-completed\': step.completed, \'wizard-item-disabled\': step.disabled }">\n' + '          <button\n' + '            role="button"\n' + '            type="button"\n' + '            class="wizard-step"\n' + '            ng-disabled="step.disabled"\n' + '            ng-bind="step.name"></button>\n' + '          <div\n' + '            collapse="!step.active"\n' + '            ng-if="step.steps.length">\n' + '            <ol class="wizard-steps wizard-minor-steps wizard-sub-steps">\n' + '              <li\n' + '                ng-repeat="subStep in step.steps track by subStep.id"\n' + '                ng-class="{\'wizard-item-active\': subStep.active, \'wizard-item-completed\': subStep.completed, \'wizard-item-disabled\': subStep.disabled }">\n' + '                <button\n' + '                  ng-disabled="subStep.disabled"\n' + '                  role="button"\n' + '                  type="button"\n' + '                  class="wizard-step wizard-sub-step"\n' + '                  ng-bind="subStep.name"></button>\n' + '              </li>\n' + '            </ol>\n' + '          </div>\n' + '        </li>\n' + '      </ol>\n' + '    </div>\n' + '    <ul class="wizard-buttons wizard-mobile-hide">\n' + '      <li ng-if="wizard.settings.buttons.next.visible">\n' + '        <wizard-button\n' + '          class="btn btn-primary"\n' + '          button="wizard.settings.buttons.next"\n' + '          callback="wizard.callbacks.nextClick">\n' + '          {{wizard.settings.buttons.next.title}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.previous.visible">\n' + '        <wizard-button\n' + '          class="btn btn-default"\n' + '          button="wizard.settings.buttons.previous"\n' + '          callback="wizard.callbacks.previousClick">\n' + '          {{wizard.settings.buttons.previous.title}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.save.visible">\n' + '        <wizard-button\n' + '          class="btn btn-default"\n' + '          button="wizard.settings.buttons.save"\n' + '          callback="wizard.callbacks.saveClick">\n' + '          {{wizard.settings.buttons.save.title}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.cancel.visible">\n' + '        <wizard-button\n' + '          class="btn btn-default"\n' + '          button="wizard.settings.buttons.cancel"\n' + '          callback="wizard.callbacks.cancelClick">\n' + '          {{wizard.settings.buttons.cancel.title}}\n' + '        </wizard-button>\n' + '      </li>\n' + '    </ul>\n' + '    <a\n' + '      href=""\n' + '      class="wizard-mobile-previous-button wizard-desktop-hide"\n' + '      role="button"\n' + '      ng-click="wizard.callbacks.previousClick()">\n' + '      <svg class="icon icon-arrow-left">\n' + '        <use xlink:href="#icon-arrow-left" />\n' + '      </svg>\n' + '      <span class="sr-only">{{wizard.settings.buttons.previous.title}}</span>\n' + '    </a>\n' + '  </header>\n' + '  <div\n' + '    class="wizard-body"\n' + '    ng-transclude>\n' + '\n' + '  </div>\n' + '  <footer class="wizard-mobile-footer wizard-desktop-hide">\n' + '    <div\n' + '      class="btn-group btn-group-wizard-more action-sheet-dropdown"\n' + '      ng-if="wizard.settings.buttons.cancel.visible || wizard.settings.buttons.save.visible">\n' + '      <button\n' + '        type="button" \n' + '        class="btn btn-default dropdown-toggle">\n' + '        <span>\n' + '          {{wizard.settings.text.options}}\n' + '        </span>\n' + '      </button>\n' + '      <ul class="dropdown-menu">\n' + '        <li ng-if="wizard.settings.buttons.save.visible">\n' + '          <wizard-button\n' + '            button="wizard.settings.buttons.save"\n' + '            callback="wizard.callbacks.saveClick">\n' + '            {{wizard.settings.buttons.save.title}}\n' + '          </wizard-button>\n' + '        </li>\n' + '        <li ng-if="wizard.settings.buttons.cancel.visible">\n' + '          <wizard-button\n' + '            button="wizard.settings.buttons.cancel"\n' + '            callback="wizard.callbacks.cancelClick">\n' + '            {{wizard.settings.buttons.cancel.title}}\n' + '          </wizard-button>\n' + '        </li>\n' + '      </ul>\n' + '    </div>\n' + '    <wizard-button\n' + '      class="btn btn-primary"\n' + '      button="wizard.settings.buttons.next"\n' + '      callback="wizard.callbacks.nextClick">\n' + '      {{wizard.settings.buttons.next.title}}\n' + '      <svg class="icon icon-arrow-right">\n' + '        <use xlink:href="#icon-arrow-right" />\n' + '      </svg>\n' + '    </wizard-button>\n' + '  </footer>\n' + '  <div ng-include="\'/$iui-wizard/icons/symbol-defs.html\'"></div>\n' + '</section>');
  }]);
})();