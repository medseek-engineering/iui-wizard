(function() {
  'use strict';


  var signupSteps = [
    {
      name: 'Welcome',
      id: 'terms',
      buttons: {
        cancel: {
          visible: false,
        },
        next: {
          name: 'I Accept',
          disabled: true
        },
        previous: {
          name: 'Cancel'
        },
      },
      template: `
        <form class="form-wrapper with-2-columns">
          <p class="lead">A wizard will guide you through the sign up process step by step. It will take a few minutes to complete. We strive to make the process as easy as possible, but connecting to you (or another person's) patient record takes some time. We pride ourselves on security verification and getting your information correct. Don't worry! Our sign up process will guide you through each step.</p>
          <div class="checkbox">
            <label>
              <input ng-change="wizard.state.buttons.next.disabled = !wizardData.overEighteen" ng-model="wizardData.overEighteen" type="checkbox"> I am over the age of 18.
            </label>
          </div>
          <h2 class="page-subheader">Terms &amp; Conditions</h2>
          <p>abc Health operates this website (“Site”) for your convenience to provide information about the services and resources abc Health offers, and to help you be a partner in your healthcare. By accessing and using this Site, you agree to all of the terms and conditions stated here, as well as any additional terms and conditions that might be applicable to a specific area of this Site</p>
          
        </form>
      `
    },
    {
      name: 'User Information',
      id: 'user-information',
      template: `
        <form class="form-wrapper form-horizontal">
          <p class="lead">Please enter information for this account</p>
          <div class="form-group">
            <label for="signup_email" class="control-label col-md-6 required-field text-left">Email</label>
            <div class="col-md-6">
              <input class="form-control" type="email" ng-model="wizardData.email" id="signup_email" />
            </div>
          </div>
          <div class="form-group">
            <label for="signup_confirmEmail" class="control-label col-md-6 required-field text-left">Confirm Email</label>
            <div class="col-md-6">
              <input class="form-control" type="email" ng-model="wizardData.confirmEmail" id="signup_confirmEmail" />
            </div>
          </div>
          <hr>
          <div class="form-group">
            <label for="signup_username" class="control-label col-md-6 required-field text-left">Username</label>
            <div class="col-md-6">
              <input class="form-control" type="text" ng-model="wizardData.username" id="signup_username" />
            </div>
          </div>
          <hr>
          <div class="form-group">
            <label for="signup_password" class="control-label col-md-6 required-field text-left">Password</label>
            <div class="col-md-6">
              <input class="form-control" type="password" ng-model="wizardData.password" id="signup_password" />
            </div>
          </div>
          <div class="form-group">
            <label for="signup_confirmPassword" class="control-label col-md-6 required-field text-left">Confirm Password</label>
            <div class="col-md-6">
              <input class="form-control" type="password" ng-model="wizardData.confirmPassword" id="signup_confirmPassword" />
            </div>
          </div>
        </form>
      `
    },
    {
      name: 'Connect Patient',
      id: 'connect-patient',
      buttons: {
        next: {
          name: 'Complete',
          disabled: false
        }
      },
      template: `
        <form>
          <p class="lead">Please enter the information of the patient you are connecting to</p>
          <div ng-if="!wizardData.hasPin">
            <div class="form-inline">
              <div class="form-group">
                <label for="signup_pin" class="control-label">What is the PIN associated with the patient's record?</label><br>
                <input id="signup_pin" class="form-control" ng-model="wizardData.pin">
              </div>
            </div>
            <hr>
          </div>
          
          <div class="form-wrapper form-horizontal">

            <div class="form-group">
              <label for="signup_patient_firstName" class="control-label col-md-6 required-field text-left">First Name</label>
              <div class="col-md-6">
                <input class="form-control" type="text" ng-model="wizardData.patientFirstName" id="signup_patient_firstName" />
              </div>
            </div>

            <div class="form-group">
              <label for="signup_patient_lastName" class="control-label col-md-6 required-field text-left">Last Name</label>
              <div class="col-md-6">
                <input class="form-control" type="text" ng-model="wizardData.patientLastName" id="signup_patient_lastName" />
              </div>
            </div>
          
            <div class="form-group">
              <label for="signup_patient_dateOfBirth" class="control-label col-md-6 required-field text-left">Date of Birth</label>
              <div class="col-md-6">
                <input class="form-control" type="date" ng-model="wizardData.patientDateOfBirth" id="signup_patient_dateOfBirth" />
              </div>
            </div>

          </div>
          
          
        </form>
      `
    }
  ];

  angular
    .module('app', ['ui.bootstrap', 'iui.wizard', 'ui.router'])
    .config(configure)
    .run(runBlock)
    .constant('_', window._)
    .constant('signupSteps', signupSteps)
    .value('wizardSteps', {
      signup: []
    })
    .controller('TestController', TestController)
    .controller('WizardStep1Controller', WizardStep1Controller);


  configure.$inject = ['$stateProvider', '$urlRouterProvider'];
  function configure($stateProvider, $urlRouterProvider) {
    
    $stateProvider
      .state('home', {
        url: '/',
        template: `<div class="container">
                     <a class="btn btn-default" ui-sref="signup({hasPin: true, pin: 'fooo1', email: 'foo@foo.com', confirmEmail: 'foo@foo.com', username: 'foo@foo.com'})">Signup with Pin</a>
                     <a class="btn btn-default" ui-sref="signup">Signup without Pin</a>
                  </div>`
      })
      .state('signup', {
        url: '/signup',
        params: {
          hasPin: false,
          pin: null,
          email: null,
          confirmEmail: null,
          username: null
        },
        controller: ['$state','$stateParams', 'wizardSteps', function($state, $stateParams, wizardSteps) {
          

          var vm = this;

          vm.data = angular.copy($stateParams);
          vm.steps = wizardSteps.signup;

          vm.callbacks = {
            cancel: function() {
              return $state.go('home');
            },
            complete: function() {
              return $state.go('home');
            }
          };

        }],
        controllerAs: 'signupController',
        template: `
          <the-wizard
           wizard-data="signupController.data"
           wizard-name="Signup"
           wizard-steps="signupController.steps"
           wizard-callbacks="signupController.callbacks"></the-wizard>`
      });
  }

  runBlock.$inject = ['$rootScope', '$state', 'wizardRouterHelper', 'signupSteps', 'wizardSteps']
  function runBlock($rootScope, $state, wizardRouterHelper, signupSteps, wizardSteps) {
    //$state.go('home');

    wizardSteps.signup = wizardRouterHelper.mapStepsToStates(signupSteps, 'signup');

    wizardRouterHelper.configureStates(wizardSteps.signup);

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });

  }

  TestController.$inject = ['$state', '$timeout', 'wizardSteps'];
  function TestController($state, $timeout, wizardSteps) {
    
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