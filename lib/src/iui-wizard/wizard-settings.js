(function() {
  'use strict';

  const wizardSettings = {
    text: {
      'step': 'Step',
      'more': 'More',
      'of': 'of',
      'action': 'Action'
    },
    buttons: {
      next: {
        title: 'Next',
        visible: true,
        callback: null,
        disabled: false,
        className: 'btn btn-primary'
      },
      previous: {
        title: 'Previous',
        visible: true,
        callback: null,
        disabled: false,
        className: 'btn btn-default'
      },
      save: {
        title: 'Save',
        visible: false,
        callback: null,
        disabled: false,
        className: 'btn btn-default'
      },
      cancel: {
        title: 'Cancel',
        visible: true,
        callback: null,
        disabled: false,
        className: 'btn btn-default'
      }
    }
  };

  angular
    .module('iuiWizard')
    .constant('wizardSettings', wizardSettings);
})();