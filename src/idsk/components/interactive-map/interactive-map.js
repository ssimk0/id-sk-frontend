import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import d3 from 'd3';
//import * as d3 from 'd3';

function InteractiveMap($module) {
    this.$module = $module
    this.$currentData = null;
}

InteractiveMap.prototype.init = function () {
    // Check for module
    var $module = this.$module
    if (!$module) {
        return
    }

    var $radioTable = $module.querySelector('.idsk-intereactive-map__radio-table');
    var $radioMap = $module.querySelector('.idsk-intereactive-map__radio-map');
    var $radioTableInput = $radioTable.querySelector(".govuk-radios__input");
    this.$tableDataSource = $radioTableInput.dataset.source;

    if ($radioMap) {
        $radioMap.addEventListener('click', this.handleRadioButtonModeClick.bind(this, 'map'));
    }

    if ($radioTable) {
        $radioTable.addEventListener('click', this.handleRadioButtonModeClick.bind(this, 'table'));
    }
    $radioTable.click();
}

InteractiveMap.prototype.handleRadioButtonModeClick = function (type) {
    var $type = type;
    var $module = this.$module;

    if ($type == "table") {
        $module.querySelector(".idsk-interactive-map__table").style.display = "block";
        $module.querySelector(".idsk-interactive-map__map").style.display = "none";
        this.loadData();
    } else if ($type == "map") {
        $module.querySelector(".idsk-interactive-map__map").style.display = "block";
        $module.querySelector(".idsk-interactive-map__table").style.display = "none";
        this.loadMap();
    }
}

InteractiveMap.prototype.loadMap = function () {
    console.log('loadMap')
}

InteractiveMap.prototype.loadData = function () {
    if (this.$currentData) {
        this.renderData(this.$currentData);
        return;
    }

    if (!this.$tableDataSource) {
        return
    }
    console.log(this.$tableDataSource)
    console.log(d3)
    d3.csv(this.$tableDataSource, function (data) {
        this.$currentData = data;
        this.renderData(data);
    });
}

InteractiveMap.prototype.renderData = function (data) {
    console.dir(data);
}


export default InteractiveMap