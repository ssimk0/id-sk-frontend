import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import {toggleClass} from "../../common";


function TableFilter($module) {
  this.$module = $module
  this.$activeFilters = []
  this.selectedFitlersCount = 0
}

TableFilter.prototype.init = function () {
  // Check for module
  var $module = this.$module
  if (!$module) {
    return
  }

  // toggle for showing content
  var $toggleButtons = $module.querySelectorAll('.idsk-filter-menu__toggle')
  if (!$toggleButtons) {
    return
  }

  // submit all filters
  var $submitFilters = $module.querySelectorAll('#submit-filter')
  if (!$submitFilters) {
    return
  }

  // all inputs for count of selected filters
  var $filterInputs = $module.querySelectorAll('.govuk-input, .govuk-select')
  if (!$filterInputs) {
    return
  }

  $toggleButtons.forEach(function ($button) {
    $button.addEventListener('click', this.handleClickTogglePanel.bind(this))
    // TODO remove
    $button.click()
  }.bind(this))

  $submitFilters.forEach(function ($button) {
    $button.addEventListener('click', this.handleClickSubmitFilter.bind(this))
    // TODO remove
    $button.click()
  }.bind(this))

  $filterInputs.forEach(function ($input) {
    $input.addEventListener('change', this.handleFilterValueChange.bind(this))
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

/**
 * A function to remove filter from active filters
 * @param {object} $filterToRemove
 */
TableFilter.prototype.removeActiveFilter = function ($filterToRemove) {
  this.$activeFilters = this.$activeFilters.filter(function ($filter) {
    return $filter.id !== $filterToRemove.id;
  });
  this.renderActiveFilters(this)
}

/**
 * A function to add elements to DOM object
 * @param {object} e
 */
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

  // add remove everything button if some filter is activated else print none filter is activated
  if (this.$activeFilters.length > 0) {
    var $removeAllFilters = document.createElement("div")
    $removeAllFilters.innerHTML = 'Zrušiť všetko (' + this.$activeFilters.length + ')<span class="idsk-table-filter__parameter-remove">✕</span>'
    $removeAllFilters.addEventListener("click", function () {
      self.$activeFilters = []
      self.renderActiveFilters(self)
    })
    $removeAllFilters.classList.add("govuk-body", "govuk-link")
    $activeFilters.appendChild($removeAllFilters)
  } else {
    var $info = document.createElement("div")
    $info.classList.add("govuk-body")
    $info.innerHTML = 'Žiadny filter nie je vybraný.'
    $activeFilters.appendChild($info)
  }

  // calc height of panel  if 'active filter' panel is expanded
  var $activeFiltersContainer = this.$module.querySelector('.idsk-table-filter__active-filters.idsk-table-filter--expanded .idsk-table-filter__content')
  if ($activeFiltersContainer) {
    $activeFiltersContainer.style.height = "initial"; // to fix not changing height after removing element
    $activeFiltersContainer.style.height = $activeFiltersContainer.scrollHeight + "px";
  }
}

/**
 * A function to refresh number of selected filters
 * @param {object} e
 */
TableFilter.prototype.renderSelectedFiltersCount = function (e) {
  var counter = this.$module.querySelector("#submit-filter .count")
  console.log(counter)
  counter.innerHTML = this.selectedFitlersCount
  console.log(counter)
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

/**
 * An event handler for on change event on all inputs
 * @param {object} e
 */
TableFilter.prototype.handleFilterValueChange = function (e) {
  var $el = e.target || e.srcElement
  console.log($el.value)
  if ($el.value)
    this.selectedFitlersCount++
  else
    this.selectedFitlersCount--
  console.log(this.selectedFitlersCount)
  this.renderSelectedFiltersCount(this)
}

export default TableFilter
