import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Element/prototype/classList'
import '../../../govuk/vendor/polyfills/Element/prototype/nextElementSibling'
import '../../../govuk/vendor/polyfills/Element/prototype/previousElementSibling'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../common'

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

    var tableHead = $module.getAttribute('table-head');
    var tableData = $module.getAttribute('table-data');

    var dataPath = $module.getAttribute('data-path');
    var apiUrl = $module.getAttribute('api-url');
    var dataFormat = $module.getAttribute('data-format');
    
  }

  Table.prototype.renderTable = function (tableHead, tableData, dataFormat = "json") {
    if(dataFormat == "json"){
        
    }
  }

  export default Table