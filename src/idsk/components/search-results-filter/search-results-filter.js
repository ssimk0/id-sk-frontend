import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { toggleClass } from "../../common";

function SearchResultsFilter($module) {
    this.$module = $module
}

SearchResultsFilter.prototype.init = function () {
    // Check for module
    var $module = this.$module
    if (!$module) {
        return
    }

    var $linkPanelButtons = $module.querySelectorAll('.idsk-search-results__link-panel-button')
    if (!$linkPanelButtons) {
        return
    }

    var $topicSearchInput = $module.querySelector('#idsk-search-input__topic')
    if ($topicSearchInput) {
        $topicSearchInput.addEventListener('keyup', this.handleSearchItemsFromInput.bind(this, 'radios'))
    }

    var $subtopicSearchInput = $module.querySelector('#idsk-search-input__subtopic')
    if ($subtopicSearchInput) {
        $subtopicSearchInput.addEventListener('keyup', this.handleSearchItemsFromInput.bind(this, 'radios'))
    }

    var $contentTypeSearchInput = $module.querySelector('#idsk-search-input__content-type')
    if ($contentTypeSearchInput) {
        $contentTypeSearchInput.addEventListener('keyup', this.handleSearchItemsFromInput.bind(this, 'checkboxes'))
    }

    $linkPanelButtons.forEach(function ($button) {
        $button.addEventListener('click', this.handleClickLinkPanel.bind(this))
    }.bind(this))
}

SearchResultsFilter.prototype.handleSearchItemsFromInput = function ($type, e) {
    var $el = e.target || e.srcElement
    var $linkPanelButton = $el.closest('.idsk-search-results__link-panel')
    var $items = $linkPanelButton.querySelectorAll('.govuk-' + $type + '__item')
    $items.forEach(function ($item) {
        $item.classList.remove('idsk-search-results--invisible')
    }.bind(this))
    $items.forEach(function ($item) {
        if ($el.value == '') {
            $item.classList.remove('idsk-search-results--invisible')
        } else if (!$item.querySelector('.govuk-' + $type + '__label').innerText.toLowerCase().includes($el.value.toLowerCase())) {
            $item.classList.add('idsk-search-results--invisible')
        }
    }.bind(this))
}

/**
 * An event handler for click event on $linkPanel - collapse or expand filter
 * @param {object} e 
 */
SearchResultsFilter.prototype.handleClickLinkPanel = function (e) {
    var $el = e.target || e.srcElement
    var $linkPanelButton = $el.closest('.idsk-search-results__link-panel')
    var $contentPanel = $linkPanelButton.querySelector('.idsk-search-results__list')

    toggleClass($contentPanel, 'idsk-search-results--hidden')
    toggleClass($linkPanelButton, 'idsk-search-results--expand')
}

export default SearchResultsFilter
