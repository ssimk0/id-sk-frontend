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
    var $toggleLanguageSwitcher = $module.querySelector('.idsk-header-web__brand-language-button');
    this.$toggleLanguageSwitcher = $toggleLanguageSwitcher;

    if ($toggleLanguageSwitcher) {
        // Handle $toggleLanguageSwitcher click events
        $toggleLanguageSwitcher.addEventListener('click', this.handleLanguageSwitcherClick.bind(this));
        $toggleLanguageSwitcher.addEventListener('focus', this.handleLanguageSwitcherClick.bind(this));

        // close language list if i left the last item from langauge list e.g. if user use tab key for navigations
        var $lastLanguageItems = $module.querySelectorAll('.idsk-header-web__brand-language-list-item:last-child .idsk-header-web__brand-language-list-item-link');
        nodeListForEach($lastLanguageItems, function ($lastLanguageItem) {
            $lastLanguageItem.addEventListener('blur', this.checkBlurLanguageSwitcherClick.bind(this));
        }.bind(this))

        //
        $module.addEventListener('keydown', this.handleBackTabbing.bind(this));

    }

    $module.boundCheckBlurLanguageSwitcherClick = this.checkBlurLanguageSwitcherClick.bind(this);

    // check for e-goverment button
    var $eGovermentButtons = $module.querySelectorAll('.idsk-header-web__brand-gestor-button');
    if ($eGovermentButtons) {
        // Handle $eGovermentButton click event
        nodeListForEach($eGovermentButtons, function ($eGovermentButton) {
            $eGovermentButton.addEventListener('click', this.handleEgovermentClick.bind(this));
        }.bind(this))
    }

    // check for menu items
    var $menuItems = $module.querySelectorAll('.idsk-header-web__nav-list-item-link');
    if ($menuItems) {
        // Handle $menuItem click events
        nodeListForEach($menuItems, function ($menuItem) {
            $menuItem.addEventListener('click', this.handleSubmenuClick.bind(this));
            $menuItem.addEventListener('focus', this.handleSubmenuClick.bind(this));
        }.bind(this))
    }

    // check for menu button and close menu button
    var $menuButton = $module.querySelector('.idsk-header-web__main-headline-menu-button');
    if ($menuButton) {
        $menuButton.addEventListener('click', this.showMobileMenu.bind(this));
    }

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
    this.$activeSearch = $toggleButton.closest('.idsk-header-web__brand-language');
    toggleClass(this.$activeSearch, 'idsk-header-web__brand-language--active');
    document.addEventListener('click', this.$module.boundCheckBlurLanguageSwitcherClick, true);
}

HeaderWeb.prototype.checkBlurLanguageSwitcherClick = function () {
    this.$activeSearch.classList.remove('idsk-header-web__brand-language--active');
    document.removeEventListener('click', this.$module.boundCheckBlurLanguageSwitcherClick, true);
}

HeaderWeb.prototype.handleBackTabbing = function (e) {
    //shift was down when tab was pressed
    if(e.shiftKey && e.keyCode == 9) { 
        var $focusedElement = this.$module.querySelector(':focus');

        if ($focusedElement == this.$toggleLanguageSwitcher) {
            var languageList = this.$module.querySelector('.idsk-header-web__brand-language-list');
            languageList.lastElementChild.focus();
        }
    }
}

/**
 * Handle open/hide e-goverment statement
 * @param {object} e
 */
 HeaderWeb.prototype.handleEgovermentClick = function (e) {
    var $eGovermentButton = this.$module.querySelector('.idsk-header-web__brand-gestor-button');
    var $eGovermentDropdown = this.$module.querySelector('.idsk-header-web__brand-dropdown');
    toggleClass($eGovermentDropdown, 'idsk-header-web__brand-dropdown--active');  
    toggleClass($eGovermentButton, 'idsk-header-web__brand-gestor-button--active');
}


/**
 * Handle open/hide submenu
 * @param {object} e 
 */
HeaderWeb.prototype.handleSubmenuClick = function (e) {
    var $srcEl = e.target || e.srcElement;
    var $toggleButton = $srcEl.closest('.idsk-header-web__nav-list-item');
    var $currActiveList = this.$module.querySelectorAll('.idsk-header-web__nav-list-item--active');

    if ($currActiveList.length > 0) {
        $currActiveList[0].classList.remove('idsk-header-web__nav-list-item--active');
    }
    toggleClass($toggleButton, 'idsk-header-web__nav-list-item--active');

    document.addEventListener('click', this.$module.boundCheckBlurMenuItemClick, true);
}

/**
 * handle click outside menu or "blur" the item link
 */
HeaderWeb.prototype.checkBlurMenuItemClick = function () {
    var $currActiveList = this.$module.querySelectorAll('.idsk-header-web__nav-list-item--active');
    $currActiveList[0].classList.remove('idsk-header-web__nav-list-item--active');
    document.removeEventListener('click', this.$module.boundCheckBlurMenuItemClick, true);
}

/**
 * Show mobile menu
 * @param {object} e
 */
HeaderWeb.prototype.showMobileMenu = function (e) {
    var $menuButton = this.$module.querySelector('.idsk-header-web__main-headline-menu-button');
    var $mobileMenu = this.$module.querySelector('.idsk-header-web__nav');
    toggleClass($mobileMenu, 'idsk-header-web__nav--mobile');
    toggleClass($menuButton, 'idsk-header-web__main-headline-menu-button--active');
    
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