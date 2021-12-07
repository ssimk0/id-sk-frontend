import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normalization
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

    var $radioButtonsInput = $module.querySelectorAll('.idsk-search-results__filter .govuk-radios__input ')
    if (!$radioButtonsInput) {
        return
    }

    var $contentTypeCheckBoxes = $module.querySelectorAll('.idsk-search-results__filter .govuk-checkboxes__input ')
    if (!$contentTypeCheckBoxes) {
        return
    }

    $radioButtonsInput.forEach(function ($input) {
        $input.addEventListener('click', this.handleClickRadioButton.bind(this), true)
    }.bind(this))

    $contentTypeCheckBoxes.forEach(function ($checkBox) {
        $checkBox.addEventListener('click', this.handleClickContentTypeCheckBox.bind(this), true)
    }.bind(this))

    $linkPanelButtons.forEach(function ($button) {
        $button.addEventListener('click', this.handleClickLinkPanel.bind(this))
    }.bind(this))
}

SearchResultsFilter.prototype.handleClickRadioButton = function (e) {
    var $el = e.target || e.srcElement
    var $linkPanelButton = $el.closest('.idsk-search-results__link-panel')
    var $buttonCaption = $linkPanelButton.querySelector('.idsk-search-results__link-panel--span')

    $buttonCaption.innerText = '1 vybraté'
}

SearchResultsFilter.prototype.handleClickContentTypeCheckBox = function (e) {
    var $el = e.target || e.srcElement
    var $linkPanelButton = $el.closest('.idsk-search-results__link-panel')
    var $checkBoxes = $el.closest('.govuk-checkboxes')

    this.handleCountOfPickedContentTypes.call(this, $checkBoxes, $linkPanelButton);
}

SearchResultsFilter.prototype.handleCountOfPickedContentTypes = function ($checkBoxes, $linkPanelButton) {
    var $buttonCaption = $linkPanelButton.querySelector('.idsk-search-results__link-panel--span')
    var $counter = 0

    if ($checkBoxes) {
        $checkBoxes.querySelectorAll('.govuk-checkboxes__input').forEach(function ($checkBox) {
            if ($checkBox.checked) {
                $counter = $counter + 1
            }
        }.bind(this))
    }
    if ($counter == 0) {
        $buttonCaption.innerText = ''
    } else {
        $buttonCaption.innerText = $counter + ' vybraté'
    }
}

SearchResultsFilter.prototype.handleSearchItemsFromInput = function ($type, e) {
    var $el = e.target || e.srcElement
    var $linkPanelButton = $el.closest('.idsk-search-results__link-panel')
    var $items = $linkPanelButton.querySelectorAll('.govuk-' + $type + '__item')
    $items.forEach(function ($item) {
        $item.classList.remove('idsk-search-results--invisible')
    }.bind(this))
    $items.forEach(function ($item) {
        var $labelItem = $item.querySelector('.govuk-' + $type + '__label')

        if (!$labelItem.innerText.toLowerCase().includes($el.value.toLowerCase())) {
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
