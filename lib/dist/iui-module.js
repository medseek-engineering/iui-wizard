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
      template: '\n        <button \n          class="{{button.className}}"\n          role="button"\n          type="button"\n          ng-click="callback()"\n          ng-disabled="button.disabled">\n          {{button.title}}\n        </button>\n      '
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
      'more': 'More',
      'of': 'of',
      'action': 'Action'
    },
    buttons: {
      next: {
        title: 'Next',
        visible: true,
        callback: null,
        disabled: false,
        className: 'btn btn-primary'
      },
      previous: {
        title: 'Previous',
        visible: true,
        callback: null,
        disabled: false,
        className: 'btn btn-default'
      },
      save: {
        title: 'Save',
        visible: false,
        callback: null,
        disabled: false,
        className: 'btn btn-default'
      },
      cancel: {
        title: 'Cancel',
        visible: true,
        callback: null,
        disabled: false,
        className: 'btn btn-default'
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
    $templateCache.put('/$iui-wizard/iui-wizard/iui-wizard.html', '<section class="wizard">\n' + '  <header class="wizard-header">\n' + '    <div class="btn-group btn-group-wizard-more wizard-desktop-hide">\n' + '      <button\n' + '        type="button" \n' + '        class="btn btn-default dropdown-toggle">\n' + '        {{wizard.settings.text.action}}\n' + '        <span class="caret"></span>\n' + '      </button>\n' + '      <div class="dropdown-menu">\n' + '        <ul class="list-unstyled">\n' + '          <li>\n' + '            <wizard-button\n' + '              button="wizard.settings.buttons.save"\n' + '              callback="wizard.callbacks.saveClick"></wizard-button>\n' + '          </li>\n' + '          <li>\n' + '            <wizard-button\n' + '              button="wizard.settings.buttons.cancel"\n' + '              callback="wizard.callbacks.cancelClick"></wizard-button>\n' + '          </li>\n' + '        </ul>\n' + '      </div>\n' + '    </div>\n' + '    <h1 class="wizard-name" ng-bind="wizard.name"></h1>\n' + '    <div class="btn-group btn-group-wizard-steps">\n' + '      <button\n' + '        type="button" \n' + '        class="btn btn-wizard-current-step dropdown-toggle">\n' + '        {{wizard.settings.text.step}} {{wizard.currentStep.index }} <span class="wizard-mobile-hide">{{wizard.settings.text.of}} {{wizard.steps.length}}</span>: {{wizard.currentStep.name}}\n' + '        <span class="caret"></span>\n' + '      </button>\n' + '      <div class="dropdown-menu wizard-steps-dropdown-menu ">\n' + '        <ol class="wizard-steps wizard-major-steps">\n' + '          <li\n' + '            ng-repeat="step in wizard.steps track by step.id"\n' + '            ng-class="{\'wizard-item-active\': step.active,  \'wizard-item-completed\': step.completed, \'wizard-item-disabled\': step.disabled }">\n' + '            <button\n' + '              role="button"\n' + '              type="button"\n' + '              class="wizard-step"\n' + '              ng-bind="step.name"></button>\n' + '            <div\n' + '              collapse="!step.active"\n' + '              ng-if="step.steps.length">\n' + '              <ol class="wizard-steps wizard-minor-steps wizard-sub-steps">\n' + '                <li\n' + '                  ng-repeat="subStep in step.steps track by subStep.id"\n' + '                  ng-class="{\'wizard-item-active\': subStep.active, \'wizard-item-completed\': subStep.completed, \'wizard-item-disabled\': subStep.disabled }">\n' + '                  <button\n' + '                    role="button"\n' + '                    type="button"\n' + '                    class="wizard-step wizard-sub-step"\n' + '                    ng-bind="subStep.name"></button>\n' + '                </li>\n' + '              </ol>\n' + '            </div>\n' + '          </li>\n' + '        </ol>\n' + '      </div>\n' + '    </div>\n' + '    \n' + '    <ul class="wizard-buttons wizard-mobile-hide">\n' + '      <li>\n' + '        <wizard-button\n' + '          button="wizard.settings.buttons.next"\n' + '          callback="wizard.callbacks.nextClick"></wizard-button>\n' + '      </li>\n' + '      <li>\n' + '        <wizard-button\n' + '          button="wizard.settings.buttons.previous"\n' + '          callback="wizard.callbacks.previousClick"></wizard-button>\n' + '      </li>\n' + '      <li>\n' + '        <wizard-button\n' + '          button="wizard.settings.buttons.save"\n' + '          callback="wizard.callbacks.saveClick"></wizard-button>\n' + '      </li>\n' + '      <li>\n' + '        <wizard-button\n' + '          button="wizard.settings.buttons.cancel"\n' + '          callback="wizard.callbacks.cancelClick"></wizard-button>\n' + '      </li>\n' + '    </ul>\n' + '  </header>\n' + '  <div\n' + '    class="wizard-body"\n' + '    ng-transclude>\n' + '\n' + '  </div>\n' + '  <footer class="wizard-mobile-footer wizard-desktop-hide">\n' + '    <wizard-button\n' + '      button="wizard.settings.buttons.previous"\n' + '      callback="wizard.callbacks.previousClick"></wizard-button>\n' + '    <wizard-button\n' + '      button="wizard.settings.buttons.next"\n' + '      callback="wizard.callbacks.nextClick"></wizard-button>\n' + '  </footer>\n' + '</section>');
  }]);
})();