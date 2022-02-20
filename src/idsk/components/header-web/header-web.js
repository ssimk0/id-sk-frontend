import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normalization
import { nodeListForEach, toggleClass } from '../../common'

/**
 * Header for web websites
 */
function HeaderWeb($module) {
    this.$module = $module;
}

HeaderWeb.prototype.init = function () {

    var $module = this.$module;
    // check for module
    if (!$module) {
        return;
    }

    // check for banner
    var $banner = $module.querySelector('.idsk-header-web__banner');
    this.$lastScrollTopPosition = 0;

    if ($banner) {
      document.addEventListener('scroll', this.handleToggleBanner.bind(this));
    }

    // check for close banner button
    var $bannerCloseBtn = $module.querySelector('.idsk-header-web__banner-close');

    if ($bannerCloseBtn) {
        $bannerCloseBtn.addEventListener('click', this.handleCloseBanner.bind(this));
    }

    // check for language switcher
    this.$languageBtn = $module.querySelector('.idsk-header-web__brand-language-button');

    if (this.$languageBtn) {
        // Handle esc button press
        var $languageSwitcher = $module.querySelector('.idsk-header-web__brand-language');
        $languageSwitcher.addEventListener('keydown', this.languegeEscPressed.bind(this));

        // Handle $languageBtn click events
        this.$languageBtn.addEventListener('click', this.handleLanguageSwitcherClick.bind(this));

        // close language list if i left the last item from langauge list e.g. if user use tab key for navigations
        var $lastLanguageItems = $module.querySelectorAll('.idsk-header-web__brand-language-list-item:last-child .idsk-header-web__brand-language-list-item-link');
        nodeListForEach($lastLanguageItems, function ($lastLanguageItem) {
            $lastLanguageItem.addEventListener('blur', this.checkBlurLanguageSwitcherClick.bind(this));
        }.bind(this))

        // close language list if user back tabbing
        this.$languageBtn.addEventListener('keydown', this.handleBackTabbing.bind(this));
    }

    $module.boundCheckBlurLanguageSwitcherClick = this.checkBlurLanguageSwitcherClick.bind(this);

    // check for e-goverment button
    var $eGovermentButtons = $module.querySelectorAll('.idsk-header-web__brand-gestor-button');
    this.$eGovermentSpacer = $module.querySelector('.idsk-header-web__brand-spacer');
    if ($eGovermentButtons.length > 0) {
        // Handle $eGovermentButton click event
        nodeListForEach($eGovermentButtons, function ($eGovermentButton) {
            $eGovermentButton.addEventListener('click', this.handleEgovermentClick.bind(this));
        }.bind(this))
    }

    // check for menu items
    var $menuList = $module.querySelector('.idsk-header-web__nav-list');
    var $menuItems = $module.querySelectorAll('.idsk-header-web__nav-list-item-link');
    if ($menuItems && $menuList) {
        // Handle $menuItem click events
        nodeListForEach($menuItems, function ($menuItem) {
            $menuItem.addEventListener('click', this.handleSubmenuClick.bind(this));
            if($menuItem.parentElement.querySelector('.idsk-header-web__nav-submenu') || $menuItem.parentElement.querySelector('.idsk-header-web__nav-submenulite')){
                $menuItem.parentElement.lastElementChild.addEventListener('keydown', this.menuTabbing.bind(this));
            }
        }.bind(this))
        $module.addEventListener('keydown', this.navEscPressed.bind(this));
    }

    // check for mobile menu button
    this.$menuButton = $module.querySelector('.idsk-header-web__main-headline-menu-button');
    if (this.$menuButton) {
        this.$menuButton.addEventListener('click', this.showMobileMenu.bind(this));
        this.menuBtnText = this.$menuButton.innerText.trim();
        this.initMobileMenuTabbing();
    }

    $module.boundCheckBlurMenuItemClick = this.checkBlurMenuItemClick.bind(this);
}

/**
 * Handle toggle banner on scrolling
 * @param {object} e
 */
HeaderWeb.prototype.handleToggleBanner = function (e) {
    // ignore if mobile menu is open
    if (!this.$module.querySelector('.idsk-header-web__nav--mobile')) {
      return false;
    }

    var $scrollTop = window.pageYOffset || document.scrollTop;
    if ($scrollTop > this.$lastScrollTopPosition) {
      this.$module.querySelector('.idsk-header-web__banner').classList.add("idsk-header-web__banner--scrolled");
    } else if ($scrollTop < this.$lastScrollTopPosition) {
      this.$module.querySelector('.idsk-header-web__banner').classList.remove("idsk-header-web__banner--scrolled");
    }

    // $scrollTop is not used, because element idsk-header-web__banner change height of header
    this.$lastScrollTopPosition = window.pageYOffset || document.scrollTop;
}

/**
 * Handle close banner
 * @param {object} e
 */
 HeaderWeb.prototype.handleCloseBanner = function (e) {
    var $closeButton = e.target || e.srcElement;
    var $banner = $closeButton.closest('.idsk-header-web__banner');
    $banner.classList.add('idsk-header-web__banner--hide');
}

/**
 * Handle open/hide language switcher
 * @param {object} e
 */
