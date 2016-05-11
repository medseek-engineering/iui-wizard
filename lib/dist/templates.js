(function(module) {
try {
  module = angular.module('iui.wizardTemplates');
} catch (e) {
  module = angular.module('iui.wizardTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-wizard/iui-wizard/iui-wizard.html',
    '<section>\n' +
    '  {{wizard.hello}} {{wizard.name}}\n' +
    '</section>');
}]);
})();
