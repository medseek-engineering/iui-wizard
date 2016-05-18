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
        callback: null,
        disabled: false,
        className: ''
      },
      previous: {
        name: 'Previous',
        visible: true,
        callback: null,
        disabled: false,
        className: ''
      },
      save: {
        name: 'Save',
        visible: false,
        callback: null,
        disabled: false,
        className: ''
      },
      cancel: {
        name: 'Cancel',
        visible: true,
        callback: null,
        disabled: false,
        className: ''
      }
    }
  };

  angular
    .module('iuiWizard')
    .constant('wizardSettings', wizardSettings);
})();