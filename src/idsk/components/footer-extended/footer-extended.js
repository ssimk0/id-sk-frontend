import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../../govuk/common'
import { toggleClass } from '../../common'

/**
 * Footer for extended websites
 */
class FooterExtended {
    constructor($module) {
        this.$module = $module;
    }



    init() {
        console.log('test');

        let $module = this.$module;
        // check for module
        if (!$module) {
            return;
        }


        let $yesButton = $module.querySelector('#idsk-yes-button');
        let $noButton = $module.querySelector('#idsk-no-button');
        let $errorButton = $module.querySelector('#idsk-error-button');
        let $closeErrorFormButton = $module.querySelector('#close-error-form-button');
        let $closeHelpFormButton = $module.querySelector('#close-help-form-button');


        if ($yesButton && $noButton && $errorButton) {
            $yesButton.addEventListener('click', this.handleYesButtonClick.bind(this));
            $noButton.addEventListener('click', this.handleNoButtonClick.bind(this));
            $errorButton.addEventListener('click', this.handleErrorButtonClick.bind(this));
        }

        if ($closeHelpFormButton) {
            $closeHelpFormButton.addEventListener('click', this.handleCloseHelpFormButtonClick.bind(this));
        }

        if ($closeErrorFormButton) {
            $closeErrorFormButton.addEventListener('click', this.handleCloseErrorFormButtonClick.bind(this));
        }






        // // check for search component

        // let $toggleSearchComponent = $module.querySelector('.idsk-header-extended__info-search');
        // let $toggleSearchInputComponent = $module.querySelector('.idsk-header-extended__info-search-form input');
        // if ($toggleSearchComponent && $toggleSearchInputComponent) {
        //     // Handle $toggleSearchComponent click and blur events
        //     $toggleSearchComponent.addEventListener('focus', this.handleSearchComponentClick.bind(this));
        //     // both blur events needed
        //     // if form is shown, but has not been focused, inputs blur won't be fired, then trigger this one
        //     $toggleSearchComponent.addEventListener('blur', this.handleSearchComponentClick.bind(this));
        //     // if form is shown, and has been focused, trigger this one
        //     $toggleSearchInputComponent.addEventListener('blur', this.handleSearchComponentClick.bind(this));
        // }

        // // check for language selector
        // let $toggleLanguageSelector = $module.querySelector('.idsk-js-header-extended-language-toggle');
        // if ($toggleLanguageSelector) {
        //     // Handle $toggleLanguageSelect click events
        //     $toggleLanguageSelector.addEventListener('focus', this.handleLanguageSelectorClick.bind(this));
        //     $toggleLanguageSelector.addEventListener('blur', this.handleLanguageSelectorClick.bind(this));
        // }

        // // check for submenu
        // let $toggleSubmenus = $module.querySelectorAll('.idsk-header-extended__link');
        // if ($toggleSubmenus) {
        //     let $self = this;
        //     // Handle $toggleSubmenu click events
        //     nodeListForEach($toggleSubmenus, function ($toggleSubmenu) {
        //         $toggleSubmenu.addEventListener('focus', $self.handleSubmenuClick.bind($self));
        //         $toggleSubmenu.addEventListener('blur', $self.handleSubmenuClick.bind($self));
        //     })
        // }

    }





    hideAllElements() {
        let $yesOption = this.$module.querySelector('#idsk-yes-option');
        let $noOption = this.$module.querySelector('#idsk-help-form');
        let $errorOption = this.$module.querySelector('#idsk-error-form');

        this.addClass($yesOption, 'idsk-display-none');
        this.addClass($noOption, 'idsk-display-none');
        this.addClass($errorOption, 'idsk-display-none');
    }

