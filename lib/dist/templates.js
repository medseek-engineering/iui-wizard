(function(module) {
try {
  module = angular.module('iui.wizardTemplates');
} catch (e) {
  module = angular.module('iui.wizardTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-wizard/iui-wizard/iui-wizard.html',
    '<section class="wizard">\n' +
    '  <header class="wizard-header">\n' +
    '    <div class="btn-group btn-group-wizard-more wizard-desktop-hide">\n' +
    '      <button\n' +
    '        type="button" \n' +
    '        class="btn btn-default dropdown-toggle">\n' +
    '        {{wizard.settings.text.action}}\n' +
    '        <span class="caret"></span>\n' +
    '      </button>\n' +
    '      <div class="dropdown-menu">\n' +
    '        <ul class="list-unstyled">\n' +
    '          <li>\n' +
    '            <wizard-button\n' +
    '              button="wizard.settings.buttons.save"\n' +
    '              callback="wizard.callbacks.saveClick"></wizard-button>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <wizard-button\n' +
    '              button="wizard.settings.buttons.cancel"\n' +
    '              callback="wizard.callbacks.cancelClick"></wizard-button>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <h1 class="wizard-name" ng-bind="wizard.name"></h1>\n' +
    '    <div class="btn-group btn-group-wizard-steps">\n' +
    '      <button\n' +
    '        type="button" \n' +
    '        class="btn btn-wizard-current-step dropdown-toggle">\n' +
    '        {{wizard.settings.text.step}} {{wizard.currentStep.index }} <span class="wizard-mobile-hide">{{wizard.settings.text.of}} {{wizard.steps.length}}</span>: {{wizard.currentStep.name}}\n' +
    '        <span class="caret"></span>\n' +
    '      </button>\n' +
    '      <div class="dropdown-menu wizard-steps-dropdown-menu ">\n' +
    '        <ol class="wizard-steps wizard-major-steps">\n' +
    '          <li\n' +
    '            ng-repeat="step in wizard.steps track by step.id"\n' +
    '            ng-class="{\'wizard-item-active\': step.active,  \'wizard-item-completed\': step.completed, \'wizard-item-disabled\': step.disabled }">\n' +
    '            <button\n' +
    '              role="button"\n' +
    '              type="button"\n' +
    '              class="wizard-step"\n' +
    '              ng-bind="step.name"></button>\n' +
    '            <div\n' +
    '              collapse="!step.active"\n' +
    '              ng-if="step.steps.length">\n' +
    '              <ol class="wizard-steps wizard-minor-steps wizard-sub-steps">\n' +
    '                <li\n' +
    '                  ng-repeat="subStep in step.steps track by subStep.id"\n' +
    '                  ng-class="{\'wizard-item-active\': subStep.active, \'wizard-item-completed\': subStep.completed, \'wizard-item-disabled\': subStep.disabled }">\n' +
    '                  <button\n' +
    '                    role="button"\n' +
    '                    type="button"\n' +
    '                    class="wizard-step wizard-sub-step"\n' +
    '                    ng-bind="subStep.name"></button>\n' +
    '                </li>\n' +
    '              </ol>\n' +
    '            </div>\n' +
    '          </li>\n' +
    '        </ol>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    \n' +
    '    <ul class="wizard-buttons wizard-mobile-hide">\n' +
    '      <li>\n' +
    '        <wizard-button\n' +
    '          button="wizard.settings.buttons.next"\n' +
    '          callback="wizard.callbacks.nextClick"></wizard-button>\n' +
    '      </li>\n' +
    '      <li>\n' +
    '        <wizard-button\n' +
    '          button="wizard.settings.buttons.previous"\n' +
    '          callback="wizard.callbacks.previousClick"></wizard-button>\n' +
    '      </li>\n' +
    '      <li>\n' +
    '        <wizard-button\n' +
    '          button="wizard.settings.buttons.save"\n' +
    '          callback="wizard.callbacks.saveClick"></wizard-button>\n' +
    '      </li>\n' +
    '      <li>\n' +
    '        <wizard-button\n' +
    '          button="wizard.settings.buttons.cancel"\n' +
    '          callback="wizard.callbacks.cancelClick"></wizard-button>\n' +
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
    '      button="wizard.settings.buttons.previous"\n' +
    '      callback="wizard.callbacks.previousClick"></wizard-button>\n' +
    '    <wizard-button\n' +
    '      button="wizard.settings.buttons.next"\n' +
    '      callback="wizard.callbacks.nextClick"></wizard-button>\n' +
    '  </footer>\n' +
    '</section>');
}]);
})();
