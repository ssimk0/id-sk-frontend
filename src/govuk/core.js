import { nodeListForEach } from './common'
import Button from './components/button/button'
import Details from './components/details/details'
import CharacterCount from './components/character-count/character-count'
import Checkboxes from './components/checkboxes/checkboxes'
import ErrorSummary from './components/error-summary/error-summary'
import Radios from './components/radios/radios'

function initCore(options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  var $buttons = scope.querySelectorAll('[data-module="govuk-button"]')
  nodeListForEach($buttons, function ($button) {
    new Button($button).init()
  })

  var $details = scope.querySelectorAll('[data-module="govuk-details"]')
  nodeListForEach($details, function ($detail) {
    new Details($detail).init()
  })

  var $characterCounts = scope.querySelectorAll('[data-module="govuk-character-count"]')
  nodeListForEach($characterCounts, function ($characterCount) {
    new CharacterCount($characterCount).init()
  })

  var $checkboxes = scope.querySelectorAll('[data-module="govuk-checkboxes"]')
  nodeListForEach($checkboxes, function ($checkbox) {
    new Checkboxes($checkbox).init()
  })

  // Find first error summary module to enhance.
  var $errorSummary = scope.querySelector('[data-module="govuk-error-summary"]')
  new ErrorSummary($errorSummary).init()

  var $radios = scope.querySelectorAll('[data-module="govuk-radios"]')
  nodeListForEach($radios, function ($radio) {
    new Radios($radio).init()
  })
}

export {
  initCore,
  Button,
  Details,
  CharacterCount,
  Checkboxes,
  ErrorSummary,
  Radios
}
