import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation

function Address($modul) {
    this.$modul = $modul;
}

Address.prototype.init = function () {
    console.log('jop')
}

export default Address