import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { idskSortTable } from "../../utilities/utils";


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

    if (typeof d3 === "undefined") {
        console.error('Kniznica d3.js nie je definovana. Je potrebne ju nacitat v hlavicke');
        return;
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
        this.loadData();
    } else if ($type === "map") {
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
        return;
    }

    if (!this.$tableDataSource) {
        return;
    }

    var dsv = d3.dsvFormat(";");
    d3.text(this.$tableDataSource).then(function (text) {
        this.$currentData = dsv.parse(text);
        this.initSelectIndicator(this.$currentData.columns);
        this.renderCustomTable();
    }.bind(this))
}

InteractiveMap.prototype.renderCustomTable = function () {

    var $data = this.$currentData
    var $columns = $data.columns
    var $resultHtml = "<table>";

    $resultHtml += "<tr>";
    for (var $i in $columns) {
        $resultHtml += "<th class='idsk-interactive-map__js-sortable'>" + $columns[$i] + "</th>";
    }
    $resultHtml += "</tr>";

    for (var $i in $data) {
        var $item = $data[$i];

        for (var $i in $columns) {
            $resultHtml += "<td>" + $item[$columns[$i]] + "</td>";
        }

        $resultHtml += "</tr>";
    }
    $resultHtml += "</table>";

    this.$module.querySelector('.idsk-interactive-map__js-table').innerHTML = $resultHtml
    //this.initSortableTH()
}

InteractiveMap.prototype.initSortableTH = function () {
    var $ths = this.$module.querySelectorAll('.idsk-interactive-map__js-sortable')

    $ths.forEach(function ($th) {
        $th.addEventListener('click', idskSortTable.bind(this));
    }.bind(this))

}

InteractiveMap.prototype.initSelectIndicator = function (data) {
    var $select = this.$module.querySelector('.idsk-interactive-map__js-indicator');
    data.forEach(function (item, index) {
        var $option = document.createElement('option');
        $option.value = index;
        $option.textContent = item;
        $select.appendChild($option);
    });
}

export default InteractiveMap