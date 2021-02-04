import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach, toggleClass } from '../../common'

function InPageNavigation($module) {
    this.$module = $module
}

InPageNavigation.prototype.init = function () {
    // Check for module
    var $module = this.$module
    if (!$module) {
        return
    }

    // Check for button
    var $links = $module.querySelectorAll('.idsk-in-page-navigation__link')
    if (!$links) {
        return
    }

    // list of all ids and titles
    this.$arrTitlesAndElems = []
    // Handle $link click events
    $links.forEach($link => {
        var $item = {}
        $item.el = document.getElementById($link.href.split('#')[1])
        this.$arrTitlesAndElems.push($item)
        $link.addEventListener('click', this.handleClickLink.bind(this))
    })

    var $linkPanelButton = $module.querySelector('.idsk-in-page-navigation__link-panel')
    if (!$linkPanelButton) {
        return
    }
    $linkPanelButton.addEventListener('click', this.handleClickLinkPanel.bind(this))

    // Handle floating navigation
    window.addEventListener('scroll', this.scrollFunction.bind(this));
}

/**
* An event handler for click event on $link - add actual title to link panel
* @param {object} event event
*/
InPageNavigation.prototype.handleClickLink = function (event) {
    let $link = event.target || event.srcElement
    this.changeCurrentLink($link.closest('.idsk-in-page-navigation__list-item'))
}

/**
* An event handler for click event on $linkPanel - collapse or expand in page navigation menu
 * @param {object} event 
 */
InPageNavigation.prototype.handleClickLinkPanel = function (event) {
    var $module = this.$module
    toggleClass($module, 'idsk-in-page-navigation--expand')
}

/**
 * When the user scrolls down from the top of the document, set position to fixed
 */
InPageNavigation.prototype.scrollFunction = function () {
    var $module = this.$module
    var $arrTitlesAndElems = this.$arrTitlesAndElems
    var $parentModule = $module.parentElement
    var $navTopPosition = $parentModule.offsetTop - 55 // padding
    let $links = $module.querySelectorAll('.idsk-in-page-navigation__list-item')

    if (window.pageYOffset <= $navTopPosition) {
        $module.classList.remove("idsk-in-page-navigation--sticky")
    } else {
        $module.classList.add("idsk-in-page-navigation--sticky")
    }

    if ($module.classList.contains("idsk-in-page-navigation--sticky")) {
        var $self = this;
        $arrTitlesAndElems.some(function($item, $index) {
            if ($item.el.offsetTop >= window.scrollY && $item.el.offsetTop <= (window.scrollY + window.innerHeight)) {
                $self.changeCurrentLink($links[$index])

                return true
            }
        })
    } else {
        this.changeCurrentLink($links[0])
    }
}

InPageNavigation.prototype.changeCurrentLink = function (el) {
    var $module = this.$module
    var $items = $module.querySelectorAll('.idsk-in-page-navigation__list-item')
    var $linkPanelText = $module.querySelector('.idsk-in-page-navigation__link-panel-button')

    $items.forEach($item => {
        $item.classList.remove('idsk-in-page-navigation__list-item--active')
    })
    el.classList.add('idsk-in-page-navigation__list-item--active')
    $linkPanelText.innerText = el.querySelector('.idsk-in-page-navigation__link-title').innerText;
}

export default InPageNavigation
