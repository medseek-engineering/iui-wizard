(function() {
  'use strict';

  angular
    .module('iui.wizard')
    .provider('wizardRouterHelper', wizardRouterHelperProvider);

  wizardRouterHelperProvider.$inject = ['$stateProvider', 'wizardSettings'];
  function wizardRouterHelperProvider($stateProvider, wizardSettings) {
    /* jshint validthis:true */
    this.$get = RouterHelper;

    RouterHelper.$inject = ['$state'];
    function RouterHelper($state) {

      const service = {
        configureStates: configureStates,
        mapStepsToStates: mapStepsToStates,
        doesStateExist: doesStateExist
      };

      return service;

      ///////////////

      function configureStates(states) {
        return mapStepsToStates(states).map(configureState);
      }

      function configureState(state) {
        // if state already exists, we dont want to re-add it
        if (doesStateExist(state.id)) {
          return;
        }
        return $stateProvider.state(state.id, Object.assign({}, state));
      }

      function doesStateExist(stateName) {
        return !!_.where($state.get(), {name: stateName }).length;
      }

      function mapStepsToStates(steps) {
        return steps.map(mapStepURL)
          .map(mapStepName)
          .map(mapStepId)
          .map(mapStepButtons);
      }

      function mapStepId(oStep){
        let step = Object.assign({}, oStep);
        step.id = getStateName(step.id, step.parent);
        return step;
      }

      function mapStepButtons(oStep) {
        let step = Object.assign({}, oStep);

        let buttons = {
          next: {},
          previous: {},
          save: {},
          cancel: {}
        };

        step.buttons = Object.assign({}, buttons, step.buttons);
        return step;
      }

      function mapStepName(oStep) {
        let step = Object.assign({}, oStep);
        step.stepName = step.stepName || step.name;
        return step;
      }

      function mapStepURL(oStep) {
        let step = Object.assign({}, oStep);
        if (!step.url) {
          step.url = '/' + step.id;
        }
        return step;
      }


      function getStateName(stepId, parentStepId) {
        if (!parentStepId) {
          return stepId;
        }
        return parentStepId + '.' + stepId;
      }
    }
  }

})();