import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../../govuk/common'
import { toggleClass } from '../../common'

/**
 * Header for extended websites
 */
class HeaderExtended {
    constructor($module) {
        this.$module = $module;
    }

    init() {

        let $module = this.$module;
        // check for module
        if (!$module) {
            return;
        }

        // check for search component
        let $toggleSearchComponent = $module.querySelector('.idsk-header-extended__info-search');
        let $toggleSearchInputComponent = $module.querySelector('.idsk-header-extended__info-search-form input');
        if ($toggleSearchComponent && $toggleSearchInputComponent) {
            // Handle $toggleSearchComponent click and blur events
            $toggleSearchComponent.addEventListener('focus', this.handleSearchComponentClick.bind(this));
            // both blur events needed
            // if form is shown, but has not been focused, inputs blur won't be fired, then trigger this one
            $toggleSearchComponent.addEventListener('blur', this.handleSearchComponentClick.bind(this));
            // if form is shown, and has been focused, trigger this one
            $toggleSearchInputComponent.addEventListener('blur', this.handleSearchComponentClick.bind(this));
        }

        // check for language selector
        let $toggleLanguageSelector = $module.querySelector('.idsk-js-header-extended-language-toggle');
        if ($toggleLanguageSelector) {
            // Handle $toggleLanguageSelect click events
            $toggleLanguageSelector.addEventListener('focus', this.handleLanguageSelectorClick.bind(this));
            $toggleLanguageSelector.addEventListener('blur', this.handleLanguageSelectorClick.bind(this));
        }

        // check for submenu
        let $toggleSubmenus = $module.querySelectorAll('.idsk-header-extended__link');
        if ($toggleSubmenus) {
            let $self = this;
            // Handle $toggleSubmenu click events
            nodeListForEach($toggleSubmenus, function ($toggleSubmenu) {
                $toggleSubmenu.addEventListener('focus', $self.handleSubmenuClick.bind($self));
                $toggleSubmenu.addEventListener('blur', $self.handleSubmenuClick.bind($self));
            })
        }

    }

    /**
     * Handle focus/blur on search component - show/hide search form, hide/show search text wrapper
     * @param {object} e 
     */
    handleSearchComponentClick(e) {
        let $el = e.target || e.srcElement;
        let $target = $el.closest('.idsk-header-extended__info-search');
        let $relatedTarget = e.relatedTarget ? (e.relatedTarget).closest('.idsk-header-extended__info-search-form') : e.relatedTarget;
        let $searchText = $target.querySelector('.idsk-header-extended__info-search-text');
        let $searchForm = $target.querySelector('.idsk-header-extended__info-search-form');
        if ($searchText && $searchForm) {
            if (e.type === 'focus') {
                $searchText.classList.add('--hide');
                $searchForm.classList.add('--show');
            } else if (e.type === 'blur' && $relatedTarget !== $searchForm) {
                $searchText.classList.remove('--hide');
                $searchForm.classList.remove('--show');
            }
        }
    }

    /**
     * Handle open/hide language switcher
     * @param {object} e 
     */
    handleLanguageSelectorClick(e) {
        let $toggleButton = e.target || e.srcElement;
        let $target = $toggleButton.closest('.idsk-header-extended__info-language');
        if ($target) {
            toggleClass($target, 'idsk-header-extended__info-language--active');
        }
    }

    /**
     * Handle open/hide submenu
     * @param {object} e 
     */
    handleSubmenuClick(e) {
        let $srcEl = e.target || e.srcElement;
        let $toggleButton = $srcEl.closest('.idsk-header-extended__navigation-item');
        toggleClass($toggleButton, 'idsk-header-extended__navigation-item--active');
        let $target = $toggleButton
            .closest('.idsk-header-extended__navigation-item')
            .querySelector('.idsk-header-extended__navigation-submenu');
        if ($target) {
            toggleClass($target, 'idsk-header-extended__navigation-submenu--open');
        }
    }

}

export default HeaderExtended