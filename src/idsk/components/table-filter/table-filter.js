import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import {toggleClass} from "../../common";


function TableFilter($module) {
  this.$module = $module
  this.selectedFitlersCount = 0
  this.$activeFilters = []
}

TableFilter.prototype.init = function () {
  // Check for module
  var $module = this.$module
  if (!$module)
    return

  // toggle for showing content
  var $toggleButtons = $module.querySelectorAll('.idsk-filter-menu__toggle')
  if (!$toggleButtons)
    return

  // submit all filters
  var $submitFilters = $module.querySelectorAll('.submit-table-filter')
  if (!$submitFilters)
    return

  // all inputs for count of selected filters
  var $filterInputs = $module.querySelectorAll('.govuk-input, .govuk-select')
  if (!$filterInputs)
    return

  $toggleButtons.forEach(function ($button) {
    $button.addEventListener('click', this.handleClickTogglePanel.bind(this))
  }.bind(this))

  $submitFilters.forEach(function ($button) {
    $button.addEventListener('click', this.handleSubmitFilter.bind(this))
  }.bind(this))

  $filterInputs.forEach(function ($input) {
    $input.addEventListener('change', this.handleFilterValueChange.bind(this))
    $input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter')
        this.handleSubmitFilter(this)
    }.bind(this));
  }.bind(this))
}

/**
 * An event handler for click event on $togglePanel - collapse or expand table-filter
 * @param {object} e
 */
TableFilter.prototype.handleClickTogglePanel = function (e) {
  var $el = e.target || e.srcElement
  var $expandablePanel = $el.parentNode
  var $content = $el.nextElementSibling

  // if panel is category, change size of whole panel with animation
  if ($expandablePanel.classList.contains("idsk-table-filter__category")) {
    var $categoryParent = $expandablePanel.parentNode

    // made more fluid animations for changed spacing with transition
    var marginBottomTitle = 20
    var marginBottomExpandedCategory = 32
    var newParentHeight = ($content.style.height && $content.style.height !== "0px")
      ? parseInt($categoryParent.style.height) - $content.scrollHeight - marginBottomTitle + marginBottomExpandedCategory
      : parseInt($categoryParent.style.height) + $content.scrollHeight + marginBottomTitle - marginBottomExpandedCategory

    $categoryParent.style.height = newParentHeight + "px"
  }

  // show element after toggle with slide down animation
  toggleClass($expandablePanel, 'idsk-table-filter--expanded')
  $content.style.height = ($content.style.height && $content.style.height !== "0px" ? "0" : $content.scrollHeight) + "px";

  // set text for toggle
  $el.innerHTML = ($content.style.height === "0px" ? "Rozbaliť" : "Zbaliť") + " filter"
}

/**
 * A function to remove filter from active filters
 * @param {object} $filterToRemove
 */
TableFilter.prototype.removeActiveFilter = function ($filterToRemove) {
  var $filterToRemoveValue = this.$module.querySelector('.govuk-input[name="' + $filterToRemove.name + '"], .govuk-select[name="' + $filterToRemove.name + '"]')
  if ($filterToRemoveValue.tagName === "SELECT") {
    // if filter is select find option with empty value
    $filterToRemoveValue.querySelectorAll("option").forEach((option, i) => {
      if (option.value === "") $filterToRemoveValue.selectedIndex = i;
    });
  } else $filterToRemoveValue.value = ""

  // simulate change event of inputs to change count of active filters
  $filterToRemoveValue.dispatchEvent(new Event('change'));

  this.$activeFilters = this.$activeFilters.filter(function ($filter) {
    return $filter.id !== $filterToRemove.id;
  });

  this.renderActiveFilters(this)
}

/**
 * A function to remove all active filters
 * @param {object} e
 */
TableFilter.prototype.removeAllActiveFilters = function (e) {
  this.$activeFilters.forEach(function ($filter) {
    this.removeActiveFilter($filter)
  }.bind(this))
}

/**
 * A function to add elements to DOM object
 * @param {object} e
 */
