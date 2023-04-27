import { version } from './common/govuk-frontend-version.mjs'
import { nodeListForEach } from './common/index.mjs'
import Accordion from './components/accordion/accordion.mjs'
import Button from './components/button/button.mjs'
import CharacterCount from './components/character-count/character-count.mjs'
import Checkboxes from './components/checkboxes/checkboxes.mjs'
import Details from './components/details/details.mjs'
import ErrorSummary from './components/error-summary/error-summary.mjs'
import Header from './components/header/header.mjs'
import IdskAccordion from './components/idsk-accordion/idsk-accordion.mjs'
import IdskButton from './components/idsk-button/idsk-button.mjs'
import IdskCrossroad from './components/idsk-crossroad/idsk-crossroad.mjs'
import IdskCustomerSurveys from './components/idsk-customer-surveys/idsk-customer-surveys.mjs'
import IdskFeedback from './components/idsk-feedback/idsk-feedback.mjs'
import IdskFooterExtended from './components/idsk-footer-extended/idsk-footer-extended.mjs'
import IdskHeader from './components/idsk-header/idsk-header.mjs'
import IdskHeaderExtended from './components/idsk-header-extended/idsk-header-extended.mjs'
import IdskHeaderWeb from './components/idsk-header-web/idsk-header-web.mjs'
import IdskInPageNavigation from './components/idsk-in-page-navigation/idsk-in-page-navigation.mjs'
import IdskInteractiveMap from './components/idsk-interactive-map/idsk-interactive-map.mjs'
import IdskRegistrationForEvent from './components/idsk-registration-for-event/idsk-registration-for-event.mjs'
import IdskSearchComponent from './components/idsk-search-component/idsk-search-component.mjs'
import IdskSearchResults from './components/idsk-search-results/idsk-search-results.mjs'
import IdskSearchResultsFilter from './components/idsk-search-results-filter/idsk-search-results-filter.mjs'
import IdskStepper from './components/idsk-stepper/idsk-stepper.mjs'
import IdskSubscriptionForm from './components/idsk-subscription-form/idsk-subscription-form.mjs'
import IdskTable from './components/idsk-table/idsk-table.mjs'
import IdskTableFilter from './components/idsk-table-filter/idsk-table-filter.mjs'
import IdskTabs from './components/idsk-tabs/idsk-tabs.mjs'
import NotificationBanner from './components/notification-banner/notification-banner.mjs'
import Radios from './components/radios/radios.mjs'
import SkipLink from './components/skip-link/skip-link.mjs'
import Tabs from './components/tabs/tabs.mjs'

/**
 * Initialise all components
 *
 * Use the `data-module` attributes to find, instantiate and init all of the
 * components provided as part of GOV.UK Frontend.
 *
 * @param {Config} [config] - Config for all components
 */
