import "../../../govuk/vendor/polyfills/Function/prototype/bind";
import "../../../govuk/vendor/polyfills/Event"; // addEventListener and event.target normaliziation
import { nodeListForEach, toggleClass } from "../../common";

function CustomerSurveys($module) {
    this.$module = $module;
    this.$items = $module.querySelectorAll(".idsk-crossroad-title");
}



CustomerSurveys.prototype.init = function () {
    var $module = this.$module;
    var $items = this.$items;
    var $uncollapseButton = $module.querySelector('#idsk-crossroad__uncollapse-button');

    if (!$module || !$items) {
        return;
    }

    if ($uncollapseButton) {
        $uncollapseButton.addEventListener('click', this.handleShowItems.bind(this));
    }

    nodeListForEach(
        $items,
        function ($item) {
            $item.addEventListener("click", this.handleItemClick.bind(this));
        }.bind(this)
    );
};


export default CustomerSurveys;