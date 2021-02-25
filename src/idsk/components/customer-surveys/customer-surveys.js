import "../../../govuk/vendor/polyfills/Function/prototype/bind";
import "../../../govuk/vendor/polyfills/Event"; // addEventListener and event.target normaliziation
import { nodeListForEach, toggleClass } from "../../common";

function CustomerSurveys($module) {
    this.$module = $module;
}

CustomerSurveys.prototype.init = function () {
    var $module = this.$module;
    var $nextButton = $module.querySelector('#idsk-customer-surveys__send-button');
    var $previousButton = $module.querySelector('#idsk-customer-surveys__previous-button');

    var $textAreaFirst = $module.querySelector('.idsk-customer-surveys-text-area #first');
    var $textAreaSecond = $module.querySelector('.idsk-customer-surveys-text-area #second');
    var $textAreaThird = $module.querySelector('.idsk-customer-surveys-text-area #third');
    var $textAreaFourth = $module.querySelector('.idsk-customer-surveys-text-area #fourth');

    var $radioButtonWork = $module.querySelector('.idsk-customer-survey__radio--work');
    var $radioButtonPrivate = $module.querySelector('.idsk-customer-survey__radio--private');
    var $counter = 7;

    if (!$module) {
        return;
    }

    this.handleCounterOfSubtitles.call(this, $counter);

    if ($radioButtonWork) {
        var $self = this;
        // Handle $radioButton click events
        $radioButtonWork.addEventListener('click', $self.handleRadioButtonWorkClick.bind($self));
    }

    if ($radioButtonPrivate) {
        var $self = this;
        // Handle $radioButton click events
        $radioButtonPrivate.addEventListener('click', $self.handleRadioButtonPrivateClick.bind($self));
    }

    if ($nextButton) {
        $nextButton.addEventListener('click', this.handleNextButtonClick.bind(this));
    }

    if ($previousButton) {
        $previousButton.addEventListener('click', this.handlePreviousButtonClick.bind(this));
    }

    if ($textAreaFirst) {
        $textAreaFirst.addEventListener('input', this.handleStatusOfCharacterCountButton.bind(this, 'first'));
    }

    if ($textAreaSecond) {
        $textAreaSecond.addEventListener('input', this.handleStatusOfCharacterCountButton.bind(this, 'second'));
    }

    if ($textAreaThird) {
        $textAreaThird.addEventListener('input', this.handleStatusOfCharacterCountButton.bind(this, 'third'));
    }

    if ($textAreaFourth) {
        $textAreaFourth.addEventListener('input', this.handleStatusOfCharacterCountButton.bind(this, 'fourth'));
    }
};

CustomerSurveys.prototype.handleStatusOfCharacterCountButton = function (e, $name) {
    var $textAreaCharacterCount = this.$module.querySelector('#' + $name.srcElement.id);
    var $remainingCharacterCountMessage = this.$module.querySelector('#' + $name.srcElement.id + '-info');
    var $submitButton = this.$module.querySelector('#idsk-customer-surveys__send-button');

    setTimeout(function () {
        if ($textAreaCharacterCount.classList.contains('govuk-textarea--error') || $remainingCharacterCountMessage.classList.contains('govuk-error-message')) {
            $submitButton.disabled = true;
        } else {
            $submitButton.disabled = false;
        }
    }, 300);
}

CustomerSurveys.prototype.handleCounterOfSubtitles = function ($counter) {
    var $subtitles = this.$module.querySelectorAll('.idsk-customer-surveys--subtitle');
    var i;

    // remove previous indexing
    for (i = 0; i < $counter; i++) {
        $subtitles[i].textContent = $subtitles[i].textContent.substring(3);
    }

    // adding new indexing
    for (i = 0; i < $counter; i++) {
        $subtitles[i].innerHTML = (i + 1) + '. ' + $subtitles[i].textContent;
    };
}

CustomerSurveys.prototype.handleRadioButtonWorkClick = function (e) {
    var $textArea = this.$module.querySelector('.idsk-customer-survey__text-area--work');
    var $subtitle = this.$module.querySelector('.idsk-customer-survey__subtitle--work');

    $subtitle.classList.add('idsk-customer-surveys--subtitle');
    $textArea.classList.remove('idsk-customer-surveys--hidden');
    this.handleCounterOfSubtitles.call(this, 8);
}

CustomerSurveys.prototype.handleRadioButtonPrivateClick = function (e) {
    var $textArea = this.$module.querySelector('.idsk-customer-survey__text-area--work');
    var $subtitle = this.$module.querySelector('.idsk-customer-survey__subtitle--work');

    $subtitle.classList.remove('idsk-customer-surveys--subtitle');
    $textArea.classList.add('idsk-customer-surveys--hidden');
    this.handleCounterOfSubtitles.call(this, 7);
}

CustomerSurveys.prototype.handlePreviousButtonClick = function (e) {
    var $steps = this.$module.querySelectorAll('.idsk-customer-surveys__step');
    var i;
    var $nextButton = this.$module.querySelector('#idsk-customer-surveys__send-button');
    var $previousButton = this.$module.querySelector('#idsk-customer-surveys__previous-button');

    $previousButton.blur();
    for (i = 2; i < $steps.length - 1; i++) {
        if ($previousButton.textContent == "Predošlá stránka" && $steps[2].classList.contains('idsk-customer-surveys--show')) {
            $previousButton.innerHTML = 'Odísť';
            $previousButton.onclick = function () {
                location.href = "/";
            };
        }

        if ($nextButton.textContent == "Odoslať odpovede") {
            $nextButton.innerHTML = 'Ďalej';
        }

        if ($steps[i].classList.contains('idsk-customer-surveys--show')) {
            $steps[i].classList.remove('idsk-customer-surveys--show');
            toggleClass($steps[i], 'idsk-customer-surveys--hidden');
            toggleClass($steps[i - 1], 'idsk-customer-surveys--hidden');
            $steps[i - 1].classList.add('idsk-customer-surveys--show');
            return;
        }
    };
}

CustomerSurveys.prototype.handleNextButtonClick = function (e) {
    var $steps = this.$module.querySelectorAll('.idsk-customer-surveys__step');
    var i;
    var $buttonsDiv = this.$module.querySelector('.idsk-customer-surveys__buttons');
    var $nextButton = this.$module.querySelector('#idsk-customer-surveys__send-button');
    var $previousButton = this.$module.querySelector('#idsk-customer-surveys__previous-button');

    $nextButton.blur();
    if ($nextButton.textContent == "Začať") {
        $nextButton.innerHTML = 'Ďalej';
    }

    if ($nextButton.textContent == "Odoslať odpovede") {
        $buttonsDiv.classList.add('idsk-customer-surveys--hidden');
    }

    for (i = 0; i < $steps.length - 1; i++) {
        if ($steps[i].classList.contains('idsk-customer-surveys--show')) {
            $steps[i].classList.remove('idsk-customer-surveys--show');
            toggleClass($steps[i], 'idsk-customer-surveys--hidden');
            toggleClass($steps[i + 1], 'idsk-customer-surveys--hidden');
            $steps[i + 1].classList.add('idsk-customer-surveys--show');
            window.sessionStorage.setItem(i, $steps[i]);

            if (i == 4) {
                $nextButton.innerHTML = 'Odoslať odpovede';
            }
            if (i == 1) {
                $previousButton.innerHTML = 'Predošlá stránka';
                $previousButton.onclick = function () {
                    location.href = "#";
                };
            }
            return;
        }
    };
}

export default CustomerSurveys;