function initAll (config) {
  config = typeof config !== 'undefined' ? config : {}

  // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var $scope = config.scope instanceof HTMLElement ? config.scope : document

  var $accordions = $scope.querySelectorAll('[data-module="govuk-accordion"]')
  nodeListForEach($accordions, function ($accordion) {
    new Accordion($accordion, config.accordion).init()
  })

  var $idskAccordions = $scope.querySelectorAll('[data-module="idsk-accordion"]')
  nodeListForEach($idskAccordions, function ($idskAccordions) {
    new IdskAccordion($idskAccordions).init()
  })

  var $buttons = $scope.querySelectorAll('[data-module="govuk-button"]')
  nodeListForEach($buttons, function ($button) {
    new Button($button, config.button).init()
  })

  var $idskButtons = $scope.querySelectorAll('[data-module="idsk-button"]')
  nodeListForEach($idskButtons, function ($idskButtons) {
    new IdskButton($idskButtons).init()
  })

  var $characterCounts = $scope.querySelectorAll('[data-module="govuk-character-count"]')
  nodeListForEach($characterCounts, function ($characterCount) {
    new CharacterCount($characterCount, config.characterCount).init()
  })

  var $checkboxes = $scope.querySelectorAll('[data-module="govuk-checkboxes"]')
  nodeListForEach($checkboxes, function ($checkbox) {
    new Checkboxes($checkbox).init()
  })

  var $crossroad = $scope.querySelectorAll('[data-module="idsk-crossroad"]')
  nodeListForEach($crossroad, function ($crossroad) {
    new IdskCrossroad($crossroad).init()
  })

  var $customerSurveys = $scope.querySelectorAll('[data-module="idsk-customer-surveys"]')
  nodeListForEach($customerSurveys, function ($customerSurveys) {
    new IdskCustomerSurveys($customerSurveys).init()
  })

  var $details = $scope.querySelectorAll('[data-module="govuk-details"]')
  nodeListForEach($details, function ($detail) {
    new Details($detail).init()
  })

  // Find first error summary module to enhance.
  var $errorSummary = $scope.querySelector('[data-module="govuk-error-summary"]')
  if ($errorSummary) {
    new ErrorSummary($errorSummary, config.errorSummary).init()
  }

  var $feedback = $scope.querySelectorAll('[data-module="idsk-feedback"]')
  nodeListForEach($feedback, function ($feedback) {
    new IdskFeedback($feedback).init()
  })

  var $footerExtended = $scope.querySelectorAll('[data-module="idsk-footer-extended"]')
  nodeListForEach($footerExtended, function ($footerExtended) {
    new IdskFooterExtended($footerExtended).init()
  })

  // Find first header module to enhance.
  var $header = $scope.querySelector('[data-module="govuk-header"]')
  if ($header) {
    new Header($header).init()
  }

  // Find first idsk header module to enhance.
  var $idskHeader = $scope.querySelector('[data-module="idsk-header"]')
  if ($idskHeader) {
    new IdskHeader($idskHeader).init()
  }

  // Find first header-extended module to enhance.
  var $headerExtended = $scope.querySelector('[data-module="idsk-header-extended"]')
  if ($headerExtended) {
    new IdskHeaderExtended($headerExtended).init()
  }

  // Find first header-web module to enhance.
  var $headerWeb = $scope.querySelector('[data-module="idsk-header-web"]')
  if ($headerWeb) {
    new IdskHeaderWeb($headerWeb).init()
  }

  var $inPageNavigation = $scope.querySelectorAll('[data-module="idsk-in-page-navigation"]')
  nodeListForEach($inPageNavigation, function ($inPageNavigation) {
    new IdskInPageNavigation($inPageNavigation).init()
  })

  var interactiveMap = $scope.querySelectorAll('[data-module="idsk-interactive-map"]')
  nodeListForEach(interactiveMap, function (interactiveMap) {
    new IdskInteractiveMap(interactiveMap).init()
  })

  var $notificationBanners = $scope.querySelectorAll('[data-module="govuk-notification-banner"]')
  nodeListForEach($notificationBanners, function ($notificationBanner) {
    new NotificationBanner($notificationBanner, config.notificationBanner).init()
  })

  var $radios = $scope.querySelectorAll('[data-module="govuk-radios"]')
  nodeListForEach($radios, function ($radio) {
    new Radios($radio).init()
  })

  var $registrationForEvent = $scope.querySelectorAll('[data-module="idsk-registration-for-event"]')
  nodeListForEach($registrationForEvent, function ($registrationForEvent) {
    new IdskRegistrationForEvent($registrationForEvent).init()
  })

  var $searchComponent = $scope.querySelectorAll('[data-module="idsk-search-component"]')
  nodeListForEach($searchComponent, function ($searchComponent) {
    new IdskSearchComponent($searchComponent).init()
  })

  var $searchResults = $scope.querySelectorAll('[data-module="idsk-search-results"]')
  nodeListForEach($searchResults, function ($searchResults) {
    new IdskSearchResults($searchResults).init()
  })

  var $searchResultsFilter = $scope.querySelectorAll('[data-module="idsk-search-results-filter"]')
  nodeListForEach($searchResultsFilter, function ($searchResultsFilter) {
    new IdskSearchResultsFilter($searchResultsFilter).init()
  })

  // Find first skip link module to enhance.
  var $skipLink = $scope.querySelector('[data-module="govuk-skip-link"]')
  if ($skipLink) {
    new SkipLink($skipLink).init()
  }

  var $stepper = $scope.querySelectorAll('[data-module="idsk-stepper"]')
  nodeListForEach($stepper, function ($stepper) {
    new IdskStepper($stepper).init()
  })

  var subscriptionForm = $scope.querySelectorAll('[data-module="idsk-stepper"]')
  nodeListForEach(subscriptionForm, function (subscriptionForm) {
    new IdskSubscriptionForm(subscriptionForm).init()
  })

  var $idskTable = $scope.querySelectorAll('[data-module="idsk-table"]')
  nodeListForEach($idskTable, function ($idskTable) {
    new IdskTable($idskTable).init()
  })

  var $tableFilter = $scope.querySelectorAll('[data-module="idsk-table-filter"]')
  nodeListForEach($tableFilter, function ($tableFilter) {
    new IdskTableFilter($tableFilter).init()
  })

  var $tabs = $scope.querySelectorAll('[data-module="govuk-tabs"]')
  nodeListForEach($tabs, function ($tabs) {
    new Tabs($tabs).init()
  })

  var $idskTabs = $scope.querySelectorAll('[data-module="idsk-tabs"]')
  nodeListForEach($idskTabs, function ($idskTabs) {
    new IdskTabs($idskTabs).init()
  })
}

