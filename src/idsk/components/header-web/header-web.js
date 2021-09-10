import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../../govuk/common'
import { toggleClass } from '../../common'

/**
 * Header for web websites
 */
function HeaderWeb($module) {
    this.$module = $module;
    this.$lastMenuElement = '';
    this.$firstMenuElement = '';
}

HeaderWeb.prototype.init = function () {

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
    var $toggleLanguageSwitchers = $module.querySelectorAll('.idsk-header-web__brand-language-button');
    if ($toggleLanguageSwitchers) {
        // Handle $toggleLanguageSwitcher click events
        nodeListForEach($toggleLanguageSwitchers, function ($toggleLanguageSwitcher) {
            $toggleLanguageSwitcher.addEventListener('click', this.handleLanguageSwitcherClick.bind(this));
            $toggleLanguageSwitcher.addEventListener('focus', this.handleLanguageSwitcherClick.bind(this));
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
        this.initMobileMenuTabbing();
        $hamburgerMenuButton.addEventListener('click', this.showMobileMenu.bind(this));
        $closeMenuButton.addEventListener('click', this.hideMobileMenu.bind(this));
    }

    window.addEventListener('scroll', this.scrollFunction.bind(this));

    $module.boundCheckBlurMenuItemClick = this.checkBlurMenuItemClick.bind(this);

    // check for cookies

    if (!(window.localStorage.getItem('acceptedCookieBanner'))) {
        $module.classList.add('idsk-header-extended--cookie');
        var $cookieBanner = document.querySelector('.idsk-cookie-banner');

        // scroll handler
        window.addEventListener('scroll', function() {
            var headerPosition = document.body.getBoundingClientRect().top;
            var cookieBannerHeight = $cookieBanner.offsetHeight;
            if(headerPosition < (-cookieBannerHeight)){
                $module.classList.remove('idsk-header-extended--cookie');
                $module.style.top = '0px';
            }else{
                $module.classList.add('idsk-header-extended--cookie');
                $module.style.top = cookieBannerHeight.toString() + 'px';
            }
        });

        // cookie resize handler
        var resizeObserver = new ResizeObserver(entries => {
            $module.style.top = $cookieBanner.offsetHeight.toString() + 'px';
          });

          resizeObserver.observe($cookieBanner);

    }
    
}

/**
 * Hide label if search input is not empty
 * @param {object} e 
 */
HeaderWeb.prototype.handleSearchChange = function (e) {
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
HeaderWeb.prototype.handleLanguageSwitcherClick = function (e) {
    var $toggleButton = e.target || e.srcElement;
    //var $target = $toggleButton.closest('.idsk-header-extended__language');
    var $languageList = $toggleButton.querySelector('.idsk-header-web__brand-language-list');
    toggleClass($languageList, 'idsk-header-web__brand-language-list--active');
}

/**
 * Handle open/hide submenu
 * @param {object} e 
 */
HeaderWeb.prototype.handleSubmenuClick = function (e) {
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
HeaderWeb.prototype.checkBlurMenuItemClick = function () {
    var $currActiveList = this.$module.querySelectorAll('.idsk-header-extended__navigation-item--active');
    $currActiveList[0].classList.remove('idsk-header-extended__navigation-item--active');
    document.removeEventListener('click', this.$module.boundCheckBlurMenuItemClick, true);
}

/**
 * Show mobile menu
 * @param {object} e
 */
HeaderWeb.prototype.showMobileMenu = function (e) {
    var $hamburgerMenuButton = this.$module.querySelector('.idsk-js-header-extended-side-menu');

    this.$module.classList.add("idsk-header-extended--show-mobile-menu");
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    if (document.activeElement == $hamburgerMenuButton) {
        this.$lastMenuElement.focus();
    }
}
/**
 * Hide mobile menu
 * @param {object} e
 */
HeaderWeb.prototype.hideMobileMenu = function (e) {
    var $hamburgerMenuButton = this.$module.querySelector('.idsk-js-header-extended-side-menu');

    this.$module.classList.remove("idsk-header-extended--show-mobile-menu");
    document.getElementsByTagName("body")[0].style.overflow = "visible";
    $hamburgerMenuButton.focus();
}

/**
 * Create loop in mobile menu for tabbing elements
 */
HeaderWeb.prototype.initMobileMenuTabbing = function () {
    //Get header extended mobile menu focusable elements
    var $headerExtended = this.$module.querySelectorAll('.idsk-header-extended__mobile')[0];
    var $mobileMenuElements = $headerExtended.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    this.$firstMenuElement = $mobileMenuElements[0];
    this.$lastMenuElement = $mobileMenuElements[$mobileMenuElements.length - 1];
    var KEYCODE_TAB = 9;

    document.addEventListener('keydown', function (e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // shift + tab
            if (document.activeElement === this.$firstMenuElement) {
                this.$lastMenuElement.focus();
                e.preventDefault();
            }
        } else if (document.activeElement === this.$lastMenuElement) { // tab
            this.$firstMenuElement.focus();
            e.preventDefault();
        }

    }.bind(this));
}

/**
 * When the user scrolls down from the top of the document, resize the navbar's padding and the logo
 */
HeaderWeb.prototype.scrollFunction = function () {
    var $module = this.$module;

    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $module.classList.add('idsk-header-extended--shrink');
    } else if (document.body.scrollTop < 10 && document.documentElement.scrollTop < 10) {
        $module.classList.remove('idsk-header-extended--shrink');
    }
}

export default HeaderWeb