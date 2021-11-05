import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import {toggleClass} from "../../common";


function TableFilter($module) {
  this.$module = $module
  this.$activeFilters = []
}

TableFilter.prototype.init = function () {
  // Check for module
  var $module = this.$module
  if (!$module) {
    return
  }
  var $toggleButtons = $module.querySelectorAll('.idsk-filter-menu__toggle')
  if (!$toggleButtons) {
    return
  }

  var $submitButtons = $module.querySelectorAll('#submit-filter')
  if (!$submitButtons) {
    return
  }

  $toggleButtons.forEach(function ($button) {
    $button.addEventListener('click', this.handleClickTogglePanel.bind(this))
    // TODO remove
    $button.click()
  }.bind(this))

  $submitButtons.forEach(function ($button) {
    $button.addEventListener('click', this.handleClickSubmitFilter.bind(this))
    // TODO remove
    $button.click()
  }.bind(this))
}

/**
 * An event handler for click event on $togglePanel - collapse or expand table-filter
 * @param {object} e
 */
TableFilter.prototype.handleClickTogglePanel = function (e) {
  var $el = e.target || e.srcElement
  var $panel = $el.parentNode
  var $content = $el.nextElementSibling

  // show content with slide down animation
  toggleClass($panel, 'idsk-table-filter--expanded')
  $content.style.height = ($content.style.height && $content.style.height !== "0px" ? "0" : $content.scrollHeight) + "px";
}

TableFilter.prototype.removeActiveFilter = function ($filterToRemove) {
  this.$activeFilters = this.$activeFilters.filter(function ($filter) {
    return $filter.id !== $filterToRemove.id;
  });
  this.renderActiveFilters(this)
}

TableFilter.prototype.renderActiveFilters = function (e) {
  var self = this

  // remove all elements
  var $activeFilters = this.$module.querySelector('.idsk-table-filter__active-filters .idsk-table-filter__content')
  $activeFilters.innerHTML = '';

  // render all elements
  this.$activeFilters.forEach(function ($filter) {
    var $activeFilter = document.createElement("div")
    $activeFilter.innerHTML = $filter.value + '<span class="idsk-table-filter__parameter-remove">✕</span>'
    $activeFilter.querySelector('.idsk-table-filter__parameter-remove').addEventListener("click", function () {
      self.removeActiveFilter($filter)
    })
    $activeFilter.classList.add("idsk-table-filter__parameter", "govuk-body")
    $activeFilters.appendChild($activeFilter)
  })

  // calc height of panel  if 'active filter' panel is expanded
  var $activeFiltersContainer = this.$module.querySelector('.idsk-table-filter__active-filters.idsk-table-filter--expanded .idsk-table-filter__content')
  if ($activeFiltersContainer) {
    $activeFiltersContainer.style.height = "initial"; // to fix not changing height after removing element
    $activeFiltersContainer.style.height = $activeFiltersContainer.scrollHeight + "px";
  }
}

/**
 * An event handler for click event on $submitButton - submit selected filters
 * @param {object} e
 */
TableFilter.prototype.handleClickSubmitFilter = function (e) {
  var self = this

  // get all inputs and selects
  var $inputs = this.$module.querySelectorAll(".idsk-table-filter__inputs input")
  var $selects = this.$module.querySelectorAll(".idsk-table-filter__inputs select")

  // add values of inputs to $activeFilters if it is not empty
  self.$activeFilters = []
  $inputs.forEach(function ($input) {
    if ($input.value.length > 0)
      self.$activeFilters.push({
        id: $input.getAttribute('id'),
        name: $input.getAttribute('name'),
        value: $input.value,
      })
  })

  $selects.forEach(function ($select) {
    if ($select.value)
      self.$activeFilters.push({
        id: $select.value,
        name: $select.getAttribute('name'),
        value: $select.options[$select.selectedIndex].text,
      })
  })


  // add elements to active filters
  this.renderActiveFilters(this)
}

export default TableFilter
