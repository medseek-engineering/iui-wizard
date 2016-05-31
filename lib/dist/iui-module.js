'use strict';

(function () {
  'use strict';

  angular.module('iui.wizard', []);
})();
'use strict';

(function () {
  'use strict';

  // Follow the Angular Style Guide: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

  angular.module('iui.wizard').directive('iuiWizard', iuiWizard);

  function iuiWizard() {
    // Babel is preprocessing JS, so we can use ES2015 features https://babeljs.io/docs/learn-es2015/
    var directive = {
      restrict: 'E',
      templateUrl: '/$iui-wizard/iui-wizard/iui-wizard.html',
      // Controller names must be capitalized because they are constructors
      controller: WizardController,
      // controllerAs & bindToController in directive syntax is only available in Ang 1.3+
      controllerAs: 'wizard',
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
        return $scope.wizardState.steps;
      }, watchSteps, true);
      $scope.$watch(function () {
        return $scope.wizardState.buttons;
      }, watchButtons, true);
    }

    function watchButtons(newVal) {
      if (!newVal) {
        return;
      }

      vm.settings.buttons = _.mapValues(wizardSettings.buttons, function (button, buttonKey) {
        return _.extend({}, button, $scope.wizardState.buttons[buttonKey]);
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
      $scope.callbacks.nextClick($scope.wizardState);
    }

    function previousClick() {
      $scope.callbacks.previousClick($scope.wizardState);
    }

    function cancelClick() {
      $scope.callbacks.cancelClick($scope.wizardState);
    }

    function saveClick() {
      $scope.callbacks.saveClick($scope.wizardState);
    }

    function stepClick($event, step) {
      if (step.steps && step.steps.length) {
        $event.stopPropagation();
        step.isOpen = !step.isOpen;
        return;
      }
      if ($scope.callbacks.goToStep) {
        $scope.callbacks.goToStep($scope.wizardState, step);
      }
    }
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
    classNames: {
      wizardStep: {
        active: 'wizard-item-active',
        completed: 'wizard-item-completed',
        disabled: 'wizard-item-disabled',
        hasSubsteps: 'has-substeps',
        substepsOpen: 'substeps-open'
      }
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

  angular.module('iui.wizard').constant('wizardSettings', wizardSettings);
})();
'use strict';

(function () {
  'use strict';

  angular.module('iui.wizard').factory('wizardService', wizardService);

  wizardService.$inject = ['wizardSettings'];
  function wizardService(wizardSettings) {
    var factory = {
      getStepClass: getStepClass
    };

    return factory;

    function getStepClass(step, currentMajorStep, currentStep) {
      if (!step || !currentMajorStep || !currentStep) {
        return;
      }

      var classExpression = [{
        className: wizardSettings.classNames.wizardStep.active,
        expression: currentMajorStep.id === step.id
      }, {
        className: wizardSettings.classNames.wizardStep.active,
        expression: step.parent && currentStep.id === step.id
      }, {
        className: wizardSettings.classNames.wizardStep.completed,
        expression: step.completed
      }, {
        className: wizardSettings.classNames.wizardStep.disabled,
        expression: step.disabled
      }, {
        className: wizardSettings.classNames.wizardStep.hasSubsteps,
        expression: step.steps && step.steps.length && !step.disabled
      }, {
        className: wizardSettings.classNames.wizardStep.substepsOpen,
        expression: step.isOpen
      }];

      return classExpression.filter(function (classObject) {
        return classObject.expression;
      }).map(function (classObject) {
        return classObject.className;
      });
    }
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('iui.wizard').directive('wizardButton', wizardButton);

  function wizardButton() {
    var directive = {
      restrict: 'E',
      scope: {
        button: '=',
        callback: '='
      },
      replace: true,
      transclude: true,
      // ES6 template syntax
      template: '\n        <button \n          role="button"\n          type="button"\n          ng-class="button.className"\n          ng-click="callback($event, button)"\n          ng-disabled="button.disabled"\n          ng-transclude>\n        </button>\n      '
    };

    return directive;
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('iui.wizard').directive('wizardStepsDropdown', wizardStepsDropdown);

  function wizardStepsDropdown() {
    var directive = {
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
'use strict';

(function () {
  'use strict';

  angular.module('iui.wizard').directive('wizardStep', wizardStep);

  function wizardStep() {
    var directive = {
      restrict: 'E',
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
'use strict';

(function (module) {
  try {
    module = angular.module('iui.wizard');
  } catch (e) {
    module = angular.module('iui.wizard', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-wizard/icons/symbol-defs.html', '<svg style="display: none">\n' + '  <symbol id="icon-arrow-top" viewBox="0 0 792 792">\n' + '    <path d="M637.743,591.129L396.002,349.916l-241.74,241.213l-74.26-74.258l316-316.001l316,316.001L637.743,591.129z"/>\n' + '  </symbol>\n' + '  <symbol id="icon-arrow-right" viewBox="0 0 792 792">\n' + '    <path d="M200.87,637.74L442.084,396L200.87,154.26L275.128,80L591.13,396L275.128,712L200.87,637.74z"/>\n' + '  </symbol>\n' + '  <symbol id="icon-arrow-bottom" viewBox="0 0 792 792">\n' + '    <path d="M154.26,200.87L396,442.084L637.74,200.87L712,275.128L396,591.13L80,275.128L154.26,200.87z"/>\n' + '  </symbol>\n' + '  <symbol id="icon-arrow-left" viewBox="0 0 792 792">\n' + '    <path d="M591.13,154.26L349.916,396L591.13,637.74L516.872,712L200.87,396L516.872,80L591.13,154.26z"/>\n' + '  </symbol>\n' + '  <symbol id="icon-checkmark" viewBox="0 0 18 14">\n' + '   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' + '    <g transform="translate(1.000000, 1.000000)" stroke="#6aa84f" stroke-width="2">\n' + '      <path d="M16,0 L5,11 L0,6"></path>\n' + '    </g>\n' + '  </g>\n' + '  </symbol>\n' + '  \n' + '</svg>\n' + '');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.wizard');
  } catch (e) {
    module = angular.module('iui.wizard', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-wizard/iui-wizard/iui-wizard.html', '<section class="wizard">\n' + '  <header class="wizard-header" ng-class="{\'open\': wizard.dropdown.isOpen}">\n' + '    <h1 class="wizard-name" ng-bind="name"></h1>\n' + '    <h2 class="wizard-current-step wizard-desktop-hide">\n' + '      {{wizard.settings.text.step}} {{wizardState.currentMajorStep.stepNumber }}: {{wizardState.currentMajorStep.name}}\n' + '    </h2>\n' + '    <wizard-steps-dropdown\n' + '      class="wizard-mobile-hide"\n' + '      settings="wizard.settings"\n' + '      steps="wizard.steps"\n' + '      current-major-step="wizardState.currentMajorStep"\n' + '      current-step="wizardState.currentStep"\n' + '      step-click="wizard.stepClick"></wizard-steps-dropdown>\n' + '    <ul class="wizard-buttons wizard-mobile-hide">\n' + '      <li ng-if="wizard.settings.buttons.next.visible">\n' + '        <wizard-button\n' + '          class="btn btn-primary"\n' + '          button="wizard.settings.buttons.next"\n' + '          callback="wizard.nextClick">\n' + '          {{wizard.settings.buttons.next.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.previous.visible">\n' + '        <wizard-button\n' + '          class="btn btn-default"\n' + '          button="wizard.settings.buttons.previous"\n' + '          callback="wizard.previousClick">\n' + '          {{wizard.settings.buttons.previous.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.save.visible">\n' + '        <wizard-button\n' + '          class="btn btn-default"\n' + '          button="wizard.settings.buttons.save"\n' + '          callback="wizard.saveClick">\n' + '          {{wizard.settings.buttons.save.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.cancel.visible">\n' + '        <wizard-button\n' + '          class="btn btn-default"\n' + '          button="wizard.settings.buttons.cancel"\n' + '          callback="wizard.cancelClick">\n' + '          {{wizard.settings.buttons.cancel.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '    </ul>\n' + '    <div\n' + '      class="btn-group btn-group-wizard-options-menu wizard-desktop-hide" \n' + '      is-open="wizard.dropdown.isOpen">\n' + '      <button\n' + '        class="btn wizard-btn-simple btn-wizard-options-menu"\n' + '        role="button"\n' + '        type="button" \n' + '        dropdown-toggle\n' + '        ng-click="wizard.dropdown.isOpen = !wizard.dropdown.isOpen"\n' + '        ng-class="{\'btn-active\': wizard.dropdown.isOpen}">\n' + '        <svg class="wizard-icon">\n' + '          <use xlink:href="#icon-arrow-bottom" />\n' + '        </svg>\n' + '      </button>\n' + '    </div>\n' + '    <ul class="dropdown-menu wizard-options-menu-dropdown">\n' + '      <li ng-if="wizard.settings.buttons.save.visible">\n' + '        <wizard-button\n' + '          class="btn-menu-item"\n' + '          button="wizard.settings.buttons.save"\n' + '          callback="wizard.saveClick">\n' + '          {{wizard.settings.buttons.save.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '      <li ng-if="wizard.settings.buttons.cancel.visible">\n' + '        <wizard-button\n' + '          class="btn-menu-item"\n' + '          button="wizard.settings.buttons.cancel"\n' + '          callback="wizard.cancelClick">\n' + '          {{wizard.settings.buttons.cancel.name}}\n' + '        </wizard-button>\n' + '      </li>\n' + '    </ul>\n' + '  </header>\n' + '  <div\n' + '    class="wizard-body"\n' + '    ng-transclude>\n' + '\n' + '  </div>\n' + '  <footer class="wizard-mobile-footer wizard-desktop-hide">\n' + '    <wizard-button\n' + '      class="btn btn-default"\n' + '      button="wizard.settings.buttons.previous"\n' + '      callback="wizard.previousClick">\n' + '      {{wizard.settings.buttons.previous.name}}\n' + '    </wizard-button>\n' + '    <wizard-button\n' + '      class="btn btn-primary"\n' + '      button="wizard.settings.buttons.next"\n' + '      callback="wizard.nextClick">\n' + '      {{wizard.settings.buttons.next.name}}\n' + '    </wizard-button>\n' + '  </footer>\n' + '  <div ng-include="\'/$iui-wizard/icons/symbol-defs.html\'"></div>\n' + '</section>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.wizard');
  } catch (e) {
    module = angular.module('iui.wizard', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-wizard/wizard-step/wizard-step.html', '<li\n' + '  ng-class="getStepClass(step, currentMajorStep, currentStep)">\n' + '  <wizard-button\n' + '    class="btn-menu-item wizard-step"\n' + '    callback="stepClick"\n' + '    button="step">\n' + '    {{step.name}}\n' + '    <svg ng-if="step.complete" class="wizard-icon wizard-icon-checkmark">\n' + '      <use xlink:href="#icon-checkmark" />\n' + '    </svg>\n' + '  </wizard-button>\n' + '  <div ng-if="step.steps.length && !!step.isOpen">\n' + '    <ol class="wizard-steps wizard-minor-steps wizard-sub-steps">\n' + '      <li\n' + '        ng-repeat="subStep in step.steps track by subStep.id"\n' + '        ng-class="getStepClass(subStep, currentMajorStep, currentStep)">\n' + '        <wizard-button\n' + '          class="btn-menu-item wizard-step wizard-sub-step"\n' + '          callback="stepClick"\n' + '          button="subStep">\n' + '          {{subStep.name}}\n' + '          <svg ng-if="subStep.complete" class="wizard-icon wizard-icon-checkmark">\n' + '            <use xlink:href="#icon-checkmark" />\n' + '          </svg>\n' + '      </li>\n' + '    </ol>\n' + '  </div>\n' + '</li>');
  }]);
})();

(function (module) {
  try {
    module = angular.module('iui.wizard');
  } catch (e) {
    module = angular.module('iui.wizard', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-wizard/wizard-steps-dropdown/wizard-steps-dropdown.html', '<div\n' + '  class="btn-group btn-group-wizard-steps"\n' + '  dropdown>\n' + '  <button\n' + '    dropdown-toggle\n' + '    type="button" \n' + '    class="btn wizard-btn-simple btn-wizard-current-step">\n' + '    {{settings.text.step}} {{currentMajorStep.stepNumber }}<span class="wizard-mobile-hide"> {{settings.text.of}} {{steps.length}}</span>: {{currentMajorStep.name}}\n' + '    <span class="caret"></span>\n' + '  </button>\n' + '  <ol \n' + '    class="dropdown-menu wizard-steps-dropdown-menu wizard-steps wizard-major-steps">\n' + '    <wizard-step\n' + '      ng-repeat="step in steps track by step.id"\n' + '      current-step="currentStep"\n' + '      current-major-step="currentMajorStep"\n' + '      step-click="stepClick"\n' + '      step="step"></wizard-step>\n' + '  </ol>\n' + '</div>');
  }]);
})();