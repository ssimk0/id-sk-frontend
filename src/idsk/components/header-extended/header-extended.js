import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../../govuk/common'
import { toggleClass } from '../../common'

/**
 * Header for extended websites
 */
function HeaderExtended($module) {
    this.$module = $module;
}

HeaderExtended.prototype.init = function () {

    var $module = this.$module;
    // check for module
    if (!$module) {
        return;
    }

    // check for search component
    var $toggleSearchComponent = $module.querySelector('.idsk-header-extended__search');
    var $toggleSearchInputComponent = $module.querySelector('.idsk-header-extended__search-form input');
    if ($toggleSearchComponent && $toggleSearchInputComponent) {
        // Handle $toggleSearchComponent click and blur events
        $toggleSearchComponent.addEventListener('focus', this.handleSearchComponentClick.bind(this));
        // both blur events needed
        // if form is shown, but has not been focused, inputs blur won't be fired, then trigger this one
        $toggleSearchComponent.addEventListener('focusout', this.handleSearchComponentClick.bind(this));
        // if form is shown, and has been focused, trigger this one
        $toggleSearchInputComponent.addEventListener('focusout', this.handleSearchComponentClick.bind(this));
    }

    // check for language selector
    var $toggleLanguageSelector = $module.querySelector('.idsk-js-header-extended-language-toggle');
    if ($toggleLanguageSelector) {
        // Handle $toggleLanguageSelect click events
        $toggleLanguageSelector.addEventListener('focus', this.handleLanguageSelectorClick.bind(this));
        $toggleLanguageSelector.addEventListener('blur', this.handleLanguageSelectorClick.bind(this));
    }

    // check for menu items
    var $menuItems = $module.querySelectorAll('.idsk-header-extended__link');
    if ($menuItems) {
        // Handle $menuItem click events
        nodeListForEach($menuItems, function ($menuItem) {
            $menuItem.addEventListener('click', this.handleSubmenuClick.bind(this));
        }.bind(this))
    }

    // check for menu button and x-mark button
    var $hamburgerMenuButton = $module.querySelector('.idsk-js-header-extended-side-menu');
    var $xMarkMenuButton = $module.querySelector('.idsk-header-extended-x-mark');
    if ($hamburgerMenuButton && $xMarkMenuButton) {
        $hamburgerMenuButton.addEventListener('click', this.handleMobilMenu.bind(this));
        $xMarkMenuButton.addEventListener('click', this.handleMobilMenu.bind(this));
    }

    window.addEventListener('scroll', this.scrollFunction.bind(this));

    $module.boundCheckBlurMenuItemClick = this.checkBlurMenuItemClick.bind(this);
}

/**
 * Handle focus/blur on search component - show/hide search form, hide/show search text wrapper
 * @param {object} e 
 */
HeaderExtended.prototype.handleSearchComponentClick = function (e) {
    var $el = e.target || e.srcElement;
    var $target = $el.closest('.idsk-header-extended__search');
    var $relatedTarget = e.relatedTarget ? (e.relatedTarget).closest('.idsk-header-extended__search-form') : e.relatedTarget;
    var $searchForm = $target.querySelector('.idsk-header-extended__search-form');
    if (e.type === 'focus') {
        $target.classList.add('idsk-header-extended__search--active')
    } else if (e.type === 'focusout' && $relatedTarget !== $searchForm) {
        $target.classList.remove('idsk-header-extended__search--active')
    }
}

/**
 * Handle open/hide language switcher
 * @param {object} e 
 */
HeaderExtended.prototype.handleLanguageSelectorClick = function (e) {
    var $toggleButton = e.target || e.srcElement;
    var $target = $toggleButton.closest('.idsk-header-extended__language');
    toggleClass($target, 'idsk-header-extended__language--active');
}

/**
 * Handle open/hide submenu
 * @param {object} e 
 */
HeaderExtended.prototype.handleSubmenuClick = function (e) {
    var $srcEl = e.target || e.srcElement;
    var $toggleButton = $srcEl.closest('.idsk-header-extended__navigation-item');
    var $currActiveList = this.$module.querySelectorAll('.idsk-header-extended__navigation-item--active');

    if ($currActiveList.length > 0) {
        $currActiveList[0].classList.remove('idsk-header-extended__navigation-item--active');
    }
    toggleClass($toggleButton, 'idsk-header-extended__navigation-item--active');

    document.addEventListener('click', this.$module.boundCheckBlurMenuItemClick, true);
}

/**
 * handle click outside menu or "blur" the item link
 */
HeaderExtended.prototype.checkBlurMenuItemClick = function () {
    var $currActiveList = this.$module.querySelectorAll('.idsk-header-extended__navigation-item--active');
    $currActiveList[0].classList.remove('idsk-header-extended__navigation-item--active');
    document.removeEventListener('click', this.$module.boundCheckBlurMenuItemClick, true);
}

/**
 * Show/hide mobil menu
 * @param {object} e
 */
HeaderExtended.prototype.handleMobilMenu = function (e) {
    toggleClass(this.$module, "idsk-header-extended--show-mobile-menu")
}

/**
 * When the user scrolls down from the top of the document, resize the navbar's padding and the logo
 */
HeaderExtended.prototype.scrollFunction = function () {
    var $module = this.$module;

    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $module.classList.add('idsk-header-extended--shrink');
    } else if (document.body.scrollTop < 10 && document.documentElement.scrollTop < 10) {
        $module.classList.remove('idsk-header-extended--shrink');
    }
}

export default HeaderExtended