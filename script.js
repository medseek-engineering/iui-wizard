(function() {
  'use strict';

  angular
    .module('app', ['ui.bootstrap','iui.wizard'])
    .constant('_', window._)
    .controller('TestController', TestController);

  function TestController() {
    var vm = this;
    vm.name = 'World!';

    vm.buttons = {
      next: {
        title: 'Next'
      }
    };

    vm.steps = [
      {
        name: 'Build Stuff',
        id: 'step1',
        active: false,
        complete: true,
        disabled: false,
        steps: [
          {
            name: 'Step 1 sub A',
            id: 'step1a',
            active: false,
            complete: true,
            disabled: false
          },
          {
            name: 'Step 1 sub B',
            id: 'step1b',
            active: false,
            complete: true,
            disabled: false
          }
        ]
      },
      {
        name: 'Do Stuff',
        id: 'step2',
        active: true,
        complete: false,
        disabled: false
      },
      {
        name: 'Do Stuff even better',
        id: 'step3',
        active: false,
        complete: false,
        disabled: true
      }
    ];

    vm.callbacks = {
      nextClick: nextClick
    };

    function nextClick(wizardId, wizardState) {
      console.log('boomddddd');
    }

  }

})();