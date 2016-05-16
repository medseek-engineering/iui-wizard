(function() {
  'use strict';

  angular
    .module('app', ['ui.bootstrap', 'iui.wizard', 'ui.router'])
    .config(appStates)
    .constant('_', window._)
    .controller('TestController', TestController);

  function appStates($stateProvider) {
    $stateProvider
      .state('wizardStep1', {
        url: '',
        views: {
          'primaryView': {
            templateUrl: '/step1.html',
            controller: 'TestController as test'
          }
        }
      })
      .state('physicianDetail', {
        url: '/physicians/:physicianId',
        views: {
          'primaryView': {
            templateUrl: '/physician-detail.html',
            controller: 'ManagePhysiciansController as managePhysicians'
          }
        }
      })
  }

  function TestController() {
    var vm = this;

    vm.steps = [
      {
        name: 'Define List Details',
        id: 'step1',
        active: false,
        complete: true,
        disabled: false,
        steps: []
      },
      {
        name: 'Define Locations',
        id: 'step2',
        active: false,
        complete: true,
        disabled: false
      },
      {
        name: 'Manage Lists',
        id: 'step3',
        active: true,
        complete: false,
        disabled: false,
        steps: [
          {
            name: 'Past Lists',
            id: 'step1a',
            active: true,
            complete: true,
            disabled: false
          },
          {
            name: 'Seed Lists',
            id: 'step1b',
            active: false,
            complete: true,
            disabled: false
          }
        ]
      },
      {
        name: 'Refine Criteria',
        id: 'step4',
        active: false,
        complete: false,
        disabled: true
      },
      {
        name: 'Manage Segments',
        id: 'step5',
        active: false,
        complete: false,
        disabled: true
      },
      {
        name: 'Targeting',
        id: 'step6',
        active: false,
        complete: false,
        disabled: true
      },
      {
        name: 'Summary',
        id: 'step7',
        active: false,
        complete: false,
        disabled: true
      }
    ];

    vm.callbacks = {
      nextClick: nextClick,
      goToStep: goToStep
    };

    function nextClick(wizardId, wizardState) {
      console.log('boomddddd');
    }

    function goToStep(wizardStep) {
      console.log(wizardStep);
    }

  }

})();