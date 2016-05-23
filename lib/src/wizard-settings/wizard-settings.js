(function() {
  'use strict';

  const wizardSettings = {
    text: {
      'step': 'Step',
      'of': 'of',
      'options': 'Options'
    },
    classNames: {
      wizardStep: {
        active: 'wizard-item-active',
        completed: 'wizard-item-completed',
        disabled: 'wizard-item-disabled',
        hasSubsteps: 'has-substeps',
        substepsOpen: 'substeps-open'
      }
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
    .module('iui.wizard')
    .constant('wizardSettings', wizardSettings);
})();