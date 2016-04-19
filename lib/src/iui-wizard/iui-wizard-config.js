(function() {
  'use strict';

  var iuiWizardConfig = {
    valueDefaultTemplate: '/$iui-lists/iui-key-value/value-default-template.html',
    fieldDefaultTemplate: '/$iui-lists/iui-key-value/field-default-template.html'
  };

  angular.module('iuiWizard')
    .value('iuiWizardConfig', iuiWizardConfig);

})();