HeaderWeb.prototype.handleLanguageSwitcherClick = function (e) {
    var $toggleButton = e.target || e.srcElement;
    this.$activeSearch = $toggleButton.closest('.idsk-header-web__brand-language');
    toggleClass(this.$activeSearch, 'idsk-header-web__brand-language--active');
    if(this.$activeSearch.classList.contains('idsk-header-web__brand-language--active')){
        this.$activeSearch.firstElementChild.setAttribute('aria-expanded', 'true')
        this.$activeSearch.firstElementChild.setAttribute('aria-label',  this.$activeSearch.firstElementChild.getAttribute('data-text-for-hide'))
    }else{
        this.$activeSearch.firstElementChild.setAttribute('aria-expanded', 'false')
        this.$activeSearch.firstElementChild.setAttribute('aria-label',  this.$activeSearch.firstElementChild.getAttribute('data-text-for-show'))
    }
    document.addEventListener('click', this.$module.boundCheckBlurLanguageSwitcherClick, true);
}

HeaderWeb.prototype.checkBlurLanguageSwitcherClick = function (e) {
    if(!(e.target.classList.contains('idsk-header-web__brand-language-button'))){
        this.$activeSearch.classList.remove('idsk-header-web__brand-language--active');
        this.$activeSearch.firstElementChild.setAttribute('aria-expanded', 'false')
        this.$activeSearch.firstElementChild.setAttribute('aria-label',  this.$activeSearch.firstElementChild.getAttribute('data-text-for-show'))
        document.removeEventListener('click', this.$module.boundCheckBlurLanguageSwitcherClick, true);
    }
}

HeaderWeb.prototype.handleBackTabbing = function (e) {
    //shift was down when tab was pressed
    if(e.shiftKey && e.keyCode == 9 && document.activeElement == this.$languageBtn) {
        this.handleLanguageSwitcherClick(e);
    }
}

HeaderWeb.prototype.languegeEscPressed = function (e) {
    if(e.key === "Escape" && this.$languageBtn.getAttribute('aria-expanded') == 'true') {
        this.handleLanguageSwitcherClick(e);
    }
}

/**
 * Handle open/hide e-goverment statement
 * @param {object} e
 */
 HeaderWeb.prototype.handleEgovermentClick = function (e) {
    var $eGovermentButtons = this.$module.querySelectorAll('.idsk-header-web__brand-gestor-button');
    var $eGovermentDropdown = this.$module.querySelector('.idsk-header-web__brand-dropdown');
    toggleClass($eGovermentDropdown, 'idsk-header-web__brand-dropdown--active');
    toggleClass(this.$eGovermentSpacer, 'idsk-header-web__brand-spacer--active');
    nodeListForEach($eGovermentButtons, function ($eGovermentButton) {
        toggleClass($eGovermentButton, 'idsk-header-web__brand-gestor-button--active');
        if($eGovermentButton.classList.contains('idsk-header-web__brand-gestor-button--active')){
            $eGovermentButton.setAttribute('aria-expanded', 'true')
            $eGovermentButton.setAttribute('aria-label', $eGovermentButton.getAttribute('data-text-for-hide'))
        }else{
            $eGovermentButton.setAttribute('aria-expanded', 'false')
            $eGovermentButton.setAttribute('aria-label', $eGovermentButton.getAttribute('data-text-for-show'))
        }
    }.bind(this))
}

/**
 * Handle open/hide submenu
 * @param {object} e
 */
HeaderWeb.prototype.handleSubmenuClick = function (e) {
    var $srcEl = e.target || e.srcElement;
    var $toggleButton = $srcEl.closest('.idsk-header-web__nav-list-item');
    var $currActiveItem = this.$module.querySelector('.idsk-header-web__nav-list-item--active');

    if($currActiveItem && $currActiveItem.isEqualNode($toggleButton)){
        $currActiveItem.classList.remove('idsk-header-web__nav-list-item--active');
        if($toggleButton.childNodes[3]){
          $currActiveItem.childNodes[1].setAttribute('aria-expanded', 'false')
        $toggleButton.childNodes[1].setAttribute('aria-label', $toggleButton.childNodes[1].getAttribute('data-text-for-show'))
        }
    }else{
        if($currActiveItem){
            $currActiveItem.classList.remove('idsk-header-web__nav-list-item--active');
        }
        toggleClass($toggleButton, 'idsk-header-web__nav-list-item--active');

        if($toggleButton.childNodes[3] && $toggleButton.classList.contains('idsk-header-web__nav-list-item--active')) {
            $toggleButton.childNodes[1].setAttribute('aria-expanded', 'true')
            $toggleButton.childNodes[1].setAttribute('aria-label', $toggleButton.childNodes[1].getAttribute('data-text-for-hide'))
            if (window.screen.width <= 768){
              $toggleButton.scrollIntoView({behavior: 'smooth'})
            }
        }
    }

    document.addEventListener('click', this.$module.boundCheckBlurMenuItemClick.bind(this), true);
}

