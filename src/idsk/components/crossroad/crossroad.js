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

  if (!$module || !$items) {
    return;
  }

  var $uncollapseButton = $module.querySelector('#idsk-crossroad__uncollapse-button');
  var $collapseButton = $module.querySelector('#idsk-crossroad__collapse-button');

  if ($uncollapseButton) {
    $uncollapseButton.addEventListener('click', this.handleShowItems.bind(this));
  }

  if ($collapseButton) {
    $collapseButton.addEventListener('click', this.handleHideItems.bind(this));
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
  var $crossroadItems = this.$module.querySelectorAll('#idsk-crossroad__item');
  var $collapseButton = this.$module.querySelector('#idsk-crossroad__collapse-button');

  $crossroadItems.forEach(crossroadItem => {
    if (crossroadItem.classList.contains('idsk-crossroad__item--two-columns-hide-mobile')) {
      crossroadItem.classList.add('idsk-crossroad__item--show');
      crossroadItem.classList.remove('idsk-crossroad__item--two-columns-hide-mobile');
    }
    if (crossroadItem.classList.contains('idsk-crossroad__element-hide--desktop')) {
      crossroadItem.classList.add('idsk-crossroad__item--two-columns-show');
      crossroadItem.classList.remove('idsk-crossroad__element-hide--desktop');
    }
    if (crossroadItem.classList.contains('idsk-crossroad__element-hide')) {
      crossroadItem.classList.add('idsk-crossroad__item--show');
      crossroadItem.classList.remove('idsk-crossroad__element-hide');
    }
  });
  toggleClass($collapseButton, 'idsk-crossroad__element-hide');
  toggleClass(e.srcElement, 'idsk-crossroad__element-hide');
};

Crossroad.prototype.handleHideItems = function (e) {
  var $crossroadItems = this.$module.querySelectorAll('#idsk-crossroad__item');
  var $collapseButton = this.$module.querySelector('#idsk-crossroad__uncollapse-button');

  $crossroadItems.forEach(crossroadItem => {
    if (crossroadItem.classList.contains('idsk-crossroad__item--show')) {
      crossroadItem.classList.remove('idsk-crossroad__item--show');
      crossroadItem.classList.add('idsk-crossroad__item--two-columns-hide-mobile');
    }
    if (crossroadItem.classList.contains('idsk-crossroad__item--two-columns-show')) {
      crossroadItem.classList.remove('idsk-crossroad__item--two-columns-show');
      crossroadItem.classList.add('idsk-crossroad__element-hide--desktop');
    }
    if (crossroadItem.classList.contains('idsk-crossroad__item--show')) {
      crossroadItem.classList.remove('idsk-crossroad__item--show');
      crossroadItem.classList.add('idsk-crossroad__element-hide');
    }
  });
  toggleClass($collapseButton, 'idsk-crossroad__element-hide');
  toggleClass(e.srcElement, 'idsk-crossroad__element-hide');
};

export default Crossroad;
