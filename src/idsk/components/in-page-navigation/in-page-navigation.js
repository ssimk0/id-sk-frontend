import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { toggleClass } from '../../common'

function InPageNavigation($module) {
    this.$module = $module
}

InPageNavigation.prototype.init = function () {
    // Check for module
    let $module = this.$module
    if (!$module) {
        return
    }

    // Check for button
    let $links = $module.querySelectorAll('.idsk-in-page-navigation__link')
    if (!$links) {
        return
    }

    // Handle $link click events
    $links.forEach($link => {
        $link.addEventListener('click', this.handleClickLink.bind(this))
    })

    let $linkPanelButton = $module.querySelector('.idsk-in-page-navigation__link-panel')
    if (!$linkPanelButton) {
        return
    }
    $linkPanelButton.addEventListener('click', this.handleClickLinkPanel.bind(this))

}

/**
* An event handler for click event on $link - add actual title to link panel
* @param {object} event event
*/
InPageNavigation.prototype.handleClickLink = function (event) {

    let $module = this.$module
    let $link = event.target || event.srcElement
    let $items = $module.querySelectorAll('.idsk-in-page-navigation__list-item')
    let $linkPanelText = $module.querySelector('.idsk-in-page-navigation__link-panel-button')

    $items.forEach($item => {
        $item.classList.remove('idsk-in-page-navigation__list-item--active')
    })
    $link.closest('li.idsk-in-page-navigation__list-item').classList.add('idsk-in-page-navigation__list-item--active')
    $linkPanelText.innerText = $link.innerText;
}

/**
* An event handler for click event on $linkPanel - collapse or expand in page navigation menu
 * @param {object} event 
 */
InPageNavigation.prototype.handleClickLinkPanel = function (event) {

    let $module = this.$module
    let $list = $module.querySelector('.idsk-in-page-navigation__list')
    toggleClass($list, 'idsk-in-page-navigation__list--expand')
}

export default InPageNavigation
