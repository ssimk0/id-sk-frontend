import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normalization

function SearchComponent($module) {
    this.$module = $module
}

SearchComponent.prototype.init = function () {
    // Check for module
    var $module = this.$module
    if (!$module) {
        return
    }

    var $searchInputs = $module.querySelectorAll('.idsk-search-component__input')
    if (!$searchInputs) {
        return
    }

    $searchInputs.forEach(function ($searchInput) {
        $searchInput.addEventListener('change', this.handleSearchInput.bind(this))
    }.bind(this))

}

SearchComponent.prototype.handleSearchInput = function (e) {
    var $el = e.target || e.srcElement || e
    var $searchComponent = $el.closest('.idsk-search-component')
    var $searchLabel = $searchComponent.querySelector('label')

    if ($el.value == '') {
        $searchLabel.classList.remove('govuk-visually-hidden')
    } else {
        $searchLabel.classList.add('govuk-visually-hidden')
    }
}

export default SearchComponent
