import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation


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
        $link.addEventListener('click', this.handleClick.bind(this))
    })
}

/**
* An event handler for click event on $link - remove current active state and add them to the new one
* @param {object} event event
*/
InPageNavigation.prototype.handleClick = function (event) {

    let $module = this.$module
    let $link = event.target || event.srcElement
    let $items = $module.querySelectorAll('.idsk-in-page-navigation__list-item')
    let $currentLink = $module.querySelector('.idsk-in-page-navigation__current-link')

    $items.forEach($item => {
        $item.classList.remove('idsk-in-page-navigation__list-item--active')
    })
    $link.closest('li.idsk-in-page-navigation__list-item').classList.add('idsk-in-page-navigation__list-item--active')
    $currentLink.innerText = $link.innerText;
}

export default InPageNavigation
