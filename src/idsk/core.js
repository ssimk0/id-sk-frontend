import { nodeListForEach } from "./common";
import { initCore as initCoreGovuk } from "../govuk/core";
import Button from "./components/button/button";
import FooterExtended from "./components/footer-extended/footer-extended";
import CharacterCount from "./components/character-count/character-count";
import CustomerSurveys from "./components/customer-surveys/customer-surveys";
import HeaderWeb from './components/header-web/header-web';
import SearchResults from './components/search-results/search-results';

function initCore(options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== "undefined" ? options : {};

  // Allow the user to initialise ID-SK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  var $buttons = scope.querySelectorAll('[data-module="idsk-button"]')
  nodeListForEach($buttons, function ($button) {
    new Button($button).init()
  })
 
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

  var $customerSurveys = scope.querySelectorAll('[data-module="idsk-customer-surveys"]');
  nodeListForEach($customerSurveys, function ($customerSurveys) {
    new CustomerSurveys($customerSurveys).init();
  });

  var $headersWeb = scope.querySelectorAll('[data-module="idsk-header-web"]');
  nodeListForEach($headersWeb, function ($headerWeb) {
    new HeaderWeb($headerWeb).init();
  });

  var $searchResults = scope.querySelector('[data-module="idsk-search-results"]');
  new SearchResults($searchResults).init();

  // Init all GOVUK components js
  initCoreGovuk(options);
}


export {
  initCore,
  Button,
  CharacterCount,
  CustomerSurveys,
  FooterExtended,
  HeaderWeb,
  SearchResults
}
