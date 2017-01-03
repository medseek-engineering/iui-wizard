(function() {
  'use strict';

  angular
    .module('app', ['iui.wizard', 'ui.bootstrap', 'pascalprecht.translate']);

  angular.module('app')
    .constant('_', window._);

  angular.module('app')
    .constant('preferredLanguage', 'en');

  angular.module('app')
    .constant('signupModuleSettings', { minimumAccountHolderAge: 18 })

  const supportedLanguages = [
    {
      key: 'en',
      value: 'English'
    },
    {
      key: 'es',
      value: 'Español'
    }
  ];
  angular.module('app')
    .constant('supportedLanguages', supportedLanguages);

  angular.module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider', 'preferredLanguage', 'wizardSettings'];
  function config($stateProvider, $urlRouterProvider, $translateProvider, preferredLanguage, wizardSettings) {

    wizardSettings.text.step = 'STEP';
    wizardSettings.text.of = 'OF';
    wizardSettings.text.options = 'OPTIONS';
    wizardSettings.buttons.next.name = 'NEXT';
    wizardSettings.buttons.previous.name = 'PREVIOUS';
    wizardSettings.buttons.save.name = 'SAVE';
    wizardSettings.buttons.cancel.name = 'CANCEL';


    $stateProvider
      .state('default', {
        url: '',
        redirectTo: 'home'
      })
      .state('home', {
        url: '/',
        template: `<home></home>`
      })
      .state('signup', {
        url: '/signup',
        params: {
          alternateFlow: false,
          hasPin: false,
          pin: null,
          email: null,
          confirmEmail: null,
          username: null,
          overEighteen: false,
          password: null,
          confirmPassword: null,
          patientFirstName: null,
          patientLastName: null,
          patientDateOfBirth: null
        },
        template: `<signup-wizard></signup-wizard>`
      });

    $urlRouterProvider.otherwise('/');

    $translateProvider.useLoader('asyncLoader').preferredLanguage(preferredLanguage);
  }




  const wizardSteps = {
    signup: [
      {
        stepName: 'WELCOME',
        id: 'signup.terms',
        url: '/terms',
        buttons: {
          cancel: {
            visible: false,
          },
          next: {
            name: 'I_ACCEPT'
          },
          previous: {
            name: 'CANCEL'
          },
        },
        template: '<signup-terms wizard-data="wizardData"></signup-terms>'
      },
      {
        stepName: 'USER_INFORMATION',
        url: '/user-information',
        id: 'signup.userInformation',
        template: '<signup-user-information wizard-data="wizardData"></signup-user-information>'
      },
      {
        stepName: 'CONNECT_PATIENT',
        url: '/connect-patient',
        id: 'signup.connectPatient',
        buttons: {
          next: {
            name: 'COMPLETE'
          }
        },
        template: '<signup-connect-patient wizard-data="wizardData"></signup-connect-patient>'
      },
      {
        stepName: 'CREATE_ACCOUNT',
        url: '/create-account',
        id: 'signup.createAccount',
        buttons: {
          next: {
            name: 'COMPLETE'
          }
        },
        template: `
          <signup-user-information wizard-data="wizardData"></signup-user-information>
          <hr>
          <signup-connect-patient wizard-data="wizardData"></signup-connect-patient>
        `
      }
    ]
  };

  angular.module('app')
    .constant('wizardSteps', wizardSteps);


  angular.module('app')
    .run(runBlock);

  runBlock.$inject = [
    '$rootScope',
    '$state',
    'wizardRouterHelper'
  ];

  function runBlock($rootScope, $state, wizardRouterHelper) {

    wizardRouterHelper.configureStates(wizardSteps.signup);

    $rootScope.$on('$stateChangeStart', onStateChangeStart);

    function onStateChangeStart(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    }

  }




  angular.module('app')
    .directive('home', home);

  function home() {
    return {
      restrict: 'E',
      scope: {},
      template: `
        <div class="container">
          <h1 class="page-header">Signup Flows</h1>
          <h2 class="page-subheader">Signup in 3 steps</h2>
          <a class="btn btn-default" ui-sref="signup({hasPin: true, pin: 'fooo1', email: 'foo@foo.com', confirmEmail: 'foo@foo.com', username: 'foo@foo.com'})">Signup with Pin</a>
          <a class="btn btn-default" ui-sref="signup">Signup without Pin</a>

          <h2 class="page-subheader">Signup in 2 steps</h2>
          <a class="btn btn-default" ui-sref="signup({alternateFlow: true, hasPin: true, pin: 'fooo1', email: 'foo@foo.com', confirmEmail: 'foo@foo.com', username: 'foo@foo.com'})">Signup with Pin</a>
          <a class="btn btn-default" ui-sref="signup({alternateFlow: true})">Signup without Pin</a>
        </div>
      `
    }
  }




  angular.module('app')
    .directive('signupWizard', signupWizard);

  function signupWizard() {
    return {
      restrict: 'E',
      scope: {},
      controller: SignupWizardController,
      controllerAs: 'signupController',
      template: `
        <iui-workflow-wizard
          wizard-data="signupController.data"
          wizard-name="{{'SIGNUP_FOR_EMPOWER' | translate}}"
          wizard-workflow="signupController.workflow"
          wizard-callbacks="signupController.callbacks"></iui-workflow-wizard>
        <footer iui-footer class="page-footer clearfix hidden-xs"></footer>
        <div class="culture-switcher visible-xs-block">
          <iui-culture-switcher></iui-culture-switcher>
        </div>
      `
    }
  }

  SignupWizardController.$inject = [
    '$state',
    '$stateParams',
    'wizardRouterHelper',
    'wizardSteps'
  ];

  function SignupWizardController(
    $state,
    $stateParams,
    wizardRouterHelper,
    wizardSteps) {

  
    let vm = this;

    vm.data = angular.copy($stateParams);

    const addlSteps = ($stateParams.alternateFlow) ? ['signup.createAccount']
                                                 : ['signup.userInformation',
                                                    'signup.connectPatient']
    vm.workflow = [
      'signup.terms'
    ].concat(addlSteps);

    vm.callbacks = {
      cancel: ()=>$state.go('home'),
      complete: ()=>$state.go('home')
    };

  }




  angular.module('app')
    .directive('signupTerms', signupTerms);

  function signupTerms() {
    return {
      restrict: 'E',
      scope: {
        wizardData: '='
      },
      controller: SignupTermsController,
      controllerAs: 'signupTerms',
      template: `
        <div class="form-wrapper with-2-columns">
          <p class="lead" translate="Enrollment_EnrollmentWelcomeMessage">
          </p>
          <div class="checkbox">
            <label>
              <input
                type="checkbox"
                ng-model="wizardData.overEighteen"
                ng-required="true">
              <span translate="I_AM_OVER_THE_AGE_OF" translate-values="{age: signupTerms.moduleSettings.minimumAccountHolderAge}"></span>
            </label>
          </div>
          <h2 class="page-subheader" translate="TERMS_AND_CONDITIONS_MENU"></h2>
          <div class="scrolling" translate="Enrollment_TermsAndConditions">
            
          </div>
        </div>
      `
    }
  }

  SignupTermsController.$inject = ['signupModuleSettings'];

  function SignupTermsController(signupModuleSettings) {
    let vm = this;
    vm.moduleSettings = signupModuleSettings;
  }





  angular.module('app')
    .directive('signupUserInformation', signupUserInformation);

  function signupUserInformation() {
    return {
      restrict: 'E',
      scope: {
        wizardData: '='
      },
      template: `
        <div class="form-wrapper form-horizontal">
          <p class="lead">Please enter information for this account</p>
          <div class="form-group">
            <label
              for="signup_email"
              class="control-label col-md-6 required-field text-left">Your email address</label>
            <div class="col-md-6">
              <input
                class="form-control"
                ng-required="true"
                type="email"
                ng-model="wizardData.email" id="signup_email">
            </div>
          </div>
          <div class="form-group">
            <label
              for="signup_confirmEmail"
              class="control-label col-md-6 required-field text-left">Confirm your email address</label>
            <div class="col-md-6">
              <input
                class="form-control"
                ng-required="true"
                type="email"
                ng-model="wizardData.confirmEmail" id="signup_confirmEmail">
            </div>
          </div>
          <hr>
          <div class="form-group">
            <label
              for="signup_username"
              class="control-label col-md-6 required-field text-left">Choose your username</label>
            <div class="col-md-6">
              <input
                class="form-control"
                ng-required="true"
                type="text"
                ng-model="wizardData.username" id="signup_username">
            </div>
          </div>
          <hr>
          <div class="form-group">
            <label
            for="signup_password"
            class="control-label col-md-6 required-field text-left">Create a password</label>
            <div class="col-md-6">
              <input
                class="form-control"
                ng-required="true"
                type="password"
                ng-model="wizardData.password" id="signup_password">
            </div>
          </div>
          <div class="form-group">
            <label
              for="signup_confirmPassword"
              class="control-label col-md-6 required-field text-left">Confirm your password</label>
            <div class="col-md-6">
              <input
                class="form-control"
                ng-required="true"
                type="password"
                ng-model="wizardData.confirmPassword" id="signup_confirmPassword">
            </div>
          </div>
        </div>
      `
    }
  }




  angular.module('app')
    .directive('signupConnectPatient', signupConnectPatient);

  function signupConnectPatient() {
    return {
      restrict: 'E',
      scope: {
        wizardData: '='
      },
      template: `
        <p class="lead">
          Please enter the information of the patient you are connecting to
        </p>
        <div class="form-inline" ng-if="!wizardData.hasPin">
          <div class="form-group">
            <label
              for="signup_patient_pin"
              class="control-label">What is the PIN associated with the patient's record?</label><br>
            <input
              id="signup_patient_pin"
              class="form-control"
              ng-model="wizardData.pin"
              ng-required="true">
          </div>
        </div>
        
        <div class="form-wrapper form-horizontal">
          <hr ng-if="!wizardData.hasPin">
          <div class="form-group">
            <label
              for="signup_patient_firstName"
              class="control-label col-md-6 required-field text-left">Patient's first name</label>
            <div class="col-md-6">
              <input
                id="signup_patient_firstName"
                type="text"
                class="form-control"
                ng-model="wizardData.patientFirstName"
                ng-required="true">
            </div>
          </div>

          <div class="form-group">
            <label
              for="signup_patient_lastName"
              class="control-label col-md-6 required-field text-left">Patient's last name</label>
            <div class="col-md-6">
              <input
                id="signup_patient_lastName"
                type="text"
                class="form-control"
                ng-model="wizardData.patientLastName"
                ng-required="true">
            </div>
          </div>
        
          <div class="form-group">
            <label
              for="signup_patient_dateOfBirth"
              class="control-label col-md-6 required-field text-left">Patient's birthdate</label>
            <div class="col-md-6">
              <input
                id="signup_patient_dateOfBirth"
                type="date"
                class="form-control"
                ng-model="wizardData.patientDateOfBirth"
                ng-required="true">
            </div>
          </div>
        </div>
      `
    }
  }

  const langTranslations = {
    en: {
      WELCOME: 'Welcome',
      USER_INFORMATION: 'User Information',
      I_ACCEPT: 'I Accept',
      CANCEL: 'Cancel',
      NEXT: 'Next',
      PREVIOUS: 'Previous',
      SAVE: 'Save',
      COMPLETE: 'Complete',
      CONNECT_PATIENT: 'Connect Patient',
      CREATE_ACCOUNT: 'Create Account',
      OF: 'of',
      STEP: 'Step',
      SIGNUP_FOR_EMPOWER: 'Signup for EMPOWER',
      Enrollment_EnrollmentWelcomeMessage: `
        A wizard will guide you through the sign up process step by step.
        It will take a few minutes to complete. We strive to make the process
        as easy as possible, but connecting to you (or another person's)
        patient record takes some time. We pride ourselves on security
        verification and getting your information correct. Don't worry!
        Our sign up process will guide you through each step.
      `,
      I_AM_OVER_THE_AGE_OF: 'I am over the age of {{age}}.',
      TERMS_AND_CONDITIONS_MENU: 'Terms &amp; Conditions',
      Enrollment_TermsAndConditions: `
        <p><span>The Patient Portal offers the patients of Freeman Health System (“Freeman”) secure electronic access to portions of their hospital medical record.<span>&nbsp;
        </span>This can be a valuable communications tool, however, certain precautions should be used to minimize disclosure risks.<span>&nbsp;
        </span>In order to manage these risks, we have imposed some terms and conditions for participation.<span>&nbsp;
        </span>By selecting “Accept” at the end of this Agreement, you will demonstrate that you have been informed of these risks and agree to these terms.</span></p>
        <p><span>We understand the importance of privacy with regard to your healthcare so we make every effort to protect the privacy of your medical information.<span>&nbsp;
        </span>Our use and disclosure of medical information is described in our Notice of Privacy Practices and can be found on our website www.freemanhealth.com.<span>&nbsp;
        </span>Access to this secure web portal is an optional service and we may suspend or terminate it at any time for any reason.<span>&nbsp;
        </span>If we do, we will notify you as promptly as possible.<span>&nbsp; </span>You agree not to hold Freeman or any of its staff or physicians liable for network or security breaches beyond our control.<span>&nbsp;
        </span>By accepting this Agreement, you acknowledge that you understand and agree to comply with the terms and that all of your questions have been answered to your satisfaction.<span>&nbsp;
        </span>If you do not understand or do not agree to comply, please choose “Decline” at the end of this Agreement.<span>&nbsp;
        </span>If you have any questions, we will gladly provide more information. </span>
        </p>
        <p><span>Freeman provides this site for the exclusive use of its established patients. All users must have an established relationship with a Freeman provider.<span>&nbsp;
        </span>We strive to keep all of the information in your records correct and complete.<span>&nbsp;
        </span>If you identify any discrepancy in your record, you agree to notify us immediately.<span>&nbsp;
        </span>Additionally, by using the Patient Portal, you agree to provide factual and correct information.
        </span></p>
        <p><span>The information on the Patient Portal is maintained by Freeman at its current physical facility.<span>&nbsp;
        </span>For questions about this site, contact Freeman via email at medicalrecordspatientportal@freemanheatlh.com.</span></p>
        <p><span>The Patient Portal does provide the following services:
        </span></p>
        <p><span>* <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Communication of laboratory results to patient including HIV, STD, Genetic testing and other sensitive test results</span></p>
        <p><span>* <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Review of patient medication lists and visitation dates
        </span></p>
        <p><span>* <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Ability to view scheduled appointments
        </span></p>
        <p><span>The Patient Portal is not intended to provide internet-based diagnostic medical services. The information posted by Freeman on the Patient Portal should not be considered complete, nor should it be relied on to suggest a
         course of treatment for a particular individual. You should always seek the advice of your physician with any questions you may have regarding a medical condition and you should never disregard medical advice or delay in seeking it because of something you
         may have read on the Patient Portal.<span>&nbsp;&nbsp;&nbsp; </span>Additionally, the following limitations apply:
        </span></p>
        <p><span>* <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>No internet-based triage or treatment requests can be accepted.<span>&nbsp;
        </span>Diagnosis may only be made and treatment rendered after the patient schedules and sees the physician.
        </span></p>
        <p><span>*<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>No emergent communications or services are offered.<span>&nbsp;
        </span>Any emergent conditions should be seen by Urgent Care, the Emergency Department or calling 911.
        </span></p>
        <p><span>While some facilities charge for this convenience on an annual basis, Freeman is focused on providing the highest level of service and health care so the Patient Portal is provided as a courtesy to Freeman patients.<span>&nbsp;
        </span>However, if abuse or negligent usage of the Patient Portal becomes a problem, then we reserve the right, at our own discretion, to terminate the Patient Portal offering, suspend user access or modify services offered through the Patient Portal.<span>&nbsp;
        </span></span></p>
        <p><span>Please read the Freeman Notice of Privacy Practices for information on how Protected Health Information (PHI) is used at Freeman. It can be found at www.freemanhealth.com.<span>&nbsp;
        </span></span></p>
        <p><span>Patient Acknowledgement and Agreement.<span>&nbsp;
        </span>I acknowledge that I have read and fully understand this Agreement and I consent to the conditions outlined herein.<span>&nbsp;
        </span>I have been given the risks and benefits of the Patient Portal.<span>&nbsp; </span>
        I acknowledge that using the Patient Portal is entirely voluntary and should I decide against using the Patient Portal, it will not impact the quality of care I receive from Freeman.<span>&nbsp;
        </span>In addition, I agree to adhere to the policies set forth herein, as well as any other instructions or guidelines that my physician may impose for online communications.<span>&nbsp;
        </span>I have been given an opportunity to ask questions related to this Agreement and all of my questions have been fully answered.</span></p>
      `,
      COPYRIGHT_TEXT: `
        Copyright &copy; {{year}} Influence Health. All Rights Reserved.
      `
    },
    es: {
      WELCOME: 'Bienvenido',
      USER_INFORMATION: 'Informacion del Usuario',
      I_ACCEPT: 'Acepto',
      CANCEL: 'Cancelar',
      NEXT: 'Siguiente',
      PREVIOUS: 'Anterior',
      SAVE: 'Salvar',
      COMPLETE: 'Completar',
      CONNECT_PATIENT: 'Conectar al Paciente',
      CREATE_ACCOUNT: 'Crear una Cuenta',
      OF: 'de',
      STEP: 'Paso',
      SIGNUP_FOR_EMPOWER: 'Inscríbete en EMPOWER',
      Enrollment_EnrollmentWelcomeMessage: `
        Un asistente lo guiará paso a paso a través del proceso de registro. 
        Sólo le llevará unos minutos completarlo. Nos esforzamos para hacer 
        el proceso lo más fácil posible, pero la conexión al registro de su 
        paciente (o de otra persona) lleva algo de tiempo. Estamos orgullosos 
        de nuestra verificación de seguridad y por brindarle su información 
        de forma correcta. ¡No se preocupe! Nuestro proceso de registro lo 
        guiará a través de cada paso.
      `,
      I_AM_OVER_THE_AGE_OF: 'Tengo más de {{age}} años.',
      TERMS_AND_CONDITIONS_MENU: 'Términos y Condiciones',
      Enrollment_TermsAndConditions: `
        Freeman Health administra esta página web ("Sitio") para su conveniencia 
        y así brindarle información sobre los servicios y recursos que Freeman 
        Health le ofrece, y para ayudarle a ser un socio en su atención médica. 
        Al acceder y utilizar este sitio, usted acepta todos los términos y 
        condiciones que aquí se establecen, así como cualquier otro término y 
        condición adicional que pudiera aplicarse a un área específica de este Sitio
      `,
      COPYRIGHT_TEXT: `
        Derechos de autor &copy; {{year}} Influence Health. Todos los derechos reservados.
      `
    }
  }




  angular.module('app').constant('langTranslations', langTranslations);

  angular.module('app').factory('asyncLoader', asyncLoader);
  asyncLoader.$inject = ['$q' ,'$timeout', 'langTranslations', 'preferredLanguage'];
  function asyncLoader($q, $timeout, langTranslations, preferredLanguage) {
    return function (options) {
      var deferred = $q.defer(),
          translations;
   
      translations = (options.key) ? langTranslations[options.key] : langTranslations[preferredLanguage];
   
      deferred.resolve(translations);
   
      return deferred.promise;
    };
  }

  angular.module('app').directive('iuiCultureSwitcher', iuiCultureSwitcher);

  function iuiCultureSwitcher() {
    return {
      restrict: 'E',
      scope: {},
      template: `
        <ul class="iui-culture-switcher list-inline">
          <li
            ng-repeat="culture in cultureSwitcher.supportedCultures | orderBy:[cultureSwitcher.orderByCurrentCulture, 'value']"
            ng-class="{'active': cultureSwitcher.currentCulture.key===culture.key}">
            <a 
              ng-click="cultureSwitcher.switchCulture(culture)"
              href="" 
              hreflang="{{culture.key | lowercase}}"
              lang="{{culture.key | lowercase}}">{{culture.value}}</a>
          </li>
        </ul>
      `,
      controller: CultureSwitcherController
    };
  }

  CultureSwitcherController.$inject = ['$scope', '$translate', 'supportedLanguages', 'preferredLanguage'];

  function CultureSwitcherController($scope, $translate, supportedLanguages, preferredLanguage) {
    $scope.cultureSwitcher = {
      supportedCultures: supportedLanguages,
      currentCulture: _.findWhere(supportedLanguages, {key: preferredLanguage}),

      // Used by the Angular orderBy filter to start with the active culture first
      orderByCurrentCulture: function(culture) {
       return !(culture.key === $scope.cultureSwitcher.currentCulture.key);
      },

      // Method to switch the culture
      switchCulture: function (selectedCulture) {
        if ($scope.cultureSwitcher.currentCulture.key !== selectedCulture.key) {
          $scope.cultureSwitcher.currentCulture = selectedCulture;
          $translate.use(selectedCulture.key);
        }
      }
    };
  }


  angular.module('app')
    .directive('iuiFooter', iuiFooter);

  function iuiFooter() {
    return {
      restrict: 'EA',
      scope: {},
      replace: true,
      link: function (scope) {
        let d = new Date();
        scope.currentYear = d.getFullYear();
      },
      template: `
        <footer id="masterLayout_contentinfo_footer" role="contentinfo">
          <div class="footer-logo">
          </div>
          <div class="culture-switcher">
            <iui-culture-switcher></iui-culture-switcher>
          </div>
          <p class="copyright" translate="COPYRIGHT_TEXT" translate-values="{year: currentYear}"></p>
        </footer>
      `
    }
  }




})();