angular
  .module('iui.wizard')
  .provider('wizardRouterHelper', routerHelperProvider);

routerHelperProvider.$inject = ['$stateProvider'];
/* @ngInject */
function routerHelperProvider($stateProvider) {
  /* jshint validthis:true */
  this.$get = RouterHelper;

  RouterHelper.$inject = ['$state'];
  /* @ngInject */
  function RouterHelper($state) {

    var service = {
      configureStates: configureStates,
      getStates: getStates,
      mapStepsToStates: mapStepsToStates
    };

    return service;

    ///////////////

    function configureStates(states, otherwisePath) {
      return states
        .map(function(state) {
          // if state already exists, we dont want to re-add it
          
          if (doesStateExist(state.id)) {
            return;
          }
          return $stateProvider.state(state.id, _.extend({}, state));
        });
    }

    function doesStateExist(stateName) {
      return !!_.where(getStates(), {name: stateName }).length;
    }

    function getStates() { return $state.get(); }

    function mapStepsToStates(steps, stateCurrentName) {
      var stepNum = 0;
      return steps.map(function(originalStep, stepIndex) {
        var step = _.extend({}, originalStep);
        if (!step.url) {
          step.url = '/' + step.id;
        }
        if(step.parent) {
          step.parent = getChildStateName(stateCurrentName, step.parent);
          step.stepNumber = stepNum;
        } else {
          stepNum = stepNum + 1;
          step.stepNumber = stepNum;
        }
        step.id = getChildStateName(stateCurrentName, step.id, step.parent);

        return step;
      });
    }

    function getChildStateName(stateCurrentName, stepId, parentStepId) {
      if (!stateCurrentName) {
        return stepId;
      }
      if (!parentStepId) {
        return stateCurrentName + '.' + stepId;
      }
      return parentStepId + '.' + stepId;
    }
  }
}