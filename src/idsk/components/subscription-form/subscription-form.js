import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../../../package/govuk/common'

function SubscriptionForm ($module) {
  this.$module = $module
}

SubscriptionForm.prototype.init = function () {
  // Check for module
  var $module = this.$module
  if (!$module) {
    return
  }

  // button to toggle content
  var $forms = $module.querySelectorAll('form')

  nodeListForEach($forms, function ($form) {
    $form.addEventListener('submit', this.handleSubmitForm.bind(this))
  }.bind(this))
}

/**
 * An event handler for submit event on $form
 * @param {object} e
 */
SubscriptionForm.prototype.handleSubmitForm = function (e) {
  var $el = e.target || e.srcElement
  e.preventDefault()

  // check if email is set
  if (this.$module.querySelector('input[type=email]').value === '')
    return

  // hide form and agreement text
  $el.style.display = 'none'
  this.$module.querySelector('.agreement-text').style.display = 'none'

  // change texts to sent state
  var $elementsToChange = this.$module.querySelectorAll('.description-text, .title-text')
  nodeListForEach($elementsToChange, function ($element) {
    $element.innerHTML = $element.dataset.sentState
  }.bind(this))

  // remove bottom spacing
  this.$module.querySelector('.description-text').style.marginBottom = 0
}

export default SubscriptionForm