TableFilter.prototype.renderActiveFilters = function (e) {
  // remove all existing filters from array
  var $activeFilters = this.$module.querySelector('.idsk-table-filter__active-filters .idsk-table-filter__content')
  $activeFilters.innerHTML = '';

  // render all filters in active filters
  this.$activeFilters.forEach(function ($filter) {
    var $activeFilter = document.createElement("div")
    $activeFilter.classList.add("idsk-table-filter__parameter", "govuk-body")
    $activeFilter.innerHTML = $filter.value + '<span class="idsk-table-filter__parameter-remove">✕</span>'
    $activeFilter.querySelector('.idsk-table-filter__parameter-remove').addEventListener("click", function () {
      this.removeActiveFilter($filter)
    }.bind(this))
    $activeFilters.appendChild($activeFilter)
  }.bind(this))

  // add remove everything button if some filter is activated else print none filter is activated
  if (this.$activeFilters.length > 0) {
    var $removeAllFilters = document.createElement("div")
    $removeAllFilters.classList.add("govuk-body", "govuk-link")
    $removeAllFilters.innerHTML = 'Zrušiť všetko (' + this.$activeFilters.length + ')<span class="idsk-table-filter__parameter-remove">✕</span>'
    $removeAllFilters.addEventListener("click", this.removeAllActiveFilters.bind(this))
    $activeFilters.appendChild($removeAllFilters)
  } else {
    var $info = document.createElement("div")
    $info.classList.add("govuk-body")
    $info.innerHTML = 'Žiadny filter nie je vybraný.'
    $activeFilters.appendChild($info)
  }

  // calc height of 'active filter' panel if panel is expanded
  var $activeFiltersContainer = this.$module.querySelector('.idsk-table-filter__active-filters.idsk-table-filter--expanded .idsk-table-filter__content')
  if ($activeFiltersContainer) {
    $activeFiltersContainer.style.height = "initial"; // to changing height from initial height
    $activeFiltersContainer.style.height = $activeFiltersContainer.scrollHeight + "px";
  }
}

/**
 * A function to refresh number of selected filters count
 * @param {object} e
 */
TableFilter.prototype.renderSelectedFiltersCount = function (e) {
  var submitButton = this.$module.querySelector(".submit-table-filter")
  submitButton.disabled = this.selectedFitlersCount === 0

  var counter = submitButton.querySelector(".count")
  counter.innerHTML = this.selectedFitlersCount
}

/**
 * A submit filters event on click at $submitButton or pressing enter in inputs
 * @param {object} e
 */
TableFilter.prototype.handleSubmitFilter = function (e) {
  // get all inputs and selects
  var $inputs = this.$module.querySelectorAll(".idsk-table-filter__inputs input")
  var $selects = this.$module.querySelectorAll(".idsk-table-filter__inputs select")

  // add values of inputs to $activeFilters if it is not empty
  this.$activeFilters = []
  $inputs.forEach(function ($input) {
    if ($input.value.length > 0)
      this.$activeFilters.push({
        id: $input.getAttribute('id'),
        name: $input.getAttribute('name'),
        value: $input.value
      })
  }.bind(this))

  $selects.forEach(function ($select) {
    if ($select.value)
      this.$activeFilters.push({
        id: $select.value,
        name: $select.getAttribute('name'),
        value: $select.options[$select.selectedIndex].text
      })
  }.bind(this))

  // render all filters in active filters
  this.renderActiveFilters(this)
}

/**
 * An event handler for on change event for all inputs and selects
 * @param {object} e
 */
TableFilter.prototype.handleFilterValueChange = function (e) {
  var $el = e.target || e.srcElement

  // if filter is in category get count of selected filters only from that category
  var $category = $el.closest(".idsk-table-filter__category")
  if ($category) {
    var $allCategoryFilters = $category.querySelectorAll(".idsk-table-filter__inputs input, .idsk-table-filter__inputs select")
    var selectedCategoryFiltersCount = 0
    $allCategoryFilters.forEach(function ($filter) {
      if ($filter.value)
        selectedCategoryFiltersCount++
    })
    $category.querySelector(".count").innerHTML = selectedCategoryFiltersCount ? "(" + selectedCategoryFiltersCount + ")" : ""
  }

  // get count of all selected filters
  this.selectedFitlersCount = 0
  var $allFilters = this.$module.querySelectorAll(".idsk-table-filter__inputs input, .idsk-table-filter__inputs select")
  $allFilters.forEach(function ($filter) {
    if ($filter.value)
      this.selectedFitlersCount++
  }.bind(this))

  // render count of selected filters
  this.renderSelectedFiltersCount(this)
}

export default TableFilter
