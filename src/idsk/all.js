import { nodeListForEach } from '../govuk/common'
import { initAll as initAllGOVUKjs } from '../govuk/all'
import FooterExtended from './components/footer-extended/footer-extended'
import CharacterCount from './components/character-count/character-count'

function initAll(options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise ID-SK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  let scope = typeof options.scope !== 'undefined' ? options.scope : document
  // Find first Footer-extended module to enhance.
  let $footerExtended = scope.querySelectorAll('[data-module="idsk-footer-extended"]')
  nodeListForEach($footerExtended, function ($footerExtended) {
    new FooterExtended($footerExtended).init()
  })

  var $characterCounts = scope.querySelectorAll('[data-module="idsk-character-count"]')
  nodeListForEach($characterCounts, function ($characterCount) {
    new CharacterCount($characterCount).init()
  })

  // Init all GOVUK components js
  initAllGOVUKjs(options)
}

export {
  initAll,
  FooterExtended,
  CharacterCount
}