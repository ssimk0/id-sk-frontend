import "../../../govuk/vendor/polyfills/Function/prototype/bind";
import "../../../govuk/vendor/polyfills/Event"; // addEventListener and event.target normaliziation
import { nodeListForEach, toggleClass } from "../../common";

/**
 * Crossroad Component
 */
function Crossroad($module) {
  this.$module = $module;
  this.$items = $module.querySelectorAll(".idsk-crossroad-title");
}

Crossroad.prototype.init = function () {
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

Crossroad.prototype.handleItemClick = function (e) {
  var $item = e.target;
  $item.setAttribute("aria-current", "true");
};

Crossroad.prototype.handleShowItems = function (e) {
  var $crossroadItems = this.$module.querySelectorAll('.idsk-crossroad__item');
  var $uncollapseButton = this.$module.querySelector('#idsk-crossroad__uncollapse-button');
  var $uncollapseDiv = this.$module.querySelector('.idsk-crossroad__uncollapse-div');


  $crossroadItems.forEach(crossroadItem => {
    toggleClass(crossroadItem, 'idsk-crossroad__item--two-columns-show');
  });

  if ($uncollapseButton.textContent == 'Zobraziť viac') {
    $uncollapseButton.innerHTML = 'Zobraziť menej';
  } else {
    $uncollapseButton.innerHTML = 'Zobraziť viac';
  }

  toggleClass($uncollapseButton, 'idsk-crossroad__collapse--shadow');
  toggleClass($uncollapseDiv, 'idsk-crossroad__collapse--arrow');
};

export default Crossroad;
