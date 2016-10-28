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
      getStates: getStates
    };

    return service;

    ///////////////

    function configureStates(states, otherwisePath) {
      return states
        .map(function(state) {
          // if state already exists, we dont want to re-add it
          if (doesStateExist(state.state)) {
            return;
          }
          return $stateProvider.state(state.state, state.config);
        });
    }

    function doesStateExist(stateName) {
      return !!_.where(getStates(), {name: stateName }).length;
    }

    function getStates() { return $state.get(); }
  }
}