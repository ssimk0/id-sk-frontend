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

    // list of all ids and titles
    this.$arrTitlesAndElems = []
    // Handle $link click events
    $links.forEach(function ($link) {
        var $item = {}
        $item.el = document.getElementById($link.href.split('#')[1])
        this.$arrTitlesAndElems.push($item)
        $link.addEventListener('click', this.handleClickLink.bind(this))
    }.bind(this))

    var $linkPanelButtons = $module.querySelectorAll('.idsk-search-results__link-panel-button')
    if (!$linkPanelButtons) {
        return
    }

    var $radioButtons = $module.querySelectorAll('.govuk-radios__label')
    var $radioButtonsInput = $module.querySelectorAll('.govuk-radios__input ')
    if (!$radioButtons) {
        return
    }

    $module.boundHandleClickLinkPanel = this.handleClickLinkPanel.bind(this)

    $linkPanelButtons.forEach(function ($button) {
        $button.addEventListener('click', $module.boundHandleClickLinkPanel, true)
    }.bind(this))

    $radioButtons.forEach(function ($radio) {
        $radio.addEventListener('click', this.handleClickRadioButton.bind(this), true)
    }.bind(this))


    // nodeListForEach(
    //     $items,
    //     function ($item) {
    //       $item.addEventListener("click", this.handleItemClick.bind(this));
    //     }.bind(this)
    //   );


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
    console.log($module)
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

    var $filerPicked = $module.querySelector('.idsk-search-results__content__picked-filters__topics')

    // creating or renaming new span element 
    if ($el.value && !$filerPicked.querySelector('.idsk-search-results__picked-topic')) {
        var $topicPicked = document.createElement('span')
        $topicPicked.setAttribute('class', 'idsk-search-results__picked-topic')
        $topicPicked.innerHTML = $el.value + ' &#10005;';
        $filerPicked.appendChild($topicPicked);
    } else if ($filerPicked.querySelector('.idsk-search-results__picked-topic')) {
        $filerPicked.querySelector('.idsk-search-results__picked-topic').innerHTML = $el.value + ' &#10005;';
    }


    $buttonCaption.innerText = '1 vybraté'
    // toggleClass($contentPanel, 'idsk-search-results--hidden')
    // toggleClass($linkPanelButton, 'idsk-search-results--expand')
}

// SearchResults.prototype.changeCurrentLink = function (el) {
//     var $module = this.$module
//     var $currItem = el.closest('.idsk-in-page-navigation__list-item')
//     var $articleTitle = $currItem.querySelector('.idsk-in-page-navigation__link-title')
//     var $items = $module.querySelectorAll('.idsk-in-page-navigation__list-item')
//     var $linkPanelText = $module.querySelector('.idsk-in-page-navigation__link-panel-button')

//     $items.forEach(function ($item) {
//         $item.classList.remove('idsk-in-page-navigation__list-item--active')
//     })
//     $currItem.classList.add('idsk-in-page-navigation__list-item--active')
//     $linkPanelText.innerText = $articleTitle.innerText
// }

export default SearchResults
