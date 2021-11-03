import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import {toggleClass} from "../../common";


function TableFilter($module) {
  this.$module = $module
}

TableFilter.prototype.init = function () {
  // Check for module
  var $module = this.$module
  if (!$module) {
    return
  }
  var $toggleButtons = $module.querySelectorAll('.idsk-filter__toggle')
  if (!$toggleButtons) {
    return
  }

  $toggleButtons.forEach(function ($button) {
    $button.addEventListener('click', this.handleClickLinkPanel.bind(this))

    // remove
    $button.click()
  }.bind(this))
}

/**
 * An event handler for click event on $linkPanel - collapse or expand table-filter
 * @param {object} e
 */
TableFilter.prototype.handleClickLinkPanel = function (e) {
  var $el = e.target || e.srcElement
  var $panel = $el.parentNode
  var $content = $el.nextElementSibling

  // show content with slide down animation
  toggleClass($panel, 'idsk-table-filter--expanded')
  $content.style.height = ($content.style.height && $content.style.height !== "0px" ? "0" : $content.scrollHeight) + "px";
}

export default TableFilter
