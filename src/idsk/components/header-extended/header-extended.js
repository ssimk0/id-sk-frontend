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
    var $searchComponents = $module.querySelectorAll('.idsk-header-extended__search');
    if ($searchComponents) {
        nodeListForEach($searchComponents, function ($searchComponent) {
            $searchComponent.addEventListener('change', this.handleSearchChange.bind(this))
            // trigger change event
            $searchComponent.dispatchEvent(new Event('change'));
        }.bind(this))
    }

    // check for language switcher
    var $toggleLanguageSwitchers = $module.querySelectorAll('.idsk-header-extended__language-button');
    if ($toggleLanguageSwitchers) {
        // Handle $toggleLanguageSwitcher click events
        nodeListForEach($toggleLanguageSwitchers, function ($toggleLanguageSwitcher) {
            $toggleLanguageSwitcher.addEventListener('click', this.handleLanguageSwitcherClick.bind(this));
            $toggleLanguageSwitcher.addEventListener('focus', this.handleLanguageSwitcherClick.bind(this));
        }.bind(this))

        // close language list if i left the last item from langauge list e.g. if user use tab key for navigations
        var $lastLanguageItems = $module.querySelectorAll('.idsk-header-extended__language-list-item:last-child .idsk-header-extended__language-list-link');
        nodeListForEach($lastLanguageItems, function ($lastLanguageItem) {
            $lastLanguageItem.addEventListener('blur', this.checkBlurLanguageSwitcherClick.bind(this));
        }.bind(this))

    }

    // check for menu items
    var $menuItems = $module.querySelectorAll('.idsk-header-extended__link');
    if ($menuItems) {
        // Handle $menuItem click events
        nodeListForEach($menuItems, function ($menuItem) {
            $menuItem.addEventListener('click', this.handleSubmenuClick.bind(this));
            $menuItem.addEventListener('focus', this.handleSubmenuClick.bind(this));
        }.bind(this))
    }

    // check for menu button and close menu button
    var $hamburgerMenuButton = $module.querySelector('.idsk-js-header-extended-side-menu');
    var $closeMenuButton = $module.querySelector('.idsk-header-extended__mobile-close');
    if ($hamburgerMenuButton && $closeMenuButton) {
        $hamburgerMenuButton.addEventListener('click', this.showMobilMenu.bind(this));
        $closeMenuButton.addEventListener('click', this.hideMobilMenu.bind(this));
    }

    window.addEventListener('scroll', this.scrollFunction.bind(this));

    $module.boundCheckBlurMenuItemClick = this.checkBlurMenuItemClick.bind(this);
    $module.boundCheckBlurLanguageSwitcherClick = this.checkBlurLanguageSwitcherClick.bind(this);
}

/**
 * Hide label if search input is not empty
 * @param {object} e 
 */
HeaderExtended.prototype.handleSearchChange = function (e) {
    var $searchInput = e.target || e.srcElement;
    var $search = $searchInput.closest('.idsk-header-extended__search')
    var $searchLabel = $search.querySelector('label')
    if ($searchInput.value) {
        $searchLabel.classList.add('idsk-header-extended__search-input--focus')
    } else {
        $searchLabel.classList.remove('idsk-header-extended__search-input--focus')
    }
}

/**
 * Handle open/hide language switcher
 * @param {object} e
 */
HeaderExtended.prototype.handleLanguageSwitcherClick = function (e) {
    var $toggleButton = e.target || e.srcElement;
    //var $target = $toggleButton.closest('.idsk-header-extended__language');
    this.$activeSearch = $toggleButton.closest('.idsk-header-extended__language');
    toggleClass(this.$activeSearch, 'idsk-header-extended__language--active');
    document.addEventListener('click', this.$module.boundCheckBlurLanguageSwitcherClick, true);
}

/**
 * handle click outside language switcher or "blur" the item link
 */
HeaderExtended.prototype.checkBlurLanguageSwitcherClick = function () {
    //var $target = this.$module.querySelectorAll('.idsk-header-extended__language');
    this.$activeSearch.classList.remove('idsk-header-extended__language--active');
    document.removeEventListener('click', this.$module.boundCheckBlurLanguageSwitcherClick, true);
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
 * Show mobil menu
 * @param {object} e
 */
HeaderExtended.prototype.showMobilMenu = function (e) {
    this.$module.classList.add("idsk-header-extended--show-mobile-menu")
    document.getElementsByTagName("body")[0].style.overflow = "hidden"
}
/**
 * Hide mobil menu
 * @param {object} e
 */
HeaderExtended.prototype.hideMobilMenu = function (e) {
    this.$module.classList.remove("idsk-header-extended--show-mobile-menu")
    document.getElementsByTagName("body")[0].style.overflow = "visible"
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