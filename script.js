(function() {
  'use strict';

  angular
    .module('app', ['ui.bootstrap', 'iui.wizard', 'ui.router'])
    .config(configure)
    .run(runBlock)
    .constant('_', window._)
    .factory('wizardState', wizardState)
    .factory('wizardStateManager', wizardStateManager)
    .controller('TestController', TestController)
    .controller('WizardStep1Controller', WizardStep1Controller);


  configure.$inject = ['$stateProvider', '$urlRouterProvider'];
  function configure($stateProvider, $urlRouterProvider) {
    
    $stateProvider
      .state('home', {
        url: '',
        template: '<the-wizard wizard-name="Build a List" wizard-steps="test.wizardState.current.steps"></the-wizard>'
      });
  }

  runBlock.$inject = ['$rootScope', '$state']
  function runBlock($rootScope, $state) {
    $state.go('home');

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

  wizardState.$inject = ['wizardStateManager', '$timeout'];
  function wizardState(wizardStateManager, $timeout) {
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
        parent: null,
        name: 'Define List Details',
        id: 'step1',
        template: '<h2>Define List Details</h2>',
        complete: true,
        onComplete: function(wizardState){
          return $timeout(function(){
            return true;
          }, 2000);
        },
        disabled: false,
        buttons: {
          next: {
            name: 'Next',
            visible: true,
            disabled: false
          },
          previous: {
            name: 'Previous',
            visible: true,
            disabled: true
          },
          save: {
            name: 'Save',
            visible: false,
            disabled: false
          },
          cancel: {
            name: 'Cancel',
            visible: true,
            disabled: false
          }
        }
      },
      {
        parent: null,
        name: 'Define Locations',
        id: 'step2',
        template: '<h2>Define Locations</h2>',
        hasChildren: false,
        complete: false,
        disabled: true,
        buttons: {
          next: {
            name: 'customized next button'
          }
        }
      },
      {
        parent: null,
        name: 'Manage Lists',
        template: '<div ui-view></div>',
        id: 'step3',
        hasChildren: true,
        complete: false,
        disabled: true,
        isOpen: false
      },
      {
        parent: 'step3',
        name: 'Past Lists',
        template: 'past lists',
        id: 'a',
        hasChildren: false,
        complete: true,
        disabled: true
      },
      {
        parent: 'step3',
        name: 'Seed Lists',
        template: 'seed lists',
        id: 'b',
        hasChildren: false,
        complete: true,
        disabled: true
      },
      {
        parent: null,
        name: 'Refine Criteria',
        template: 'Refine Criteria',
        id: 'step4',
        hasChildren: false,
        complete: false,
        disabled: true
      },
      {
        parent: null,
        name: 'Manage Segments',
        template: 'Manage Segments',
        id: 'step5',
        hasChildren: false,
        complete: false,
        disabled: true
      },
      {
        parent: null,
        name: 'Targeting',
        template: 'Targeting',
        id: 'step6',
        hasChildren: false,
        complete: false,
        disabled: true
      },
      {
        parent: null,
        name: 'Summary',
        template: 'Summary',
        id: 'step7',
        hasChildren: false,
        complete: false,
        disabled: true,
        buttons: {
          next: {
            name: 'Complete'
          }
        }
      }
    ];

    var current = {
      steps: steps,
      currentMajorStep: steps[0],
      currentStep: steps[0],
      buttons: steps[0].buttons,
      callbacks: callbacks,
      form: {
        name: ''
      }
    };

    return {
      current: current
    }
  }

  TestController.$inject = ['wizardStateManager', 'wizardState'];
  function TestController(wizardStateManager, wizardState) {
    var vm = this;

    vm.wizardState = wizardState;

    vm.callbacks = wizardStateManager;
  }

  WizardStep1Controller.$inject = ['wizardState', 'wizardStateManager', '$scope'];
  function WizardStep1Controller (wizardState, wizardStateManager, $scope) {

    var vm = this;
    vm.form = {};
    vm.wizardState = wizardState;
    vm.submit = wizardStateManager.nextClick;



    $scope.$watch(function() { return vm.form.$invalid; }, validityWatch);

    function validityWatch(newVal) {
      if (newVal === undefined) {
        return;
      }
      vm.wizardState.current.buttons.next.disabled = newVal;
    }
  }

})();