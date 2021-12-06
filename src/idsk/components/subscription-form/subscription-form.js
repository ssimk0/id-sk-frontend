import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normalization

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
  var $form = $module.querySelector('.idsk-subscription-form__submit-handler')
  if ($form) {
    $form.addEventListener('submit', this.handleSubmitForm.bind(this))
  }
}

/**
 * An event handler for submit event on $form
 * @param {object} e
 */
SubscriptionForm.prototype.handleSubmitForm = function (e) {
  e.preventDefault()

  // check if email is set and set class for different state
  if (e.target.querySelector('input[type=email]').value !== '') {
    this.$module.classList.add('idsk-subscription-form__subscription-confirmed')
  }
}

export default SubscriptionForm
