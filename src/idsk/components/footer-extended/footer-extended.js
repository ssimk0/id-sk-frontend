import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { toggleClass } from '../../common'

/**
 * Footer for extended websites
 */
class FooterExtended {
    constructor($module) {
        this.$module = $module;
    }

    init() {
        let $module = this.$module;
        // check for module
        if (!$module) {
            return;
        }

        let $yesButton = $module.querySelector('#idsk-footer-extended-feedback-yes-button');
        let $noButton = $module.querySelector('#idsk-footer-extended-feedback-no-button');
        let $errorButton = $module.querySelector('#idsk-footer-extended-error-button');
        let $closeErrorFormButton = $module.querySelector('#idsk-footer-extended-close-error-form-button');
        let $closeHelpFormButton = $module.querySelector('#idsk-footer-extended-close-help-form-button');

        let $writeUsButton = this.$module.querySelector('#idsk-footer-extended-write-us-button');

        if ($yesButton && $noButton && $errorButton) {
            $yesButton.addEventListener('click', this.handleYesButtonClick.bind(this));
            $noButton.addEventListener('click', this.handleNoButtonClick.bind(this));
            $errorButton.addEventListener('click', this.handleErrorButtonClick.bind(this));
        }

        if ($writeUsButton) {
            $writeUsButton.addEventListener('click', this.handleErrorButtonClick.bind(this));
        }

        if ($closeHelpFormButton) {
            $closeHelpFormButton.addEventListener('click', this.handleCloseHelpFormButtonClick.bind(this));
        }

        if ($closeErrorFormButton) {
            $closeErrorFormButton.addEventListener('click', this.handleCloseErrorFormButtonClick.bind(this));
        }

    }

    //Hiding feedback question text and showing thank notice with heart
    handleYesButtonClick(e) {
        let $noOption = this.$module.querySelector('#idsk-footer-extended-help-form');
        let $errorOption = this.$module.querySelector('#idsk-footer-extended-error-form');
        let $infoQuestion = this.$module.querySelector('#idsk-footer-extended-info-question');
        let $heartSymbol = this.$module.querySelector('#idsk-footer-extended-heart');

        $noOption.classList.add('idsk-footer-extended-display-hidden');
        $errorOption.classList.add('idsk-footer-extended-display-hidden');

        toggleClass($infoQuestion, 'idsk-footer-extended-heart');
        toggleClass($heartSymbol, 'idsk-footer-extended-heart-visible');
    }


    //Hiding feedback question element and showing help form with animation
    handleNoButtonClick(e) {
        let $helpOption = this.$module.querySelector('#idsk-footer-extended-help-form');
        let $feedbackQuestion = this.$module.querySelector('.idsk-footer-extended-heading-feedback');

        toggleClass($feedbackQuestion, 'idsk-footer-extended-display-none');
        toggleClass($helpOption, 'idsk-footer-extended-display-hidden');
        toggleClass($helpOption, 'idsk-footer-extended-open');
    }

    //Hiding feedback question element and showing error form with animation
    handleErrorButtonClick(e) {
        let $errorOption = this.$module.querySelector('#idsk-footer-extended-error-form');
        let $helpOption = this.$module.querySelector('#idsk-footer-extended-help-form');
        let $feedbackQuestion = this.$module.querySelector('.idsk-footer-extended-heading-feedback');

        toggleClass($feedbackQuestion, 'idsk-footer-extended-display-none');
        $helpOption.classList.add('idsk-footer-extended-display-hidden');
        $helpOption.classList.remove('idsk-footer-extended-open');
        toggleClass($errorOption, 'idsk-footer-extended-display-hidden');
        toggleClass($errorOption, 'idsk-footer-extended-open');
    }

    //Hiding error form with animation and showing feedback question element
    handleCloseErrorFormButtonClick(e) {
        let $errorOption = this.$module.querySelector('#idsk-footer-extended-error-form');
        let $feedbackQuestion = this.$module.querySelector('.idsk-footer-extended-heading-feedback');

        toggleClass($feedbackQuestion, 'idsk-footer-extended-open');
        toggleClass($feedbackQuestion, 'idsk-footer-extended-display-none');
        toggleClass($errorOption, 'idsk-footer-extended-open');
        toggleClass($errorOption, 'idsk-footer-extended-display-hidden');
    }

    //Hiding help form with animation and showing feedback question element
    handleCloseHelpFormButtonClick() {
        let $helpOption = this.$module.querySelector('#idsk-footer-extended-help-form');
        let $feedbackQuestion = this.$module.querySelector('.idsk-footer-extended-heading-feedback');

        toggleClass($feedbackQuestion, 'idsk-footer-extended-open');
        toggleClass($feedbackQuestion, 'idsk-footer-extended-display-none');
        toggleClass($helpOption, 'idsk-footer-extended-open');
        toggleClass($helpOption, 'idsk-footer-extended-display-hidden');
    }
}

export default FooterExtended