import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normalization

function SubscriptionForm($module) {
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

  var $input = $module.querySelector('.govuk-input')

  $input.addEventListener('change', this.handleInput.bind(this))
}

/**
 * An event handler for submit event on $form
 * @param {object} e
 */
SubscriptionForm.prototype.handleSubmitForm = function (e) {
  e.preventDefault()
  var $input = e.target.querySelector('#subscription-email-value')
  var $formGroup = $input.parentElement

  // Handle email validation
  if (!$input.checkValidity()) {
    $formGroup.querySelectorAll(".govuk-error-message").forEach(e => e.remove());
    var $errorLabel = document.createElement("span")
    $errorLabel.classList.add("govuk-error-message")
    $errorLabel.textContent = $input.validationMessage

    $input.classList.add("govuk-input--error")
    $formGroup.classList.add("govuk-form-group--error")
    $input.before($errorLabel)
    return
  }

  // set and set class for different state
  this.$module.classList.add('idsk-subscription-form__subscription-confirmed')
}

SubscriptionForm.prototype.handleInput = function (e) {
  var $el = e.target || e.srcElement || e
  var $searchComponent = $el.closest('.idsk-subscription-form__input')
  var $searchLabel = $searchComponent.querySelector('label')

  // Handle label visibility
  if ($el.value === '') {
    $searchLabel.classList.remove('govuk-visually-hidden')
  } else {
    $searchLabel.classList.add('govuk-visually-hidden')
  }
}
export default SubscriptionForm
