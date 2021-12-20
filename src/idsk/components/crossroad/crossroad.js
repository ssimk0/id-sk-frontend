import "../../../govuk/vendor/polyfills/Function/prototype/bind";
import "../../../govuk/vendor/polyfills/Event"; // addEventListener and event.target normalization
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

Crossroad.prototype.setAriaLabel = function (arr) {
  arr.forEach(function (item) {
    if (item.classList.contains('idsk-crossroad__arria-hidden')) {
      item.setAttribute("aria-hidden", "true");
      toggleClass(item, 'idsk-crossroad__arria-hidden');
    } else if (item.getAttribute("aria-hidden") == "true") {
      item.setAttribute("aria-hidden", "false");
      toggleClass(item, 'idsk-crossroad__arria-hidden');
    }
  });
};

Crossroad.prototype.handleShowItems = function (e) {
  var $crossroadItems = this.$module.querySelectorAll('.idsk-crossroad__item');
  var $uncollapseButton = this.$module.querySelector('#idsk-crossroad__uncollapse-button');
  var $uncollapseDiv = this.$module.querySelector('.idsk-crossroad__uncollapse-div');
  var $crossroadTitles = this.$module.querySelectorAll('.idsk-crossroad-title');
  var $crossroadSubtitles = this.$module.querySelectorAll('.idsk-crossroad-subtitle');

  $crossroadItems.forEach(function (crossroadItem) {
    toggleClass(crossroadItem, 'idsk-crossroad__item--two-columns-show');
  });

  this.setAriaLabel($crossroadTitles);
  this.setAriaLabel($crossroadSubtitles);

  $uncollapseButton.innerHTML = $uncollapseButton.textContent == $uncollapseButton.dataset.line1 ? $uncollapseButton.dataset.line2 : $uncollapseButton.dataset.line1;

  toggleClass(e.srcElement, 'idsk-crossroad__colapse--button-show');
  toggleClass($uncollapseDiv, 'idsk-crossroad__collapse--shadow');
  toggleClass($uncollapseDiv, 'idsk-crossroad__collapse--arrow');
};

export default Crossroad;
