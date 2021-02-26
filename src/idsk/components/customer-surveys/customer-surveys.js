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
    $module.sendButtonDisabled = new Array(7);
    $module.textAreaMap = new Map()

    if (!$module) {
        return;
    }

    for (var index = 0; index < $module.sendButtonDisabled.length; index++) {
        $module.sendButtonDisabled[index] = false;
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
        $module.textAreaMap.set('first', 1);
        $textAreaFirst.addEventListener('input', this.handleStatusOfCharacterCountButton.bind(this, 'first'));
    }

    if ($textAreaSecond) {
        $module.textAreaMap.set('second', 2);
        $textAreaSecond.addEventListener('input', this.handleStatusOfCharacterCountButton.bind(this, 'second'));
    }

    if ($textAreaThird) {
        $module.textAreaMap.set('third', 4);
        $textAreaThird.addEventListener('input', this.handleStatusOfCharacterCountButton.bind(this, 'third'));
    }

    if ($textAreaFourth) {
        $module.textAreaMap.set('fourth', 5);
        $textAreaFourth.addEventListener('input', this.handleStatusOfCharacterCountButton.bind(this, 'fourth'));
    }
};

CustomerSurveys.prototype.handleStatusOfCharacterCountButton = function (e, $name) {
    var $module = this.$module;
    var $textAreaCharacterCount = $module.querySelector('#' + $name.srcElement.id);
    var $remainingCharacterCountMessage = $module.querySelector('#' + $name.srcElement.id + '-info');
    var $submitButton = $module.querySelector('#idsk-customer-surveys__send-button');

    setTimeout(function () {
        if ($textAreaCharacterCount.classList.contains('govuk-textarea--error') || $remainingCharacterCountMessage.classList.contains('govuk-error-message')) {
            $submitButton.disabled = true;
        } else {
            $submitButton.disabled = false;
            $module.sendButtonDisabled[$module.textAreaMap.get($name.srcElement.id)] = false;            
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
    var $module = this.$module;
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
            if ($nextButton.disabled) {
                $module.sendButtonDisabled[i] = true;
                $nextButton.disabled = false;
            }

            $steps[i].classList.remove('idsk-customer-surveys--show');
            toggleClass($steps[i], 'idsk-customer-surveys--hidden');
            toggleClass($steps[i - 1], 'idsk-customer-surveys--hidden');
            $steps[i - 1].classList.add('idsk-customer-surveys--show');
            return;
        }
    };
}

CustomerSurveys.prototype.handleNextButtonClick = function (e) {
    var $module = this.$module;
    var $steps = $module.querySelectorAll('.idsk-customer-surveys__step');
    var i;
    var $buttonsDiv = $module.querySelector('.idsk-customer-surveys__buttons');
    var $nextButton = $module.querySelector('#idsk-customer-surveys__send-button');
    var $previousButton = $module.querySelector('#idsk-customer-surveys__previous-button');

    $nextButton.blur();
    if ($nextButton.textContent == "Začať") {
        $nextButton.innerHTML = 'Ďalej';
        //uncheck all radiobuttons 
        var $radios = $module.querySelectorAll('.govuk-radios__input');
        for (var i = 0; i < $radios.length; i++) {
            $radios[i].checked = false;
        }

        var $textAreas = $module.querySelectorAll('.govuk-textarea');
        for (var i = 0; i < $textAreas.length; i++) {
            $textAreas[i].value = '';
        }
    }

    if ($nextButton.textContent == "Odoslať odpovede") {
        $buttonsDiv.classList.add('idsk-customer-surveys--hidden');
    }

    for (i = 0; i < $steps.length - 1; i++) {
        if ($steps[i].classList.contains('idsk-customer-surveys--show')) {
            if ($module.sendButtonDisabled[i + 1]) {
                $nextButton.disabled = true;
            } else {
                $nextButton.disabled = false;
            }
            $steps[i].classList.remove('idsk-customer-surveys--show');
            toggleClass($steps[i], 'idsk-customer-surveys--hidden');
            toggleClass($steps[i + 1], 'idsk-customer-surveys--hidden');
            $steps[i + 1].classList.add('idsk-customer-surveys--show');
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