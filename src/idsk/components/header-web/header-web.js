import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../../govuk/common'
import { toggleClass } from '../../common'

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

    // check for language switcher
    var $toggleLanguageSwitcher = $module.querySelector('.idsk-header-web__brand-language-button');
    this.$toggleLanguageSwitcher = $toggleLanguageSwitcher;

    if ($toggleLanguageSwitcher) {
        // Handle $toggleLanguageSwitcher click events
        $toggleLanguageSwitcher.addEventListener('click', this.handleLanguageSwitcherClick.bind(this));

        // close language list if i left the last item from langauge list e.g. if user use tab key for navigations
        var $lastLanguageItems = $module.querySelectorAll('.idsk-header-web__brand-language-list-item:last-child .idsk-header-web__brand-language-list-item-link');
        nodeListForEach($lastLanguageItems, function ($lastLanguageItem) {
            $lastLanguageItem.addEventListener('blur', this.checkBlurLanguageSwitcherClick.bind(this));
        }.bind(this))

        // close language list if user back tabbing
        $toggleLanguageSwitcher.addEventListener('keydown', this.handleBackTabbing.bind(this));

    }

    $module.boundCheckBlurLanguageSwitcherClick = this.checkBlurLanguageSwitcherClick.bind(this);

    // check for e-goverment button
    var $eGovermentButtons = $module.querySelectorAll('.idsk-header-web__brand-gestor-button');
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
    }

    // check for mobile menu button
    var $menuButton = $module.querySelector('.idsk-header-web__main-headline-menu-button');
    if ($menuButton) {
        $menuButton.addEventListener('click', this.showMobileMenu.bind(this));
        this.menuBtnText = $menuButton.innerText.trim();
    }

    $module.boundCheckBlurMenuItemClick = this.checkBlurMenuItemClick.bind(this);
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

HeaderWeb.prototype.checkBlurLanguageSwitcherClick = function (e) {
    if(!(e.target.classList.contains('idsk-header-web__brand-language-button'))){
        this.$activeSearch.classList.remove('idsk-header-web__brand-language--active');
        document.removeEventListener('click', this.$module.boundCheckBlurLanguageSwitcherClick, true); 
    document.removeEventListener('click', this.$module.boundCheckBlurLanguageSwitcherClick, true);
        document.removeEventListener('click', this.$module.boundCheckBlurLanguageSwitcherClick, true); 
    }
}

HeaderWeb.prototype.handleBackTabbing = function (e) {
    //shift was down when tab was pressed
    if(e.shiftKey && e.keyCode == 9 && document.activeElement == this.$toggleLanguageSwitcher) { 
        this.$toggleLanguageSwitcher.parentNode.classList.remove('idsk-header-web__brand-language--active');  
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
    nodeListForEach($eGovermentButtons, function ($eGovermentButton) {
        toggleClass($eGovermentButton, 'idsk-header-web__brand-gestor-button--active');
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
    }else{
        if($currActiveItem){
            $currActiveItem.classList.remove('idsk-header-web__nav-list-item--active');
        }
        toggleClass($toggleButton, 'idsk-header-web__nav-list-item--active'); 
    toggleClass($toggleButton, 'idsk-header-web__nav-list-item--active');
        toggleClass($toggleButton, 'idsk-header-web__nav-list-item--active'); 
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

    var submenuList = e.srcElement.parentElement.parentElement;
    // shift + tab
    if (e.shiftKey) {
        if (document.activeElement === submenuList.firstElementChild.firstElementChild) {
            submenuList.closest('.idsk-header-web__nav-list-item').classList.remove('idsk-header-web__nav-list-item--active');
        }
    // tab
    } else if (document.activeElement === submenuList.lastElementChild.lastElementChild) {
        submenuList.closest('.idsk-header-web__nav-list-item').classList.remove('idsk-header-web__nav-list-item--active');
    } 
}

/**
 * handle click outside menu or "blur" the item link
 */
HeaderWeb.prototype.checkBlurMenuItemClick = function (e) {
    var $currActiveItem = this.$module.querySelector('.idsk-header-web__nav-list-item--active');
    if($currActiveItem && !(e.target.classList.contains('idsk-header-web__nav-list-item-link'))){
        $currActiveItem.classList.remove('idsk-header-web__nav-list-item--active');
        document.removeEventListener('click', this.$module.boundCheckBlurMenuItemClick, true); 
    }
}

/**
 * Show mobile menu
 * @param {object} e
 */
HeaderWeb.prototype.showMobileMenu = function (e) {
    var closeText = this.menuBtnText ? 'Zavrieť' : '';
    var $menuButton = this.$module.querySelector('.idsk-header-web__main-headline-menu-button');
    var $mobileMenu = this.$module.querySelector('.idsk-header-web__nav');
    toggleClass($mobileMenu, 'idsk-header-web__nav--mobile');
    toggleClass($menuButton, 'idsk-header-web__main-headline-menu-button--active');
    var buttonIsActive = $menuButton.classList.contains('idsk-header-web__main-headline-menu-button--active');

    $menuButton.childNodes[0].nodeValue = buttonIsActive ? closeText : this.menuBtnText;
}

export default HeaderWeb