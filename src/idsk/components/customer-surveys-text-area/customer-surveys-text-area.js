import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation

/**
 * Feedback for extended websites
 */
function CustomerSurveysTextArea($module) {
    this.$module = $module;
}

CustomerSurveysTextArea.prototype.init = function () {
    var $module = this.$module;
    // check for module
    if (!$module) {
        return;
    }

    var $textAreaCharacterCount = $module.querySelector('#idsk-feedback__question-bar #with-hint');

    if ($textAreaCharacterCount) {
        $textAreaCharacterCount.addEventListener('input', this.handleStatusOfCharacterCountButton.bind(this));
    }
}


CustomerSurveysTextArea.prototype.handleStatusOfCharacterCountButton = function (e) {
    var $textAreaCharacterCount = this.$module.querySelector('#with-hint');
    var $remainingCharacterCountMessage = this.$module.querySelector('#with-hint-info');

    var $submitButton = this.$module.querySelector('#idsk-feedback__send-button');

    setTimeout(function () {
        if ($textAreaCharacterCount.classList.contains('govuk-textarea--error') || $remainingCharacterCountMessage.classList.contains('govuk-error-message')) {
            $submitButton.disabled = true;
        } else {
            $submitButton.disabled = false;
        }
    }, 300);
}

export default CustomerSurveysTextArea