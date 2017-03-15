(function() {
  'use strict';
  angular
    .module('iui.wizard')
    .directive('iuiWizardFormWrapper', iuiWizardFormWrapper);

  function iuiWizardFormWrapper() {
    const directive = {
      restrict: 'E',
      template: `<form
                   name="wizardFormWrapper.formState"
                   ng-submit="submitCallback(wizardState)">
                   <div ng-transclude></div>
                   <button
                     ng-disabled="wizardState.buttons.next.disabled"
                     class="sr-only"
                     type="submit"
                     translate="{{submitLabel}}"></button>
                 </form>`,
      transclude: true,
      replace: true,
      controller: WizardFormWrapperController,
      controllerAs: 'wizardFormWrapper',
      scope: {
        wizardState: '=',
        submitCallback: '=',
        submitLabel: '@'
      }
    };
    return directive;
  }

  WizardFormWrapperController.$inject = ['$scope'];
  function WizardFormWrapperController($scope) {
    const vm = this;
    vm.formState = {};

    $scope.$watch(()=>vm.formState.$invalid, validityWatch);

    function validityWatch(newVal) {

      if (newVal === undefined) {
        return;
      }
      if (!$scope.wizardState.buttons.next) {
        return;
      }
      $scope.wizardState.buttons.next.disabled = newVal;
    }
  }
})();