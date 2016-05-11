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
      scope: {
        name: '='
      }
    };
    return directive;
  }

  WizardController.$inject = [];

  function WizardController() {
    // Define Variables up top
    var vm = this;
    vm.hello = 'Hello';
    // Public methods are listed here:
    vm.exampleMethod = exampleMethod;

    // if activate function is necessary
    // this gives you the ability to order the sequence of method calls
    // made when the directive is created
    activate();

    // Methods in the form of function syntax below

    function activate() {}

    function exampleMethod() {
      return 'foo';
    }
  }
})();
'use strict';

(function (module) {
  try {
    module = angular.module('iui.wizardTemplates');
  } catch (e) {
    module = angular.module('iui.wizardTemplates', []);
  }
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('/$iui-wizard/iui-wizard/iui-wizard.html', '<section>\n' + '  {{wizard.hello}} {{wizard.name}}\n' + '</section>');
  }]);
})();