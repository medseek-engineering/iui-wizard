(function() {
  'use strict';

  angular
    .module('app', ['ui.bootstrap', 'iui.wizard', 'ui.router'])
    .config(configure)
    .run(runBlock)
    .constant('_', window._)
    .factory('wizardStateManager', wizardStateManager)
    .controller('TestController', TestController);


  configure.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configure($stateProvider, $urlRouterProvider) {
    
    $stateProvider
      .state('home', {
        url: '/',
        template: '<a class="btn btn-default" ui-sref="wizard">Start Wizard</a>'
      })
      .state('wizard', {
        url: '/wizard',
        templateUrl: '/wizard.html',
        controller: 'TestController as test',
        redirectTo: 'wizard.step1'
      })
      .state('wizard.step1', {
        url: '/step1',
        templateUrl: '/step1.html',
        controller: 'TestController as test'
      })
      .state('wizard.step2', {
        url: '/step2',
        templateUrl: '/step2.html',
        controller: 'TestController as test'
      })
      .state('wizard.step3', {
        url: '/step3',
        template: '<div ui-view></div>',
        redirectTo: 'wizard.step3.a'
      })
      .state('wizard.step3.a', {
        url: '/a',
        templateUrl: '/step3-a.html',
        controller: 'TestController as test'
      })
      .state('wizard.step3.b', {
        url: '/b',
        templateUrl: '/step3-b.html',
        controller: 'TestController as test'
      })
      .state('wizard.step4', {
        url: '/step4',
        templateUrl: '/step4.html',
        controller: 'TestController as test'
      })
      .state('wizard.step5', {
        url: '/step5',
        templateUrl: '/step5.html',
        controller: 'TestController as test'
      })
      .state('wizard.step6', {
        url: '/step6',
        templateUrl: '/step6.html',
        controller: 'TestController as test'
      })
      .state('wizard.step7', {
        url: '/step7',
        templateUrl: '/step7.html',
        controller: 'TestController as test'
      });
  }

  runBlock.$inject = ['$rootScope', '$state']

  function runBlock($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });

  }

  wizardStateManager.$inject = ['$state'];

  function wizardStateManager($state) {

    var factory = {
      goToStep: goToStep,
      nextClick: nextClick,
      previousClick: previousClick,
      cancelClick: cancelClick,
      saveClick: saveClick
    };
    return factory;

    function getActive(steps) {
      return _.findWhere(steps, {active: true});
    }

    function getNextItem(array, value) {
      var nextItem;
      var index = array.indexOf(value);
      if(index >= 0 && index < array.length - 1) {
        nextItem = array[index + 1];
      }
      return nextItem;
    }

    function getPreviousItem(array, value) {
      var previousItem;
      var index = array.indexOf(value);
      if(index > 0) {
        previousItem = array[index - 1];
      } else {
        previousItem = array[index];
      }
      return previousItem;
    }

    function nextClick(wizardState) {
      var nextItem = getNextItem(wizardState.steps.filter(filterParents), wizardState.currentStep);

      function filterParents(step) {
        return !_.where(wizardState.steps, {parent: step.id }).length;
      }

      if (!nextItem) {
        return $state.go('home');
      }

      return goToStep(wizardState, nextItem);
    }

    function previousClick(wizardState) {
      var previousItem = getPreviousItem(wizardState.steps.filter(filterParents), wizardState.currentStep);

      function filterParents(step) {
        return !_.where(wizardState.steps, {parent: step.id }).length;
      }

      return goToStep(wizardState, previousItem);
    }

    function saveClick() {
      return $state.go('home');
    }

    function cancelClick(wizardState) {
      return $state.go('home');
    }

    function goToStep(wizardState, step) {
      // reset
      wizardState.currentMajorStep.isOpen = false;
      wizardState.buttons = step.buttons || {};
      
      var parent;

      if (step.parent) {
        parent = _.findWhere(wizardState.steps, {id: step.parent});
        parent.disabled = false;
        parent.isOpen = true;
      }

      step.disabled = false;
      wizardState.currentMajorStep = parent || step;
      wizardState.currentStep = step;

      return $state.go(wizardState.currentStep.id);
    }
  }

  TestController.$inject = ['wizardStateManager'];

  function TestController(wizardStateManager) {
    var vm = this;

    var callbacks = {
      goToStep: wizardStateManager.goToStep,
      nextClick: wizardStateManager.nextClick,
      previousClick: wizardStateManager.previousClick,
      cancelClick: wizardStateManager.cancelClick,
      saveClick: wizardStateManager.saveClick
    };

    var steps = [
      {
        name: 'Define List Details',
        id: 'wizard.step1',
        stepNumber: 1,
        complete: true,
        disabled: false,
        buttons: {
          previous: {
            disabled: true
          }
        }
      },
      {
        name: 'Define Locations',
        id: 'wizard.step2',
        stepNumber: 2,
        complete: false,
        disabled: true,
        buttons: {
          next: {
            name: 'customized next button'
          }
        }
      },
      {
        name: 'Manage Lists',
        id: 'wizard.step3',
        stepNumber: 3,
        complete: false,
        disabled: true,
        isOpen: false
      },
      {
        parent: 'wizard.step3',
        name: 'Past Lists',
        id: 'wizard.step3.a',
        stepNumber: 3,
        complete: true,
        disabled: true
      },
      {
        parent: 'wizard.step3',
        name: 'Seed Lists',
        id: 'wizard.step3.b',
        stepNumber: 3,
        complete: true,
        disabled: true
      },
      {
        name: 'Refine Criteria',
        id: 'wizard.step4',
        stepNumber: 4,
        complete: false,
        disabled: true
      },
      {
        name: 'Manage Segments',
        id: 'wizard.step5',
        stepNumber: 5,
        complete: false,
        disabled: true
      },
      {
        name: 'Targeting',
        id: 'wizard.step6',
        stepNumber: 6,
        complete: false,
        disabled: true
      },
      {
        name: 'Summary',
        id: 'wizard.step7',
        stepNumber: 7,
        complete: false,
        disabled: true,
        buttons: {
          next: {
            name: 'Complete'
          }
        }
      }
    ];

    vm.wizardState = {
      steps: steps,
      currentMajorStep: steps[0],
      currentStep: steps[0],
      buttons: steps[0].buttons,
      callbacks: callbacks
    };

    vm.callbacks = wizardStateManager;



  }

})();