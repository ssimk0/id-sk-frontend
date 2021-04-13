import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../../govuk/common'

function Graph($module) {
    this.$module = $module
}

Graph.prototype.init = function () {
    // Check for module
    var $module = this.$module
    if (!$module) {
        return
    }

    var $radioBtn = $module.querySelector('.idsk-graph__radio')
    var $radiosName = $radioBtn.getAttribute('name')
    var $selectedControlOption = $module.querySelector('input[name="' + $radiosName + '"]:checked').value
    this.handleRadioButtonModeClick($selectedControlOption)

    var $radioOptions = $module.querySelectorAll('.idsk-graph__radio');
    if ($radioOptions) {
        nodeListForEach($radioOptions, function ($radioOption) {
            $radioOption.addEventListener('change', this.handleRadioButtonModeClick.bind(this))
        }.bind(this))
    }

    var $shareButtonByCopyToClickboard = $module.querySelector('.idsk-graph__copy-to-clickboard')
    if ($shareButtonByCopyToClickboard) {
        $shareButtonByCopyToClickboard.addEventListener('click', this.handleShareByCopyToClickboardClick.bind(this))
    }

    var $shareButtonByEmail = $module.querySelector('.idsk-graph__send-link-by-email')
    if ($shareButtonByEmail) {
        $shareButtonByEmail.addEventListener('click', this.handleShareByEmailClick.bind(this))
    }

    var $shareButtonByFacebook = $module.querySelector('.idsk-graph__share-on-facebook')
    if ($shareButtonByFacebook) {
        $shareButtonByFacebook.addEventListener('click', this.handleShareByFacebook.bind(this))
    }

    var $dropdownLinks = $module.querySelectorAll('.idsk-graph__meta-link-list')
    if ($dropdownLinks) {
        nodeListForEach($dropdownLinks, function ($dropdownLink) {
            $dropdownLink.addEventListener('click', this.handleDropdownLinkClick.bind(this))
        }.bind(this))

        $module.boundCheckDropdownOutsideClick = this.checkDropdownOutsideClick.bind(this);
    }

    var $tabs = $module.querySelectorAll('.govuk-tabs__tab')
    if ($tabs) {
        nodeListForEach($tabs, function ($tab) {
            $tab.addEventListener('click', this.handleTabLinkClick.bind(this))
        }.bind(this))

        var $activeTab = $module.querySelector('.govuk-tabs__tab[href="' + window.location.hash + '"]') || $tabs[0]
        this.showTab($activeTab)
    }

}

/**
 * Handle click on radio buttons
 * @param {object} e 
 */
Graph.prototype.handleRadioButtonModeClick = function (e) {
    var $el = e.target || e.srcElement;

    if (!$el) {
        return
    }

    var $value = $el.getAttribute('value')
    var $iframeGraphs = this.$module.querySelectorAll('.idsk-graph__iframe')
    $iframeGraphs.forEach(function ($iframeGraph) {
        var $iframeSrc = $iframeGraph.dataset.src
        var $srcParam = $iframeSrc.indexOf('?') < 0 ? `?type=${$value}` : `&type=${$value}`
        $iframeGraph.src = $iframeSrc + $srcParam
    })
}

/**
 * Handle click on copy link to clickboard
 * @param {object} e 
 */
Graph.prototype.handleShareByCopyToClickboardClick = function (e) {
    var textarea = document.createElement('textarea');
    textarea.textContent = location.href;
    textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();

    try {
        return document.execCommand('copy');  // Security exception may be thrown by some browsers.
    } catch (ex) {
        return false;
    } finally {
        document.body.removeChild(textarea);
    }
}

/**
 * Handle click on share link by email
 * @param {object} e 
 */
Graph.prototype.handleShareByEmailClick = function (e) {
    var $el = e.target || e.srcElement;
    var $module = this.$module
    var $subject = $module.querySelector('.idsk-graph__title h2').innerText
    var $body = 'Kliknite na odkaz vyššie alebo ho skopírujte a vložte do prehliadača: ' + location.href
    var $mailto = `mailto:?Subject=${$subject}&body=${$body}`

    $el.href = $mailto
}

/**
 * Handle click on share by facebook link
 * @param {object} e 
 */
Graph.prototype.handleShareByFacebook = function (e) {
    var $el = e.target || e.srcElement;
    var $shareLink = 'https://www.facebook.com/sharer/sharer.php?u=' + location.href

    $el.href = $shareLink
}

/**
 * Handle click on link and show drop down list
 * @param {object} e 
 */
Graph.prototype.handleDropdownLinkClick = function (e) {
    e.preventDefault()
    var $el = e.target || e.srcElement;
    var $module = this.$module
    var $dropdownLists = $module.querySelectorAll('.idsk-graph__meta-list')
    var $displayValue = window.getComputedStyle($el.nextElementSibling, null).display;

    $dropdownLists.forEach(function ($dropdownList) {
        $dropdownList.style.display = 'none'
    })
    $el.nextElementSibling.style.display = $displayValue == 'block' ? 'none' : 'block'

    document.addEventListener('click', this.$module.boundCheckDropdownOutsideClick, true);
}

/**
 * handle click outside dropdown menu
 */
Graph.prototype.checkDropdownOutsideClick = function () {
    var $module = this.$module
    var $dropdownLists = $module.querySelectorAll('.idsk-graph__meta-list')
    $dropdownLists.forEach(function ($dropdownList) {
        $dropdownList.style.display = 'none'
    })
    document.removeEventListener('click', $module.boundCheckDropdownOutsideClick, false);
}

/**
 * Handle click on Tab -> show related section
 * @param {object} e 
 */
Graph.prototype.handleTabLinkClick = function (e) {
    var $tab = e.target || e.srcElement;
    var $module = this.$module
    var $activePanel = $module.querySelector('.idsk-graph__section-show')
    var $activePanelId = $activePanel.getAttribute('id')
    var $activeTabLink = $module.querySelector(`a[href="#${$activePanelId}"]`)
    var $activeTabLi = $activeTabLink.closest('.govuk-tabs__list-item')

    $activePanel.classList.remove('idsk-graph__section-show')
    $activeTabLi.classList.remove('idsk-graph__section--selected')

    this.showTab($tab)
}

/**
 * Show section based on tab
 * @param {object} $tab 
 */
Graph.prototype.showTab = function ($tab) {
    var $href = $tab.getAttribute('href')
    var $hash = $href.slice($href.indexOf('#'), $href.length)
    var $hash = $href.slice($href.indexOf('#'), $href.length)
    var $panel = this.$module.querySelector($hash)
    var $tabLi = $tab.closest('.govuk-tabs__list-item')

    $tabLi.classList.add('idsk-graph__section--selected')
    $panel.classList.add('idsk-graph__section-show')
}

export default Graph