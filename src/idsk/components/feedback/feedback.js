import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { toggleClass } from '../../common'
import { nodeListForEach } from '../../../govuk/common'

/**
 * Footer for extended websites
 */
function Feedback($module) {
    this.$module = $module;
}

Feedback.prototype.init = function () {
    let $module = this.$module;
    // check for module
    if (!$module) {
        return;
    }

    let $textAreaCharacterCount = $module.querySelector('#idsk-feedback-improove-question-bar #with-hint');
    let $sendButton = $module.querySelector('#idsk-feedback-send-button');
    let $radioButtons = $module.querySelectorAll('.idsk-feedback-radio-button');

    if ($radioButtons) {
        let $self = this;
        // Handle $radioButtons click events
        nodeListForEach($radioButtons, function ($radioButton) {
            $radioButton.addEventListener('click', $self.handleRadioButtonClick.bind($self));
        })
    }

    if ($sendButton) {
        $sendButton.addEventListener('click', this.handleSendButtonClick.bind(this));
    }

    if ($textAreaCharacterCount) {
        $textAreaCharacterCount.addEventListener('input', this.handleStatusOfCharacterCountButton.bind(this));
    }
}

Feedback.prototype.handleSendButtonClick = function (e) {
    let $thanksForFeedbackBar = this.$module.querySelector('#idsk-feedback-thanks-for-feedback');
    let $feedbackContent = this.$module.querySelector('#idsk-feedback-content');

    $feedbackContent.classList.add('idsk-feedback-display-none');
    $thanksForFeedbackBar.classList.remove('idsk-feedback-display-none');
}

Feedback.prototype.handleRadioButtonClick = function (e) {
    let $improoveQuestionBar = this.$module.querySelector('#idsk-feedback-improove-question-bar');

    if (e.srcElement.classList.contains('idsk-feedback-textarea--show')) {
        $improoveQuestionBar.classList.add('idsk-feedback-open');
        $improoveQuestionBar.classList.remove('idsk-feedback-display-hidden');
    } else {
        $improoveQuestionBar.classList.remove('idsk-feedback-open');
        $improoveQuestionBar.classList.add('idsk-feedback-display-hidden');
    }
}

Feedback.prototype.handleStatusOfCharacterCountButton = function (e) {
    let $textAreaCharacterCount = this.$module.querySelector('#with-hint');
    let $remainingCharacterCountMessage = this.$module.querySelector('#with-hint-info');

    let $submitButton = this.$module.querySelector('#idsk-feedback-send-button');

    setTimeout(function () {
        if ($textAreaCharacterCount.classList.contains('govuk-textarea--error') || $remainingCharacterCountMessage.classList.contains('govuk-error-message')) {
            $submitButton.disabled = true;
        } else {
            $submitButton.disabled = false;
        }
    }, 300);
}

export default Feedback