import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation

function InteractiveMap($module) {
    this.$module = $module
    this.$currentData = null;
    this.$currentMode = '';
}

InteractiveMap.prototype.init = function () {
    // Check for module
    var $module = this.$module
    if (!$module) {
        return
    }

    var $radioMap = $module.querySelector('.idsk-intereactive-map__radio-map')
    if ($radioMap) {
        $radioMap.addEventListener('click', this.handleRadioButtonModeClick.bind(this, 'map'))
    }

    var $radioTable = $module.querySelector('.idsk-intereactive-map__radio-table')
    if ($radioTable) {
        $radioTable.addEventListener('click', this.handleRadioButtonModeClick.bind(this, 'table'))
    }

    var $selectTimePeriod = $module.querySelector('.idsk-interactive-map__select-time-period')
    if ($selectTimePeriod) {
        $selectTimePeriod.addEventListener('change', this.renderData.bind(this))
    }

    var $selectIndicator = $module.querySelector('.idsk-interactive-map__select-indicator')
    if ($selectIndicator) {
        $selectIndicator.addEventListener('change', this.renderData.bind(this))
    }

    this.renderData()
}

InteractiveMap.prototype.handleRadioButtonModeClick = function (type) {

    var $type = type;
    var $module = this.$module;

    if (this.$currentMode === $type) {
        return;
    }

    this.$currentMode = $type;

    if ($type === "table") {
        $module.querySelector(".idsk-interactive-map__table").style.display = "block";
        $module.querySelector(".idsk-interactive-map__map").style.display = "none";
    } else if ($type === "map") {
        $module.querySelector(".idsk-interactive-map__map").style.display = "block";
        $module.querySelector(".idsk-interactive-map__table").style.display = "none";
    }
}

InteractiveMap.prototype.renderData = function () {
    var $module = this.$module
    var $tableEl = $module.querySelector('.idsk-interactive-map__table-iframe')
    var $tableSrc = $tableEl.dataset.src
    var $mapEl = $module.querySelector('.idsk-interactive-map__map-iframe')
    var $mapSrc = $mapEl.dataset.src

    var $indicatorSelect = $module.querySelector('.idsk-interactive-map__select-indicator')
    var $indicatorValue = $indicatorSelect.options[$indicatorSelect.selectedIndex].value;
    var $indicator = $indicatorSelect.options[$indicatorSelect.selectedIndex].text;

    var $timePeriodSelect = $module.querySelector('.idsk-interactive-map__select-time-period')
    var $timePeriodValue = $timePeriodSelect.options[$timePeriodSelect.selectedIndex].value;
    var $timePeriod = $timePeriodSelect.options[$timePeriodSelect.selectedIndex].text;

    $mapEl.src = `${$mapSrc}?exclude=${$indicatorValue}&time=${$timePeriodValue}`
    $tableEl.src = `${$tableSrc}?exclude=${$indicatorValue}&time=${$timePeriodValue}`
    $module.querySelector(".idsk-interactive-map__current-indicator").innerText = $indicator
    $module.querySelector(".idsk-interactive-map__current-time-period").innerText = $timePeriod
}

export default InteractiveMap