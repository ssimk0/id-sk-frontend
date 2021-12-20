import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Element/prototype/classList'
import '../../../govuk/vendor/polyfills/Element/prototype/nextElementSibling'
import '../../../govuk/vendor/polyfills/Element/prototype/previousElementSibling'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normalization

function Table ($module) {
    this.$module = $module
  }

  Table.prototype.init = function () {
    this.setup()
  }

  Table.prototype.setup = function () {
    var $module = this.$module

    if (!$module) {
        return
    }

    var $pritnTableBtn = $module.querySelector('.idsk-table__meta-print-button');
    if ($pritnTableBtn) {
      $pritnTableBtn.addEventListener('click', this.printTable.bind(this));
    }

  }

  Table.prototype.printTable = function () {
    var $table = this.$module.querySelector('.idsk-table').outerHTML;
    document.body.innerHTML = "<html><head><title></title></head><body>" + $table + "</body>";
    window.print();
    window.location.reload();
  }

  export default Table
