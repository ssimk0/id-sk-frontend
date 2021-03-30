import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach, toggleClass } from "../../common";

function SearchResults($module) {
    this.$module = $module
}

SearchResults.prototype.init = function () {
    // Check for module
    var $module = this.$module
    $module.resultCards = new Array();
    $module.countOfCardsPerPage = new Number();
    $module.currentPageNumber = new Number();
    $module.subTopicButton = $module.querySelector('.idsk-search-results__subtopic')

    $module.subTopicButton.disabled = true

    if (!$module) {
        return
    }

    // Check for button
    var $links = $module.querySelectorAll('.idsk-search-results__link')
    if (!$links) {
        return
    }

    var $resultsPerPageDropdown = $module.querySelector('.idsk-search-results__content .govuk-select')
    if (!$resultsPerPageDropdown) {
        return
    }

    var $backButton = $module.querySelector('.idsk-search-results__button--back')
    if (!$backButton) {
        return
    }

    var $forwardButton = $module.querySelector('.idsk-search-results__button--forward')
    if (!$forwardButton) {
        return
    }

    $module.resultCards = $module.querySelectorAll('.idsk-search-results__card')
    if (!$module.resultCards) {
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

    $backButton.addEventListener('click', this.handleClickPreviousPage.bind(this))
    $forwardButton.addEventListener('click', this.handleClickNextPage.bind(this))
    $module.boundHandleClickLinkPanel = this.handleClickLinkPanel.bind(this)

    // set selected value in dropdown
    $resultsPerPageDropdown.value = 10
    $module.countOfCardsPerPage = $resultsPerPageDropdown.value
    $module.currentPageNumber = 1
    this.showResultCardsPerPage.call(this, 0, $resultsPerPageDropdown.value)
    $resultsPerPageDropdown.addEventListener('change', this.handleClickResultsPerPageDropdown.bind(this))


    $linkPanelButtons.forEach(function ($button) {
        $button.addEventListener('click', $module.boundHandleClickLinkPanel, true)
    }.bind(this))

    $radioButtonsInput.forEach(function ($input) {
        $input.addEventListener('click', this.handleClickRadioButton.bind(this), true)
    }.bind(this))
}

SearchResults.prototype.handleClickPreviousPage = function (e) {
    var $el = e.target || e.srcElement
    var $module = this.$module

    $module.currentPageNumber = $module.currentPageNumber - 1
    this.showResultCardsPerPage.call(this, $module.countOfCardsPerPage * ($module.currentPageNumber - 1), $module.countOfCardsPerPage * $module.currentPageNumber);
}

SearchResults.prototype.handleClickNextPage = function (e) {
    var $el = e.target || e.srcElement
    var $module = this.$module

    $module.currentPageNumber = $module.currentPageNumber + 1
    this.showResultCardsPerPage.call(this, $module.countOfCardsPerPage * ($module.currentPageNumber - 1), $module.countOfCardsPerPage * $module.currentPageNumber);
}

SearchResults.prototype.handleClickResultsPerPageDropdown = function (e) {
    var $el = e.target || e.srcElement
    var $module = this.$module

    $module.countOfCardsPerPage = $el.value
    this.showResultCardsPerPage.call(this, 0, $el.value);
}

/**
 * function for changing number of cards on page
 * 
 */
SearchResults.prototype.showResultCardsPerPage = function ($startIndex, $endIndex) {
    var $module = this.$module
    var $backButton = $module.querySelector('.idsk-search-results__button--back')
    var $forwardButton = $module.querySelector('.idsk-search-results__button--forward')
    var $pageNumber = $module.querySelector('.idsk-search-results__page-number')

    //hide all cards
    $module.resultCards.forEach(function ($card) {
        if (!$card.classList.contains('idsk-search-results--invisible')) {
            $card.classList.add('idsk-search-results--invisible')
        }
    }.bind(this))

    if ($endIndex >= $module.resultCards.length) {
        $endIndex = $module.resultCards.length
        $forwardButton.classList.add('idsk-search-results--invisible')
        $backButton.classList.remove('idsk-search-results--invisible')
    } else {
        $forwardButton.classList.remove('idsk-search-results--invisible')
    }

    var $i;
    if ($startIndex < 0) {
        $startIndex = 0
    }
    for ($i = $startIndex; $i < $endIndex; $i++) {
        $module.resultCards[$i].classList.remove('idsk-search-results--invisible')
    }

    // hide back button if 1st page is showed
    if ($startIndex == 0 && !$backButton.classList.contains('idsk-search-results--invisible')) {
        $backButton.classList.add('idsk-search-results--invisible')
    }

    var $numberOfPages = (($module.resultCards.length / $module.countOfCardsPerPage) | 0) + 1
    $pageNumber.innerText = 'Strana ' + $module.currentPageNumber + ' z ' + $numberOfPages
}

/**
 * An event handler for click event on $linkPanel - collapse or expand in page navigation menu
 * @param {object} e 
 */
SearchResults.prototype.handleClickLinkPanel = function (e) {
    var $el = e.target || e.srcElement
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
    var $radios = $el.closest('.govuk-radios')

    // creating or renaming new span element for picked topic
    if ($el.value && !$filterContainer) {
        var $topicPicked = this.createTopicInContainer.call(this, $choosenFiltersContainer, $radios, $el);
        $module.subTopicButton.disabled = false;
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
    var $choosenFiltersContainer = this.$module.querySelector('.idsk-search-results__content__picked-filters__topics')

    if ($el.dataset.source == 'tema') {
        var $subTopic = $choosenFiltersContainer.querySelector('[data-source="podtema"]')
        if ($subTopic) {
            this.removeTopic.call(this, $subTopic, true);
        } else {
            this.$module.subTopicButton.parentElement.classList.remove('idsk-search-results--expand')
            var $contentPanel = this.$module.subTopicButton.parentElement.querySelector('.idsk-search-results__list')
            $contentPanel.classList.add('idsk-search-results--hidden')
            this.$module.subTopicButton.disabled = true;
        }
    }

    this.removeTopic.call(this, $el, false);
}

SearchResults.prototype.removeTopic = function ($el, $disableFilter) {
    var $radios = this.$module.querySelector('[data-id="' + $el.dataset.source + '"]')
    var $buttonCaption = $radios.closest('.idsk-search-results__link-panel')

    $buttonCaption.querySelector('.idsk-search-results__link-panel--span').innerText = ''
    $radios.querySelectorAll('.govuk-radios__input').forEach(function ($radio) {
        $radio.checked = false
    }.bind(this))

    if ($disableFilter) {
        this.$module.subTopicButton.parentElement.classList.remove('idsk-search-results--expand')
        var $contentPanel = this.$module.subTopicButton.parentElement.querySelector('.idsk-search-results__list')
        $contentPanel.classList.add('idsk-search-results--hidden')
        this.$module.subTopicButton.disabled = true;
    }

    $el.remove();
}

export default SearchResults
