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
        title: 'Next',
        visible: true,
        callback: null,
        disabled: false,
        className: ''
      },
      previous: {
        title: 'Previous',
        visible: true,
        callback: null,
        disabled: false,
        className: ''
      },
      save: {
        title: 'Save',
        visible: false,
        callback: null,
        disabled: false,
        className: ''
      },
      cancel: {
        title: 'Cancel',
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