export {
  initAll,
  version,

  // Components
  Accordion,
  IdskAccordion,
  Button,
  IdskButton,
  Details,
  CharacterCount,
  Checkboxes,
  IdskCrossroad,
  IdskCustomerSurveys,
  ErrorSummary,
  IdskFeedback,
  IdskFooterExtended,
  Header,
  IdskHeader,
  IdskHeaderExtended,
  IdskHeaderWeb,
  IdskInPageNavigation,
  IdskInteractiveMap,
  NotificationBanner,
  Radios,
  IdskRegistrationForEvent,
  IdskSearchComponent,
  IdskSearchResults,
  IdskSearchResultsFilter,
  SkipLink,
  IdskStepper,
  IdskSubscriptionForm,
  IdskTable,
  IdskTableFilter,
  Tabs,
  IdskTabs
}

/**
 * Config for all components via `initAll()`
 *
 * @typedef {object} Config
 * @property {Element} [scope=document] - Scope to query for components
 * @property {AccordionConfig} [accordion] - Accordion config
 * @property {ButtonConfig} [button] - Button config
 * @property {CharacterCountConfig} [characterCount] - Character Count config
 * @property {ErrorSummaryConfig} [errorSummary] - Error Summary config
 * @property {NotificationBannerConfig} [notificationBanner] - Notification Banner config
 */

/**
 * Config for individual components
 *
 * @typedef {import('./components/accordion/accordion.mjs').AccordionConfig} AccordionConfig
 * @typedef {import('./components/accordion/accordion.mjs').AccordionTranslations} AccordionTranslations
 * @typedef {import('./components/button/button.mjs').ButtonConfig} ButtonConfig
 * @typedef {import('./components/character-count/character-count.mjs').CharacterCountConfig} CharacterCountConfig
 * @typedef {import('./components/character-count/character-count.mjs').CharacterCountConfigWithMaxLength} CharacterCountConfigWithMaxLength
 * @typedef {import('./components/character-count/character-count.mjs').CharacterCountConfigWithMaxWords} CharacterCountConfigWithMaxWords
 * @typedef {import('./components/character-count/character-count.mjs').CharacterCountTranslations} CharacterCountTranslations
 * @typedef {import('./components/error-summary/error-summary.mjs').ErrorSummaryConfig} ErrorSummaryConfig
 * @typedef {import('./components/notification-banner/notification-banner.mjs').NotificationBannerConfig} NotificationBannerConfig
 */