/**
 * Remove active class from menu when user leaves menu with tabbing
 */
 HeaderWeb.prototype.menuTabbing = function (e) {
    var isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

    if (!isTabPressed) {
        return;
    }

    var $submenuList = e.srcElement.parentElement.parentElement;
    var $activeItem = $submenuList.closest('.idsk-header-web__nav-list-item')
    // shift + tab
    if (e.shiftKey) {
        if (document.activeElement === $submenuList.firstElementChild.firstElementChild) {
            $activeItem.classList.remove('idsk-header-web__nav-list-item--active');
            $activeItem.childNodes[1].setAttribute('aria-expanded', 'false');
            $activeItem.childNodes[1].setAttribute('aria-label', $activeItem.childNodes[1].getAttribute('data-text-for-show'))
        }
    // tab
    } else if (document.activeElement === $submenuList.lastElementChild.lastElementChild) {
        $activeItem.classList.remove('idsk-header-web__nav-list-item--active');
        $activeItem.childNodes[1].setAttribute('aria-expanded', 'false');
        $activeItem.childNodes[1].setAttribute('aria-label', $activeItem.childNodes[1].getAttribute('data-text-for-show'))
    }
}

/**
 * Remove active class from menu when user leaves menu with esc
 */
 HeaderWeb.prototype.navEscPressed = function (e) {
    if(e.key === "Escape") {
        var $menuList = e.srcElement.parentElement.parentElement;
        if($menuList.classList.contains('idsk-header-web__nav-submenulite-list') || $menuList.classList.contains('idsk-header-web__nav-submenu-list')){
            $menuList = $menuList.closest('.idsk-header-web__nav-list')
        }
        var $activeItem = $menuList.querySelector('.idsk-header-web__nav-list-item--active')
        if($activeItem) {
            $activeItem.classList.remove('idsk-header-web__nav-list-item--active');
            $activeItem.childNodes[1].setAttribute('aria-expanded', 'false');
            $activeItem.childNodes[1].setAttribute('aria-label', $activeItem.childNodes[1].getAttribute('data-text-for-show'));
            $activeItem.childNodes[1].focus();
        } else if(this.$menuButton.getAttribute('aria-expanded') == 'true') {
            // Hide mobile menu if navigation is not active
            this.showMobileMenu();
        }
    }
 }

/**
 * handle click outside menu or "blur" the item link
 */
HeaderWeb.prototype.checkBlurMenuItemClick = function (e) {
    var $currActiveItem = this.$module.querySelector('.idsk-header-web__nav-list-item--active');
    if($currActiveItem && !(e.target.classList.contains('idsk-header-web__nav-list-item-link'))){
        $currActiveItem.classList.remove('idsk-header-web__nav-list-item--active');
        if( $currActiveItem.childNodes[3] ){
           $currActiveItem.childNodes[1].setAttribute('aria-expanded', 'false');
           $currActiveItem.childNodes[1].setAttribute('aria-label', $currActiveItem.childNodes[1].getAttribute('data-text-for-show'))
        }
        document.removeEventListener('click', this.$module.boundCheckBlurMenuItemClick, true);
    }
}

/**
 * Show mobile menu
 * @param {object} e
 */
HeaderWeb.prototype.showMobileMenu = function () {
    var closeText = this.menuBtnText ? 'Zavrieť' : '';
    var $mobileMenu = this.$module.querySelector('.idsk-header-web__nav');
    toggleClass($mobileMenu, 'idsk-header-web__nav--mobile');
    toggleClass(this.$menuButton, 'idsk-header-web__main-headline-menu-button--active');
    if(!this.$menuButton.classList.contains('idsk-header-web__main-headline-menu-button--active')){
        this.$menuButton.setAttribute('aria-expanded', 'false');
        this.$menuButton.setAttribute('aria-label', this.$menuButton.getAttribute('data-text-for-show'))
    }else{
        this.$menuButton.setAttribute('aria-expanded', 'true');
        this.$menuButton.setAttribute('aria-label', this.$menuButton.getAttribute('data-text-for-hide'))
    }
    var buttonIsActive = this.$menuButton.classList.contains('idsk-header-web__main-headline-menu-button--active');

    this.$menuButton.childNodes[0].nodeValue = buttonIsActive ? closeText : this.menuBtnText;
}

/**
 * Create loop in mobile menu for tabbing elements
 */
 HeaderWeb.prototype.initMobileMenuTabbing = function () {
     var $menuItems = this.$module.querySelector('.idsk-header-web__nav');
     var $focusableElements = Array.from($menuItems.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'))
     .filter(function(s) {
        return window.getComputedStyle(s).getPropertyValue('display') != 'none';
        });
     var $menuButton = this.$menuButton;
     var $lastMenuItem = $focusableElements[$focusableElements.length - 1];
     var KEYCODE_TAB = 9;

     $menuButton.addEventListener('keydown', function (e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

        if (isTabPressed && e.shiftKey && e.target.getAttribute('aria-expanded') == 'true') {
            $lastMenuItem.focus();
            e.preventDefault();
        }
    });

    $lastMenuItem.addEventListener('keydown', function (e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

        if (isTabPressed && !e.shiftKey) {
            $menuButton.focus();
            e.preventDefault();
        }
    });
 }

export default HeaderWeb
