import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../../govuk/common'
import { toggleClass } from '../../common'
// import { characterCount } from '../character-count/character-count'

import  CharacterCount  from '../../../govuk/components/character-count/character-count'


CharacterCount.prototype.updateCountMessage = function () {
    var countElement = this.$textarea
    var options = this.options
    var countMessage = this.countMessage
  
    // Determine the remaining number of characters/words
    var currentLength = this.count(countElement.value)
    var maxLength = this.maxLength
    var remainingNumber = maxLength - currentLength
  
    // Set threshold if presented in options
    var thresholdPercent = options.threshold ? options.threshold : 0
    var thresholdValue = maxLength * thresholdPercent / 100
    if (thresholdValue > currentLength) {
      countMessage.classList.add('govuk-character-count__message--disabled')
      // Ensure threshold is hidden for users of assistive technologies
      countMessage.setAttribute('aria-hidden', true)
    } else {
      countMessage.classList.remove('govuk-character-count__message--disabled')
      // Ensure threshold is visible for users of assistive technologies
      countMessage.removeAttribute('aria-hidden')
    }
  
    // Update styles
    if (remainingNumber < 0) {
      countElement.classList.add('govuk-textarea--error')
      countMessage.classList.remove('govuk-hint')
      countMessage.classList.add('govuk-error-message')
    } else {
      countElement.classList.remove('govuk-textarea--error')
      countMessage.classList.remove('govuk-error-message')
      countMessage.classList.add('govuk-hint')
    }
  
    // Update message
    var charVerb = ''
    var charNoun = 'znak'
    var displayNumber = remainingNumber
    if (options.maxwords) {
      charNoun = 'slov'
    }
    charNoun = charNoun + ((remainingNumber === -1 || remainingNumber === 1) ? '' : 'ov')
    //charNoun = charNoun + ((remainingNumber >1 && remainingNumber < 5) ? 'y' : '')
    

    // charVerb = (remainingNumber < 0) ? 'too many' : 'remaining'
    displayNumber = Math.abs(remainingNumber)
  
    countMessage.innerHTML = 'Zostáva Vám ' + displayNumber + ' ' + charNoun + ' '
  }


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

        let $writeUsButton = this.$module.querySelector('#idsk-write-us-button');

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
        // $infoQuestion.innerText = 'Ďakujeme za Vašu spätnú väzbu   '

    }
    

    handleNoButtonClick(e) {
        let $errorOption = this.$module.querySelector('#idsk-error-form');
        let $helpOption = this.$module.querySelector('#idsk-help-form');

        let $feedbackQuestion = this.$module.querySelector('#feedback-question');

        // this.addClass($errorOption, 'idsk-display-none');
        // this.removeClass($errorOption, 'idsk-open');



        //this.delay(2000).toggleClass($helpOption, 'idsk-display-none');
        // window.setTimeout(function() {
        //     this.toggleClass('idsk-display-none');
        // }, 2000);
        
        this.toggleClass($feedbackQuestion, 'idsk-display-');

        this.toggleClass($helpOption, 'idsk-display-none');

        this.toggleClass($helpOption, 'idsk-open');
    }

    handleErrorButtonClick(e) {
        let $errorOption = this.$module.querySelector('#idsk-error-form');
        let $helpOption = this.$module.querySelector('#idsk-help-form');
        let $feedbackQuestion = this.$module.querySelector('#feedback-question');
        
        
        this.toggleClass($feedbackQuestion, 'idsk-display-');


        this.addClass($helpOption, 'idsk-display-none');
        this.removeClass($helpOption, 'idsk-open');

        this.toggleClass($errorOption, 'idsk-display-none');
        this.toggleClass($errorOption, 'idsk-open');


        // this.toggleClass($writeUsOption, 'idsk-display-none');
        // this.toggleClass($writeUsOption, 'idsk-open');
        

    }

    handleCloseErrorFormButtonClick(e) {
        let $errorOption = this.$module.querySelector('#idsk-error-form');
        let $feedbackQuestion = this.$module.querySelector('#feedback-question');
        //this.toggleClass($errorOption, 'idsk-feedback-hidden');
       
        this.toggleClass($feedbackQuestion, 'idsk-open');
        this.toggleClass($feedbackQuestion, 'idsk-display-');
        
        this.toggleClass($errorOption, 'idsk-open');
        this.toggleClass($errorOption, 'idsk-display-none');
        //this.toggleClass($feedbackQuestion,'idsk-feedback-hidden' );    
    }

    handleCloseHelpFormButtonClick() {
        let $helpOption = this.$module.querySelector('#idsk-help-form');
        let $feedbackQuestion = this.$module.querySelector('#feedback-question');
        
        this.toggleClass($feedbackQuestion, 'idsk-open');
        this.toggleClass($feedbackQuestion, 'idsk-display-');
        this.toggleClass($helpOption, 'idsk-open');
        this.toggleClass($helpOption, 'idsk-display-none');
        //this.toggleClass($feedbackQuestion,'idsk-feedback-hidden' );  
    }

    addClass(node, className) {
        if (node.className.indexOf(className) == -1) {
            node.className += ' ' + className
        }
    }

    toggleClass(node, className) {
        if (node.className.indexOf(className) > 0) {
            node.className = node.className.replace(' ' + className, '')
        } else {
            node.className += ' ' + className
        }
    }

    removeClass(node, className) {
        if (node.className.indexOf(className) > 0) {
            node.className = node.className.replace(' ' + className, '')
        }
    }
}

export default FooterExtended