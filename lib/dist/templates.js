(function(module) {
try {
  module = angular.module('iui.wizard');
} catch (e) {
  module = angular.module('iui.wizard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-wizard/icons/symbol-defs.html',
    '<svg style="display: none">\n' +
    '  <symbol id="icon-arrow-top" viewBox="0 0 792 792">\n' +
    '    <path d="M637.743,591.129L396.002,349.916l-241.74,241.213l-74.26-74.258l316-316.001l316,316.001L637.743,591.129z"/>\n' +
    '  </symbol>\n' +
    '  <symbol id="icon-arrow-right" viewBox="0 0 792 792">\n' +
    '    <path d="M200.87,637.74L442.084,396L200.87,154.26L275.128,80L591.13,396L275.128,712L200.87,637.74z"/>\n' +
    '  </symbol>\n' +
    '  <symbol id="icon-arrow-bottom" viewBox="0 0 792 792">\n' +
    '    <path d="M154.26,200.87L396,442.084L637.74,200.87L712,275.128L396,591.13L80,275.128L154.26,200.87z"/>\n' +
    '  </symbol>\n' +
    '  <symbol id="icon-arrow-left" viewBox="0 0 792 792">\n' +
    '    <path d="M591.13,154.26L349.916,396L591.13,637.74L516.872,712L200.87,396L516.872,80L591.13,154.26z"/>\n' +
    '  </symbol>\n' +
    '  <symbol id="icon-checkmark" viewBox="0 0 18 14">\n' +
    '   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '    <g transform="translate(1.000000, 1.000000)" stroke="#6aa84f" stroke-width="2">\n' +
    '      <path d="M16,0 L5,11 L0,6"></path>\n' +
    '    </g>\n' +
    '  </g>\n' +
    '  </symbol>\n' +
    '  \n' +
    '</svg>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.wizard');
} catch (e) {
  module = angular.module('iui.wizard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-wizard/iui-wizard/iui-wizard.html',
    '<section class="wizard">\n' +
    '  <header class="wizard-header" ng-class="{\'open\': wizard.dropdown.isOpen}">\n' +
    '    <h1 class="wizard-name" ng-bind="name"></h1>\n' +
    '    <h2 class="wizard-current-step wizard-desktop-hide">\n' +
    '      <span translate="{{wizard.settings.text.step}}"></span> {{wizardState.currentMajorStep.stepNumber }}: <span translate="{{wizardState.currentMajorStep.name}}"></span>\n' +
    '    </h2>\n' +
    '    <wizard-steps-dropdown\n' +
    '      class="wizard-mobile-hide"\n' +
    '      settings="wizard.settings"\n' +
    '      steps="wizard.steps"\n' +
    '      current-major-step="wizardState.currentMajorStep"\n' +
    '      current-step="wizardState.currentStep"\n' +
    '      step-click="wizard.stepClick"></wizard-steps-dropdown>\n' +
    '    <ul class="wizard-buttons wizard-mobile-hide">\n' +
    '      <li ng-if="wizard.settings.buttons.next.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn btn-primary"\n' +
    '          button="wizard.settings.buttons.next"\n' +
    '          callback="wizard.nextClick">\n' +
    '          <span translate="{{wizard.settings.buttons.next.name}}"></span>\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '      <li ng-if="wizard.settings.buttons.previous.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn btn-default"\n' +
    '          button="wizard.settings.buttons.previous"\n' +
    '          callback="wizard.previousClick">\n' +
    '          <span translate="{{wizard.settings.buttons.previous.name}}"></span>\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '      <li ng-if="wizard.settings.buttons.save.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn btn-default"\n' +
    '          button="wizard.settings.buttons.save"\n' +
    '          callback="wizard.saveClick">\n' +
    '          <span translate="{{wizard.settings.buttons.save.name}}"></span>\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '      <li ng-if="wizard.settings.buttons.cancel.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn btn-default"\n' +
    '          button="wizard.settings.buttons.cancel"\n' +
    '          callback="wizard.cancelClick">\n' +
    '          <span translate="{{wizard.settings.buttons.cancel.name}}"></span>\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '    <div\n' +
    '      ng-if="wizard.settings.buttons.save.visible || wizard.settings.buttons.cancel.visible"\n' +
    '      class="btn-group btn-group-wizard-options-menu wizard-desktop-hide" \n' +
    '      is-open="wizard.dropdown.isOpen">\n' +
    '      <button\n' +
    '        class="btn wizard-btn-simple btn-wizard-options-menu"\n' +
    '        role="button"\n' +
    '        type="button" \n' +
    '        dropdown-toggle\n' +
    '        ng-click="wizard.dropdown.isOpen = !wizard.dropdown.isOpen"\n' +
    '        ng-class="{\'btn-active\': wizard.dropdown.isOpen}">\n' +
    '        <svg class="wizard-icon">\n' +
    '          <use xlink:href="#icon-arrow-bottom" />\n' +
    '        </svg>\n' +
    '      </button>\n' +
    '    </div>\n' +
    '    <ul class="dropdown-menu wizard-options-menu-dropdown">\n' +
    '      <li ng-if="wizard.settings.buttons.save.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn-menu-item"\n' +
    '          button="wizard.settings.buttons.save"\n' +
    '          callback="wizard.saveClick">\n' +
    '          <span translate="{{wizard.settings.buttons.save.name}}"></span>\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '      <li ng-if="wizard.settings.buttons.cancel.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn-menu-item"\n' +
    '          button="wizard.settings.buttons.cancel"\n' +
    '          callback="wizard.cancelClick">\n' +
    '          <span translate="{{wizard.settings.buttons.cancel.name}}"></span>\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '  </header>\n' +
    '  <div\n' +
    '    class="wizard-body"\n' +
    '    ng-transclude>\n' +
    '\n' +
    '  </div>\n' +
    '  <footer class="wizard-mobile-footer wizard-desktop-hide">\n' +
    '    <wizard-button\n' +
    '      class="btn btn-default"\n' +
    '      button="wizard.settings.buttons.previous"\n' +
    '      callback="wizard.previousClick">\n' +
    '      <span translate="{{wizard.settings.buttons.previous.name}}"></span>\n' +
    '    </wizard-button>\n' +
    '    <wizard-button\n' +
    '      class="btn btn-primary"\n' +
    '      button="wizard.settings.buttons.next"\n' +
    '      callback="wizard.nextClick">\n' +
    '      <span translate="{{wizard.settings.buttons.next.name}}"></span>\n' +
    '    </wizard-button>\n' +
    '  </footer>\n' +
    '  <div ng-include="\'/$iui-wizard/icons/symbol-defs.html\'"></div>\n' +
    '</section>');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.wizard');
} catch (e) {
  module = angular.module('iui.wizard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-wizard/wizard-step/wizard-step.html',
    '<li\n' +
    '  ng-class="getStepClass(step, currentMajorStep, currentStep)">\n' +
    '  <wizard-button\n' +
    '    class="btn-menu-item wizard-step"\n' +
    '    callback="stepClick"\n' +
    '    button="step">\n' +
    '    <span translate="{{step.name}}"></span>\n' +
    '    <svg ng-if="step.complete" class="wizard-icon wizard-icon-checkmark">\n' +
    '      <use xlink:href="#icon-checkmark" />\n' +
    '    </svg>\n' +
    '  </wizard-button>\n' +
    '  <div ng-if="step.steps.length && !!step.isOpen">\n' +
    '    <ol class="wizard-steps wizard-minor-steps wizard-sub-steps">\n' +
    '      <li\n' +
    '        ng-repeat="subStep in step.steps track by subStep.id"\n' +
    '        ng-class="getStepClass(subStep, currentMajorStep, currentStep)">\n' +
    '        <wizard-button\n' +
    '          class="btn-menu-item wizard-step wizard-sub-step"\n' +
    '          callback="stepClick"\n' +
    '          button="subStep">\n' +
    '          <span translate="{{subStep.name}}"></span>\n' +
    '          <svg ng-if="subStep.complete" class="wizard-icon wizard-icon-checkmark">\n' +
    '            <use xlink:href="#icon-checkmark" />\n' +
    '          </svg>\n' +
    '      </li>\n' +
    '    </ol>\n' +
    '  </div>\n' +
    '</li>');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.wizard');
} catch (e) {
  module = angular.module('iui.wizard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-wizard/wizard-steps-dropdown/wizard-steps-dropdown.html',
    '<div\n' +
    '  class="btn-group btn-group-wizard-steps"\n' +
    '  dropdown>\n' +
    '  <button\n' +
    '    dropdown-toggle\n' +
    '    type="button" \n' +
    '    class="btn wizard-btn-simple btn-wizard-current-step">\n' +
    '    <span translate="{{settings.text.step}}"></span> {{currentMajorStep.stepNumber }}<span class="wizard-mobile-hide"> <span translate="{{settings.text.of}}"></span> {{steps.length}}</span>: <span translate="{{currentMajorStep.name}}"></span>\n' +
    '    <span class="caret"></span>\n' +
    '  </button>\n' +
    '  <ol \n' +
    '    class="dropdown-menu wizard-steps-dropdown-menu wizard-steps wizard-major-steps">\n' +
    '    <wizard-step\n' +
    '      ng-repeat="step in steps track by step.id"\n' +
    '      current-step="currentStep"\n' +
    '      current-major-step="currentMajorStep"\n' +
    '      step-click="stepClick"\n' +
    '      step="step"></wizard-step>\n' +
    '  </ol>\n' +
    '</div>');
}]);
})();
