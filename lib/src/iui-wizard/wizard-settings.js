(function() {
  'use strict';

  const wizardSettings = {
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

  angular
    .module('iuiWizard')
    .constant('wizardSettings', wizardSettings);
})();