import { initCore } from './core'
import { nodeListForEach } from './common'
import Accordion from './components/accordion/accordion'
import Tabs from './components/tabs/tabs'

function initExtended(options) {
    // Set the options to an empty object by default if no options are passed.
    options = typeof options !== 'undefined' ? options : {}

    // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
    // Defaults to the entire document if nothing is set.
    var scope = typeof options.scope !== 'undefined' ? options.scope : document

    var $accordions = scope.querySelectorAll('[data-module="govuk-accordion"]')
    nodeListForEach($accordions, function ($accordion) {
    new Accordion($accordion).init()
    })

    var $tabs = scope.querySelectorAll('[data-module="govuk-tabs"]')
    nodeListForEach($tabs, function ($tabs) {
    new Tabs($tabs).init()
    })

    initCore(options)
}

export {
  initExtended,
  Accordion,
  Tabs
}
