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
        wizardState: '=',
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
      $scope.$watch(function () {
        return vm.wizardState.steps;
      }, watchSteps, true);
      $scope.$watch(function () {
        return vm.wizardState.buttons;
      }, watchButtons, true);
    }

    function watchButtons(newVal) {
      if (!newVal) {
        return;
      }

      vm.settings.buttons = _.mapValues(wizardSettings.buttons, function (button, buttonKey) {
        return _.extend({}, button, vm.wizardState.buttons[buttonKey]);
      });
    }

    function watchSteps(newVal) {
      if (!newVal) {
        return;
      }
      function mapSteps(step) {
        step.steps = _.where(newVal, { parent: step.id });
        return step;
      }

      vm.steps = newVal.filter(filterSubSteps).map(mapSteps);
    }

    function filterSubSteps(step) {
      return !step.parent;
    }

    function nextClick() {
      vm.callbacks.nextClick(vm.wizardState);
    }

    function previousClick() {
      vm.callbacks.previousClick(vm.wizardState);
    }

    function cancelClick() {
      vm.callbacks.cancelClick(vm.wizardState);
    }

    function saveClick() {
      vm.callbacks.saveClick(vm.wizardState);
    }

    function stepClick($event, step) {
      if (step.steps && step.steps.length) {
        $event.stopPropagation();
        step.isOpen = !step.isOpen;
        return;
      }
      if (vm.callbacks.goToStep) {
        vm.callbacks.goToStep(vm.wizardState, step);
      }
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
        name: 'Next',
        visible: true,
        disabled: false,
        className: ''
      },
      previous: {
        name: 'Previous',
        visible: true,
        disabled: false,
        className: ''
      },
      save: {
        name: 'Save',
        visible: false,
        disabled: false,
        className: ''
      },
      cancel: {
        name: 'Cancel',
        visible: true,
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
    $templateCache.put('/$iui-wizard/icons/symbol-defs.html', '<svg style="display: none">\n' + '  <symbol id="icon-arrow-top" viewBox="0 0 792 792">\n' + '    <path d="M637.743,591.129L396.002,349.916l-241.74,241.213l-74.26-74.258l316-316.001l316,316.001L637.743,591.129z"/>\n' + '  </symbol>\n' + '  <symbol id="icon-arrow-right" viewBox="0 0 792 792">\n' + '    <path d="M200.87,637.74L442.084,396L200.87,154.26L275.128,80L591.13,396L275.128,712L200.87,637.74z"/>\n' + '  </symbol>\n' + '  <symbol id="icon-arrow-bottom" viewBox="0 0 792 792">\n' + '    <path d="M154.26,200.87L396,442.084L637.74,200.87L712,275.128L396,591.13L80,275.128L154.26,200.87z"/>\n' + '  </symbol>\n' + '  <symbol id="icon-arrow-left" viewBox="0 0 792 792">\n' + '    <path d="M591.13,154.26L349.916,396L591.13,637.74L516.872,712L200.87,396L516.872,80L591.13,154.26z"/>\n' + '  </symbol>\n' + '  <symbol id="icon-checkmark" viewBox="0 0 18 14">\n' + '   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' + '    <g transform="translate(1.000000, 1.000000)" stroke="#6aa84f" stroke-width="2">\n' + '      <path d="M16,0 L5,11 L0,6"></path>\n' + '    </g>\n' + '  </g>\n' + '  </symbol>\n' + '  \n' + '</svg>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.wizardTemplates');
  } catch (e) {
    module = angular.module('iui.wizardTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-wizard/iui-wizard/iui-wizard.html', '<section class="wizard">\n' + '  <header class="wizard-header" ng-class="{\'open\': wizard.dropdown.isOpen}">\n' + '    <h1 class="wizard-name" ng-bind="wizard.name"></h1>\n' + '    <h2 class="wizard-current-step wizard-desktop-hide">\n' + '      {{wizard.settings.text.step}} {{wizard.wizardState.currentMajorStep.stepNumber }}: {{wizard.wizardState.currentMajorStep.name}}\n' + '    </h2>\n' + '    <div\n' + '      class="btn-group btn-group-wizard-steps wizard-mobile-hide"\n' + '      dropdown>\n' + '      <button\n' + '        dropdown-toggle\n' + '        type="button" \n' + '        class="btn btn-simple btn-wizard-current-step dropdown-toggle">\n' + '        {{wizard.settings.text.step}} {{wizard.wizardState.currentMajorStep.stepNumber }}<span class="wizard-mobile-hide"> {{wizard.settings.text.of}} {{wizard.steps.length}}</span>: {{wizard.wizardState.currentMajorStep.name}}\n' + '        <span class="caret"></span>\n' + '      </button>\n' + '      <ol \n' + '        class="dropdown-menu wizard-steps-dropdown-menu wizard-steps wizard-major-steps">\n' + '        <li\n' + '          ng-repeat="step in wizard.steps track by step.id"\n' + '          ng-class="{\'wizard-item-active\': wizard.wizardState.currentMajorStep === step,  \'wizard-item-completed\': step.completed, \'wizard-item-disabled\': step.disabled, \'has-substeps\': step.steps.length && !step.disabled, \'substeps-open\': step.isOpen}">\n' + '          <button\n' + '            role="button"\n' + '            type="button"\n' + '            class="btn-menu-item wizard-step"\n' + '            ng-disabled="step.disabled"\n' + '            ng-click="wizard.stepClick($event, step)">\n' + '            {{step.name}}\n' + '            <svg ng-if="step.complete" class="icon icon-checkmark">\n' + '              <use xlink:href="#icon-checkmark" />\n' + '            </svg>\n' + '          </button>\n' + '          <div ng-if="step.steps.length && !!step.isOpen">\n' + '            <ol class="wizard-steps wizard-minor-steps wizard-sub-steps">\n' + '              <li\n' + '                ng-repeat="subStep in step.steps track by subStep.id"\n' + '                ng-class="{\'wizard-item-active\': wizard.wizardState.currentStep === subStep, \'wizard-item-completed\': subStep.completed, \'wizard-item-disabled\': subStep.disabled }">\n' + '                <button\n' + '                  role="button"\n' + '                  type="button"\n' + '                  class="btn-menu-item wizard-step wizard-sub-step"\n' + '                  ng-disabled="subStep.disabled"\n' + '                  ng-click="wizard.stepClick($event, subStep)">\n' + '                  {{subStep.name}}\n' + '                  <svg ng-if="subStep.complete" class="icon icon-checkmark">\n' + '                    <use xlink:href="#icon-checkmark" />\n' + '                  </svg>\n' + '                    \n' + '                </button>\n' + '              </li>\n' + '            </ol>\n' + '          </div>\n' + '        </li>\n' + '      </ol>\n' + '    </div>\n' + '    <ul class="wizard-buttons wizard-mobile-hide">\n' + '      <li ng-if="wizard.settings.buttons.next.visible">\n' + '        <wizard-button\n' + '          class="btn btn-primary"\n' + '          button="wizard.settings.buttons.next"\n' + '          callback="wizard.nextClick">\n' + '          {{wizard.settings.buttons.next.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.previous.visible">\n' + '        <wizard-button\n' + '          class="btn btn-default"\n' + '          button="wizard.settings.buttons.previous"\n' + '          callback="wizard.previousClick">\n' + '          {{wizard.settings.buttons.previous.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.save.visible">\n' + '        <wizard-button\n' + '          class="btn btn-default"\n' + '          button="wizard.settings.buttons.save"\n' + '          callback="wizard.saveClick">\n' + '          {{wizard.settings.buttons.save.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.cancel.visible">\n' + '        <wizard-button\n' + '          class="btn btn-default"\n' + '          button="wizard.settings.buttons.cancel"\n' + '          callback="wizard.cancelClick">\n' + '          {{wizard.settings.buttons.cancel.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '    </ul>\n' + '    <div\n' + '      class="btn-group btn-group-wizard-options-menu wizard-desktop-hide" \n' + '      is-open="wizard.dropdown.isOpen">\n' + '      <button\n' + '        class="btn btn-simple btn-wizard-options-menu"\n' + '        role="button"\n' + '        type="button" \n' + '        dropdown-toggle\n' + '        ng-click="wizard.dropdown.isOpen = !wizard.dropdown.isOpen"\n' + '        ng-class="{\'btn-active\': wizard.dropdown.isOpen}">\n' + '        <svg class="icon">\n' + '          <use xlink:href="#icon-arrow-bottom" />\n' + '        </svg>\n' + '      </button>\n' + '    </div>\n' + '    <ul class="dropdown-menu wizard-options-menu-dropdown">\n' + '      <li ng-if="wizard.settings.buttons.save.visible">\n' + '        <wizard-button\n' + '          class="btn-menu-item"\n' + '          button="wizard.settings.buttons.save"\n' + '          callback="wizard.saveClick">\n' + '          {{wizard.settings.buttons.save.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.cancel.visible">\n' + '        <wizard-button\n' + '          class="btn-menu-item"\n' + '          button="wizard.settings.buttons.cancel"\n' + '          callback="wizard.cancelClick">\n' + '          {{wizard.settings.buttons.cancel.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '    </ul>\n' + '  </header>\n' + '  <div\n' + '    class="wizard-body"\n' + '    ng-transclude>\n' + '\n' + '  </div>\n' + '  <footer class="wizard-mobile-footer wizard-desktop-hide">\n' + '    <wizard-button\n' + '      class="btn btn-default"\n' + '      button="wizard.settings.buttons.previous"\n' + '      callback="wizard.previousClick">\n' + '      {{wizard.settings.buttons.previous.name}}\n' + '    </wizard-button>\n' + '    <wizard-button\n' + '      class="btn btn-primary"\n' + '      button="wizard.settings.buttons.next"\n' + '      callback="wizard.nextClick">\n' + '      {{wizard.settings.buttons.next.name}}\n' + '    </wizard-button>\n' + '  </footer>\n' + '  <div ng-include="\'/$iui-wizard/icons/symbol-defs.html\'"></div>\n' + '</section>');
  }]);
})();