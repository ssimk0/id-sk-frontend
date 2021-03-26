import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation

function OptionSelectFilter($module) {
    this.$module = $module
}

OptionSelectFilter.prototype.init = function () {
    // Check for module
    var $module = this.$module
    if (!$module) {
        return
    }
}



OptionSelectFilter.prototype.changeCurrentLink = function (e) {
    var $module = this.$module
    
}

export default OptionSelectFilter
