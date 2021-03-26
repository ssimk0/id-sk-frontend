import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach, toggleClass } from "../../common";

function SearchResults($module) {
    this.$module = $module
}

SearchResults.prototype.init = function () {
    // Check for module
    var $module = this.$module
    if (!$module) {
        return
    }

    // Check for button
    var $links = $module.querySelectorAll('.idsk-search-results__link')
    if (!$links) {
        return
    }

    var $linkPanelButtons = $module.querySelectorAll('.idsk-search-results__link-panel-button')
    if (!$linkPanelButtons) {
        return
    }

    var $radioButtonsInput = $module.querySelectorAll('.govuk-radios__input ')
    if (!$radioButtonsInput) {
        return
    }

    $module.boundHandleClickLinkPanel = this.handleClickLinkPanel.bind(this)

    $linkPanelButtons.forEach(function ($button) {
        $button.addEventListener('click', $module.boundHandleClickLinkPanel, true)
    }.bind(this))

    $radioButtonsInput.forEach(function ($input) {
        $input.addEventListener('click', this.handleClickRadioButton.bind(this), true)
    }.bind(this))

    // Handle case if the viewport is shor and there are more than one article - scrolling is not needed, but navigation pointer has to be updated
    this.$module.labelChanged = false
}

/**
 * An event handler for click event on $linkPanel - collapse or expand in page navigation menu
 * @param {object} e 
 */
SearchResults.prototype.handleClickLinkPanel = function (e) {
    var $el = e.target || e.srcElement
    var $module = this.$module
    var $linkPanelButton = $el.closest('.idsk-search-results__link-panel')
    var $contentPanel = $linkPanelButton.querySelector('.idsk-search-results__list')

    toggleClass($contentPanel, 'idsk-search-results--hidden')
    toggleClass($linkPanelButton, 'idsk-search-results--expand')
}

/**
 * An event handler for click event on radio button
 * @param {object} e 
 */
SearchResults.prototype.handleClickRadioButton = function (e) {
    var $el = e.target || e.srcElement
    var $module = this.$module
    var $linkPanelButton = $el.closest('.idsk-search-results__link-panel')
    var $buttonCaption = $linkPanelButton.querySelector('.idsk-search-results__link-panel--span')

    var $choosenFiltersContainer = $module.querySelector('.idsk-search-results__content__picked-filters__topics')
    var $filterContainer = $choosenFiltersContainer.querySelector('.idsk-search-results__picked-topic')

    console.log($filterContainer)

    var $radios = $el.closest('.govuk-radios')

    // creating or renaming new span element for picked topic


    if ($el.value && !$filterContainer) {
        var $topicPicked = this.createTopicInContainer.call(this, $choosenFiltersContainer, $radios, $el);
    } else if ($filterContainer.dataset.source == $radios.dataset.id) {
        $topicPicked = $choosenFiltersContainer.querySelector('.idsk-search-results__picked-topic');
        $topicPicked.innerHTML = $el.value + ' &#10005;';
    } else if ($filterContainer.dataset.source != $radios.dataset.id) {
        var $topicPicked = this.createTopicInContainer.call(this, $choosenFiltersContainer, $radios, $el);
    }

    $topicPicked.removeEventListener('click', this.handleRemovePickedTopic.bind(this), true);
    $topicPicked.addEventListener('click', this.handleRemovePickedTopic.bind(this));

    $buttonCaption.innerText = '1 vybraté'
}

SearchResults.prototype.createTopicInContainer = function ($choosenFiltersContainer, $radios, $el) {
    var $topicPicked = document.createElement('span')
    $topicPicked.setAttribute('class', 'idsk-search-results__picked-topic')
    $topicPicked.setAttribute('data-source', $radios.dataset.id)
    $topicPicked.innerHTML = $el.value + ' &#10005;';
    $choosenFiltersContainer.appendChild($topicPicked);

    return $topicPicked
}

SearchResults.prototype.handleRemovePickedTopic = function (e) {
    var $el = e.target || e.srcElement
    var $radios = this.$module.querySelector('[data-id="' + $el.dataset.source + '"]')
    var $buttonCaption = $radios.closest('.idsk-search-results__link-panel')

    $buttonCaption.querySelector('.idsk-search-results__link-panel--span').innerText = ''
    $radios.querySelectorAll('.govuk-radios__input').forEach(function ($radio) {
        $radio.checked = false
    }.bind(this))

    $el.remove();
}


export default SearchResults
