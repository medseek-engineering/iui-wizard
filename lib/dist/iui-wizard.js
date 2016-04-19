(function (app) {
  'use strict';
  app.ng.requires.push('iui.wizard');
}(window.app));
(function() {
  'use strict';
  angular.module('iui.wizard', ['iui.wizardTemplates', 'iuiWizard']);
})();
(function() {
  'use strict';

  angular.module('iuiWizard', []);

})();
(function() {
  'use strict';

  var iuiWizardConfig = {
    valueDefaultTemplate: '/$iui-lists/iui-key-value/value-default-template.html',
    fieldDefaultTemplate: '/$iui-lists/iui-key-value/field-default-template.html'
  };

  angular.module('iuiWizard')
    .value('iuiWizardConfig', iuiWizardConfig);

})();
(function() {
  'use strict';

  angular.module('iuiWizard')
    .directive('iuiWizard', wizard);

  function wizard() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/$iui-wizard/iui-wizard/iui-wizard.html',
      controller: WizardController,
      scope: {
        steps: '='
      }
    };
    return directive;
  }

  WizardController.$inject = ['$scope', 'iuiWizardConfig'];

  function WizardController($scope, iuiWizardConfig) {
    $scope.wizardSettings = iuiWizardConfig;
  }


})();