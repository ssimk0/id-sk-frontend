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
  var $forms = $module.querySelectorAll('.example-action form')

  nodeListForEach($forms, function ($form) {
    $form.addEventListener('submit', this.handleSubmitForm.bind(this))
  }.bind(this))
}

/**
 * An event handler for submit event on $form
 * @param {object} e
 */
SubscriptionForm.prototype.handleSubmitForm = function (e) {
  e.preventDefault()

  // check if email is set and set class for different state
  if (this.$module.querySelector('input[type=email]').value !== '')
    this.$module.classList.add('subscription-confirmed')
}

export default SubscriptionForm
