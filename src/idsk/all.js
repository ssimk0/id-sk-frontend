import { nodeListForEach } from "./common";
import { initAll as initAllGOVUKjs } from "../govuk/all";
import Button from "./components/button/button";
import Feedback from "./components/feedback/feedback";
import FooterExtended from "./components/footer-extended/footer-extended";
import CharacterCount from "./components/character-count/character-count";
import Crossroad from "./components/crossroad/crossroad";
import CustomerSurveys from "./components/customer-surveys/customer-surveys";
import HeaderExtended from './components/header-extended/header-extended';
import InPageNavigation from './components/in-page-navigation/in-page-navigation';
import Stepper from './components/stepper/stepper';
import RegistrationForEvent from './components/registration-for-event/registration-for-event';

function initAll(options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== "undefined" ? options : {};

  // Allow the user to initialise ID-SK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  var $buttons = scope.querySelectorAll('[data-module="idsk-button"]')
  nodeListForEach($buttons, function ($button) {
    new Button($button).init()
  })

  var $feedback = scope.querySelectorAll(
    '[data-module="idsk-feedback"]'
  );
  nodeListForEach($feedback, function ($feedback) {
    new Feedback($feedback).init();
  });
  // Find first Footer-extended module to enhance.
  var $footerExtended = scope.querySelectorAll(
    '[data-module="idsk-footer-extended"]'
  );
  nodeListForEach($footerExtended, function ($footerExtended) {
    new FooterExtended($footerExtended).init();
  });

  var $characterCounts = scope.querySelectorAll(
    '[data-module="idsk-character-count"]'
  );
  nodeListForEach($characterCounts, function ($characterCount) {
    new CharacterCount($characterCount).init();
  });

  var $crossroad = scope.querySelectorAll('[data-module="idsk-crossroad"]');
  nodeListForEach($crossroad, function ($crossroad) {
    new Crossroad($crossroad).init();
  });

  var $customerSurveys = scope.querySelectorAll('[data-module="idsk-customer-surveys"]');
  nodeListForEach($customerSurveys, function ($customerSurveys) {
    new CustomerSurveys($customerSurveys).init();
  });

  // Find first Header-extended module to enhance.
  var $headersExtended = scope.querySelectorAll('[data-module="idsk-header-extended"]');
  nodeListForEach($headersExtended, function ($headerExtended) {
    new HeaderExtended($headerExtended).init();
  });

  var $inPageNavigation = scope.querySelector('[data-module="idsk-in-page-navigation"]');
  new InPageNavigation($inPageNavigation).init();

  var $steppers = scope.querySelectorAll('[data-module="idsk-stepper"]');
  nodeListForEach($steppers, function ($stepper) {
    new Stepper($stepper).init();
  });

  var $registrationForEvents = scope.querySelectorAll('[data-module="idsk-registration-for-event"]');
  nodeListForEach($registrationForEvents, function ($registrationForEvent) {
    new RegistrationForEvent($registrationForEvent).init();
  })

  // Init all GOVUK components js
  initAllGOVUKjs(options);
}

export {
  initAll,
  Button,
  CharacterCount,
  Crossroad,
  CustomerSurveys,
  Feedback,
  FooterExtended,
  HeaderExtended,
  InPageNavigation,
  Stepper,
  RegistrationForEvent 
}