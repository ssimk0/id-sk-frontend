import "../../../govuk/vendor/polyfills/Function/prototype/bind";
import "../../../govuk/vendor/polyfills/Event"; // addEventListener and event.target normaliziation
import { nodeListForEach, toggleClass } from "../../common";

function CustomerSurveys($module) {
    this.$module = $module;
}

CustomerSurveys.prototype.init = function () {
    var $module = this.$module;
    var $nextButton = $module.querySelector('#idsk-customer-surveys__send-button');

    if (!$module) {
        return;
    }

    if ($nextButton) {
        $nextButton.addEventListener('click', this.handleNextButtonClick.bind(this));
    }

};

CustomerSurveys.prototype.handleNextButtonClick = function (e) {
    var $steps = this.$module.querySelectorAll('.idsk-customer-surveys__step');
    var i;

    var $nextButton = $module.querySelector('#idsk-customer-surveys__send-button');
 
    $nextButton.innerHTML = $nextButton.textContent == 'Začať' ? 'Zobraziť menej' : 'Zobraziť viac';

    for (i = 0; i < $steps.length-1; i++) {
        if ($steps[i].classList.contains('idsk-customer-surveys--show')) {
            $steps[i].classList.remove('idsk-customer-surveys--show');
            toggleClass($steps[i], 'idsk-customer-surveys--hidden');
            toggleClass($steps[i+1], 'idsk-customer-surveys--hidden');
            $steps[i+1].classList.add('idsk-customer-surveys--show');
            return;
        }
    };
}


export default CustomerSurveys;