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
    var $iframeGraphs = this.$module.querySelectorAll('.idsk-graph__iframe-graph')
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
    $el.nextElementSibling.style.display = "block"
}

export default Graph