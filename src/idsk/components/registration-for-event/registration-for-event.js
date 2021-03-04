import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation

function RegistrationForEvent($module) {
    this.$module = $module;
}

RegistrationForEvent.prototype.init = function () {
    // Check for module
    var $module = this.$module
    if (!$module) {
        return
    }

    // Check for button
    var $submitButtons = $module.querySelectorAll('.idsk-registration-for-event-js-submit')
    if (!$submitButtons) {
        return
    }

    // Handle $submitButtons click events
    $submitButtons.forEach(function ($submitButton) {
        $submitButton.addEventListener('click', this.handleSubmitClick.bind(this))
    }.bind(this));
}

RegistrationForEvent.prototype.handleSubmitClick = function (e) {
    e.preventDefault()
    var $target = e.target || e.scrElement
    var $module = this.$module
    var $form = $module.querySelector('.idsk-registration-for-event__form')
    var $thankYouMsg = $module.querySelector('.idsk-registration-for-event__thank-you-msg')
    var $requiredFormItems = $module.querySelectorAll('[required]')
    var $valid = true;
    var emailRegex = /\S+@\S+\.\S+/

    $requiredFormItems.forEach(function ($item) {
        var $errorClassItem = ($item.type === 'checkbox') ? $item.closest('.govuk-form-group') : $item
        var $className = ($item.type === 'checkbox') ? "govuk-form-group--error" : "govuk-input--error"

        if (!$item.checkValidity() || $item.type === "email" && !emailRegex.test($item.value)) {
            $errorClassItem.classList.add($className)
            $valid = false
        } else {
            $errorClassItem.classList.remove($className)
        }
    })

    if ($valid) {
        $thankYouMsg.style.display = 'block'
        $form.style.display = 'none'
    }
}

export default RegistrationForEvent