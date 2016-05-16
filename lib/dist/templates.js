(function(module) {
try {
  module = angular.module('iui.wizardTemplates');
} catch (e) {
  module = angular.module('iui.wizardTemplates', []);
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
  module = angular.module('iui.wizardTemplates');
} catch (e) {
  module = angular.module('iui.wizardTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-wizard/iui-wizard/iui-wizard.html',
    '<section class="wizard">\n' +
    '  <header class="wizard-header" ng-class="{\'open\': wizard.dropdown.isOpen}">\n' +
    '    <h1 class="wizard-name" ng-bind="wizard.name"></h1>\n' +
    '    <h2 class="wizard-current-step wizard-desktop-hide">\n' +
    '      {{wizard.settings.text.step}} {{wizard.currentStep.index }}: {{wizard.currentStep.name}}\n' +
    '    </h2>\n' +
    '    <div\n' +
    '      class="btn-group btn-group-wizard-steps wizard-mobile-hide"\n' +
    '      dropdown>\n' +
    '      <button\n' +
    '        dropdown-toggle\n' +
    '        type="button" \n' +
    '        class="btn btn-simple btn-wizard-current-step dropdown-toggle">\n' +
    '        {{wizard.settings.text.step}} {{wizard.currentStep.index }}<span class="wizard-mobile-hide"> {{wizard.settings.text.of}} {{wizard.steps.length}}</span>: {{wizard.currentStep.name}}\n' +
    '        <span class="caret"></span>\n' +
    '      </button>\n' +
    '      <ol \n' +
    '        class="dropdown-menu wizard-steps-dropdown-menu wizard-steps wizard-major-steps">\n' +
    '        <li\n' +
    '          ng-repeat="step in wizard.steps track by step.id"\n' +
    '          ng-class="{\'wizard-item-active\': step.active,  \'wizard-item-completed\': step.completed, \'wizard-item-disabled\': step.disabled, \'has-substeps\': step.steps.length && !step.disabled, \'substeps-open\': step.isOpen}">\n' +
    '          <button\n' +
    '            role="button"\n' +
    '            type="button"\n' +
    '            class="btn-menu-item wizard-step"\n' +
    '            ng-disabled="step.disabled"\n' +
    '            ng-click="wizard.stepClick($event, step)">\n' +
    '            {{step.name}}\n' +
    '            <svg ng-if="step.complete" class="icon icon-checkmark">\n' +
    '              <use xlink:href="#icon-checkmark" />\n' +
    '            </svg>\n' +
    '          </button>\n' +
    '          <div\n' +
    '            collapse="!step.isOpen"\n' +
    '            ng-if="step.steps.length">\n' +
    '            <ol class="wizard-steps wizard-minor-steps wizard-sub-steps">\n' +
    '              <li\n' +
    '                ng-repeat="subStep in step.steps track by subStep.id"\n' +
    '                ng-class="{\'wizard-item-active\': subStep.active, \'wizard-item-completed\': subStep.completed, \'wizard-item-disabled\': subStep.disabled }">\n' +
    '                <button\n' +
    '                  role="button"\n' +
    '                  type="button"\n' +
    '                  class="btn-menu-item wizard-step wizard-sub-step"\n' +
    '                  ng-disabled="subStep.disabled"\n' +
    '                  ng-click="wizard.stepClick($event, subStep)"\n' +
    '                  ng-bind="subStep.name"></button>\n' +
    '              </li>\n' +
    '            </ol>\n' +
    '          </div>\n' +
    '        </li>\n' +
    '      </ol>\n' +
    '    </div>\n' +
    '    <ul class="wizard-buttons wizard-mobile-hide">\n' +
    '      <li ng-if="wizard.settings.buttons.next.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn btn-primary"\n' +
    '          button="wizard.settings.buttons.next"\n' +
    '          callback="wizard.callbacks.nextClick">\n' +
    '          {{wizard.settings.buttons.next.title}}\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '      <li ng-if="wizard.settings.buttons.previous.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn btn-default"\n' +
    '          button="wizard.settings.buttons.previous"\n' +
    '          callback="wizard.callbacks.previousClick">\n' +
    '          {{wizard.settings.buttons.previous.title}}\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '      <li ng-if="wizard.settings.buttons.save.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn btn-default"\n' +
    '          button="wizard.settings.buttons.save"\n' +
    '          callback="wizard.callbacks.saveClick">\n' +
    '          {{wizard.settings.buttons.save.title}}\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '      <li ng-if="wizard.settings.buttons.cancel.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn btn-default"\n' +
    '          button="wizard.settings.buttons.cancel"\n' +
    '          callback="wizard.callbacks.cancelClick">\n' +
    '          {{wizard.settings.buttons.cancel.title}}\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '    <div\n' +
    '      class="btn-group btn-group-wizard-options-menu wizard-desktop-hide" \n' +
    '      is-open="wizard.dropdown.isOpen">\n' +
    '      <button\n' +
    '        type="button" \n' +
    '        dropdown-toggle\n' +
    '        ng-click="wizard.dropdown.isOpen = !wizard.dropdown.isOpen"\n' +
    '        class="btn btn-simple btn-wizard-options-menu">\n' +
    '        <svg class="icon">\n' +
    '          <use\n' +
    '            xlink:href="#icon-arrow-top"\n' +
    '            ng-if="wizard.dropdown.isOpen" />\n' +
    '          <use\n' +
    '            xlink:href="#icon-arrow-bottom"\n' +
    '            ng-if="!wizard.dropdown.isOpen" />\n' +
    '        </svg>\n' +
    '      </button>\n' +
    '    </div>\n' +
    '    <ul class="dropdown-menu wizard-options-menu-dropdown">\n' +
    '      <li ng-if="wizard.settings.buttons.save.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn-menu-item"\n' +
    '          button="wizard.settings.buttons.save"\n' +
    '          callback="wizard.callbacks.saveClick">\n' +
    '          {{wizard.settings.buttons.save.title}}\n' +
    '        </wizard-button>\n' +
    '      </li>\n' +
    '      <li ng-if="wizard.settings.buttons.cancel.visible">\n' +
    '        <wizard-button\n' +
    '          class="btn-menu-item"\n' +
    '          button="wizard.settings.buttons.cancel"\n' +
    '          callback="wizard.callbacks.cancelClick">\n' +
    '          {{wizard.settings.buttons.cancel.title}}\n' +
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
    '      callback="wizard.callbacks.previousClick">\n' +
    '      {{wizard.settings.buttons.previous.title}}\n' +
    '    </wizard-button>\n' +
    '    <wizard-button\n' +
    '      class="btn btn-primary"\n' +
    '      button="wizard.settings.buttons.next"\n' +
    '      callback="wizard.callbacks.nextClick">\n' +
    '      {{wizard.settings.buttons.next.title}}\n' +
    '    </wizard-button>\n' +
    '  </footer>\n' +
    '  <div ng-include="\'/$iui-wizard/icons/symbol-defs.html\'"></div>\n' +
    '</section>');
}]);
})();
