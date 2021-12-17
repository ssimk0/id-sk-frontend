import { nodeListForEach } from "./common";
import { initCore } from "./core";
import { initExtended as initExtendedGovuk } from "../govuk/extended";
import Feedback from "./components/feedback/feedback";
import Crossroad from "./components/crossroad/crossroad";
import InPageNavigation from './components/in-page-navigation/in-page-navigation';
import SearchComponent from './components/search-component/search-component';
import TableFilter from './components/table-filter/table-filter';
import Stepper from './components/stepper/stepper';
import SubscriptionForm from './components/subscription-form/subscription-form';
import RegistrationForEvent from './components/registration-for-event/registration-for-event';
import InteractiveMap from './components/interactive-map/interactive-map';
import Accordion from './components/accordion/accordion';
import Tabs from './components/tabs/tabs';
import Table from './components/table/table';

function initExtended(options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== "undefined" ? options : {};

  // Allow the user to initialise ID-SK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  var $feedback = scope.querySelectorAll(
    '[data-module="idsk-feedback"]'
  );
  nodeListForEach($feedback, function ($feedback) {
    new Feedback($feedback).init();
  });

  var $crossroad = scope.querySelectorAll('[data-module="idsk-crossroad"]');
  nodeListForEach($crossroad, function ($crossroad) {
    new Crossroad($crossroad).init();
  });

  var $inPageNavigation = scope.querySelector('[data-module="idsk-in-page-navigation"]');
  new InPageNavigation($inPageNavigation).init();

  var $searchComponents = scope.querySelectorAll('[data-module="idsk-search-component"]');
  nodeListForEach($searchComponents, function ($searchComponent) {
    new SearchComponent($searchComponent).init();
  })

  var $steppers = scope.querySelectorAll('[data-module="idsk-stepper"]');
  nodeListForEach($steppers, function ($stepper) {
    new Stepper($stepper).init();
  });

  var $registrationForEvents = scope.querySelectorAll('[data-module="idsk-registration-for-event"]');
  nodeListForEach($registrationForEvents, function ($registrationForEvent) {
    new RegistrationForEvent($registrationForEvent).init();
  })

  var $interactiveMaps = scope.querySelectorAll('[data-module="idsk-interactive-map"]');
  nodeListForEach($interactiveMaps, function ($interactiveMap) {
    new InteractiveMap($interactiveMap).init();
  })

  var $accordions = scope.querySelectorAll('[data-module="idsk-accordion"]');
  nodeListForEach($accordions, function ($accordion){
    new Accordion($accordion).init();
  })

  var $tabs = scope.querySelectorAll('[data-module="idsk-tabs"]');
  nodeListForEach($tabs, function ($tab){
    new Tabs($tab).init();
  })

  var $tables = scope.querySelectorAll('[data-module="idsk-table"]');
  nodeListForEach($tables, function ($table){
    new Table($table).init();
  })
    
  var $tableFilter = scope.querySelectorAll('[data-module="idsk-table-filter"]');
  nodeListForEach($tableFilter, function ($tableFilter) {
    new TableFilter($tableFilter).init();
  })

  var $subscriptionForms = scope.querySelectorAll('[data-module="idsk-subscription-form"]');
  nodeListForEach($subscriptionForms, function ($subscriptionForm) {
    new SubscriptionForm($subscriptionForm).init();
  })

  initCore(options);

  // Init all GOVUK components js
  initExtendedGovuk(options);
}


export {
  initExtended,
  Crossroad,
  Feedback,
  InPageNavigation,
  SearchComponent,
  RegistrationForEvent,
  InteractiveMap,
  Stepper,
  SubscriptionForm,
  Accordion,
  Tabs,
  Table,
  TableFilter
}
