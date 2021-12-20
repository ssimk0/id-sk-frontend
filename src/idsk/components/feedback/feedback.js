import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normalization
import { nodeListForEach } from '../../common'

/**
 * Feedback for extended websites
 */
function Feedback($module) {
    this.$module = $module;
}

Feedback.prototype.init = function () {
    var $module = this.$module;
    // check for module
    if (!$module) {
        return;
    }

    var $textAreaCharacterCount = $module.querySelector('#idsk-feedback__question-bar #feedback');
    var $sendButton = $module.querySelector('#idsk-feedback__send-button');
    var $radioButtons = $module.querySelectorAll('.idsk-feedback__radio-button');

    if ($radioButtons) {
        var $self = this;
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
    var $thanksForFeedbackBar = this.$module.querySelector('#idsk-feedback__thanks');
    var $feedbackContent = this.$module.querySelector('#idsk-feedback__content');

    $feedbackContent.classList.add('idsk-feedback--hidden');
    $thanksForFeedbackBar.classList.remove('idsk-feedback--hidden');
}

Feedback.prototype.handleRadioButtonClick = function (e) {
    var $improoveQuestionBar = this.$module.querySelector('#idsk-feedback__question-bar');

    if (e.srcElement.classList.contains('idsk-feedback-textarea--show')) {
        $improoveQuestionBar.classList.add('idsk-feedback--open');
        $improoveQuestionBar.classList.remove('idsk-feedback--invisible');
    } else {
        $improoveQuestionBar.classList.remove('idsk-feedback--open');
        $improoveQuestionBar.classList.add('idsk-feedback--invisible');
    }
}

Feedback.prototype.handleStatusOfCharacterCountButton = function (e) {
    var $textAreaCharacterCount = this.$module.querySelector('#feedback');
    var $remainingCharacterCountMessage = this.$module.querySelector('#feedback-info');

    var $submitButton = this.$module.querySelector('#idsk-feedback__send-button');

    setTimeout(function () {
        if ($textAreaCharacterCount.classList.contains('govuk-textarea--error') || $remainingCharacterCountMessage.classList.contains('govuk-error-message')) {
            $submitButton.disabled = true;
        } else {
            $submitButton.disabled = false;
        }
    }, 300);
}

export default Feedback
