import { nodeListForEach } from "./common";
import { initExtended } from "./extended";
import { initAll as initAllGOVUKjs } from "../govuk/all";
import HeaderExtended from './components/header-extended/header-extended';
import SearchResultsFilter from './components/search-results-filter/search-results-filter';

function initAll(options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== "undefined" ? options : {};

  // Allow the user to initialise ID-SK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  // Find first Header-extended module to enhance.
  var $headersExtended = scope.querySelectorAll('[data-module="idsk-header-extended"]');
  nodeListForEach($headersExtended, function ($headerExtended) {
    new HeaderExtended($headerExtended).init();
  });

  var $searchResultsFilters = scope.querySelectorAll('[data-module="idsk-search-results-filter"]');
  nodeListForEach($searchResultsFilters, function ($searchResultsFilter) {
    new SearchResultsFilter($searchResultsFilter).init();
  })

  initExtended(options);

  // Init all GOVUK components js
  initAllGOVUKjs(options);
}


export {
  initAll,
  HeaderExtended,
  SearchResultsFilter
}