    handleYesButtonClick(e) {
        //this.hideAllElements();

        let $feedbackQuestion = this.$module.querySelector('#feedback-question');

        let $yesOption = this.$module.querySelector('#idsk-yes-option');
        let $noOption = this.$module.querySelector('#idsk-help-form');
        let $errorOption = this.$module.querySelector('#idsk-error-form');


        
        let $infoQuestion = this.$module.querySelector('#idsk-info-question');
        let $yesButton = this.$module.querySelector('#idsk-yes-button');
        let $noButton = this.$module.querySelector('#idsk-no-button');
        let $errorButton = this.$module.querySelector('#idsk-error-button');
        let $heartSymbol = this.$module.querySelector('#idsk-heart');

        //this.addClass($yesOption, 'idsk-display-none');
        this.addClass($noOption, 'idsk-display-none');
        this.addClass($errorOption, 'idsk-display-none');


        this.toggleClass($infoQuestion, 'idsk-heart');
        // this.toggleClass($yesButton, 'idsk-display-none');
        // this.toggleClass($noButton, 'idsk-display-none');
        // this.toggleClass($errorButton, 'idsk-display-none');

        this.toggleClass($heartSymbol, 'idsk-heart-visible');
        
        // let $infoQuestion = this.$module.querySelector('#idsk-info-question'); 
        $infoQuestion.innerText = 'Ďakujeme za Vašu spätnú väzbu   '

        //let $feedbackQuestion = this.$module.querySelector('#feedback-question');
        //this.toggleClass($yesOption, 'idsk-display-none');
        //this.toggleClass($feedbackQuestion, 'idsk-display-none');
        //this.toggleClass($yesOption, 'idsk-open');



        // console.log('yes');
    }
    // handleNoButtonClick(e) {
    //     let $noOption = this.$module.querySelector('#idsk-help-form');
    //     //btn = document.querySelector('button');


    //     if ($noOption.classList.contains('idsk-display-none')) {
    //         $noOption.classList.remove('idsk-display-none');
    //         setTimeout(function () {
    //             $noOption.classList.remove('idsk-visually-hidden');
    //         }, 20);
    //     } else {
    //         $noOption.classList.add('idsk-visually-hidden');
    //         $noOption.addEventListener('transitionend', function (e) {
    //             $noOption.classList.add('idsk-display-none');
    //         }, {
    //             capture: false,
    //             once: true,
    //             passive: false
    //         });
    //     }


    // }

    handleNoButtonClick(e) {

        let $noOption = this.$module.querySelector('#idsk-help-form');
        let $feedbackQuestion = this.$module.querySelector('#feedback-question');
        this.toggleClass($noOption, 'idsk-display-none');
        this.toggleClass($noOption, 'idsk-open');
        


        //this.toggleClass($feedbackQuestion,'idsk-feedback-hidden' );
        console.log('yes');
    }

    handleErrorButtonClick(e) {
        let $errorOption = this.$module.querySelector('#idsk-error-form');
        let $feedbackQuestion = this.$module.querySelector('#feedback-question');
        this.toggleClass($errorOption, 'idsk-display-none');
        this.toggleClass($errorOption, 'idsk-open');

        //this.toggleClass($feedbackQuestion,'idsk-feedback-hidden' );    
    }

    handleCloseErrorFormButtonClick(e) {
        let $errorOption = this.$module.querySelector('#idsk-error-form');
        let $feedbackQuestion = this.$module.querySelector('#feedback-question');
        //this.toggleClass($errorOption, 'idsk-feedback-hidden');
        this.toggleClass($errorOption, 'idsk-open');
        this.toggleClass($errorOption, 'idsk-display-none');
        //this.toggleClass($feedbackQuestion,'idsk-feedback-hidden' );    
    }

    handleCloseHelpFormButtonClick() {
        let $helpOption = this.$module.querySelector('#idsk-help-form');
        let $feedbackQuestion = this.$module.querySelector('#feedback-question');
        this.toggleClass($helpOption, 'idsk-open');
        this.toggleClass($helpOption, 'idsk-display-none');
        //this.toggleClass($feedbackQuestion,'idsk-feedback-hidden' );  
    }

    addClass(node, className) {
        node.className += ' ' + className
    }

    toggleClass(node, className) {
        if (node.className.indexOf(className) > 0) {
            node.className = node.className.replace(' ' + className, '')
        } else {
            node.className += ' ' + className
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

export default FooterExtended