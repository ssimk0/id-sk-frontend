import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { toggleClass } from '../../common'

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

    //let $radioButton = $module.querySelector('input[name=group1]');
    let $textAreaCharacterCount = $module.querySelector('#idsk-feedback-improove-question-bar #with-hint');
    let $sendButton = $module.querySelector('#idsk-feedback-send-button');

    let $radioButton1 = $module.querySelector('#idsk-feedback-radio-button-1');
    let $radioButton2 = $module.querySelector('#idsk-feedback-radio-button-2');
    let $radioButton3 = $module.querySelector('#idsk-feedback-radio-button-3');
    let $radioButton4 = $module.querySelector('#idsk-feedback-radio-button-4');
    let $radioButton5 = $module.querySelector('#idsk-feedback-radio-button-5');

    if ($radioButton1 || $radioButton2 || $radioButton3) {
        console.log('here');
        $radioButton1.addEventListener('click', this.handleRadioButtonQuestionClick.bind(this));
        $radioButton2.addEventListener('click', this.handleRadioButtonQuestionClick.bind(this));
        $radioButton3.addEventListener('click', this.handleRadioButtonQuestionClick.bind(this));
    }

    if ($radioButton4 || $radioButton5) {
        console.log('here');
        $radioButton4.addEventListener('click', this.handleRadioButtonClick.bind(this));
        $radioButton5.addEventListener('click', this.handleRadioButtonClick.bind(this));
    }

    if ($sendButton) {
        $sendButton.addEventListener('click', this.handleSendButtonClick.bind(this));
    }


    //  if ($radioButton) {
    //     $radioButton.addEventListener('click', this.handleRadioButtonClick.bind(this));
    //  }

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

    $improoveQuestionBar.classList.remove('idsk-feedback-open');
    $improoveQuestionBar.classList.add('idsk-feedback-display-hidden');
}

Feedback.prototype.handleRadioButtonQuestionClick = function (e) {
    let $improoveQuestionBar = this.$module.querySelector('#idsk-feedback-improove-question-bar');

    $improoveQuestionBar.classList.add('idsk-feedback-open');
    $improoveQuestionBar.classList.remove('idsk-feedback-display-hidden');
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