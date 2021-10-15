import '../../../govuk/vendor/polyfills/Function/prototype/bind'
import '../../../govuk/vendor/polyfills/Element/prototype/classList'
import '../../../govuk/vendor/polyfills/Element/prototype/nextElementSibling'
import '../../../govuk/vendor/polyfills/Element/prototype/previousElementSibling'
import '../../../govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import { nodeListForEach } from '../../common'

function Tabs ($module) {
  this.$module = $module
  this.$tabs = $module.querySelectorAll('.idsk-tabs__tab')
  this.$mobileTabs = $module.querySelectorAll('.idsk-tabs__mobile-tab')

  this.keys = { left: 37, right: 39, up: 38, down: 40 }
  this.jsHiddenClass = 'idsk-tabs__panel--hidden'
}

Tabs.prototype.init = function () {
  this.setup()
}

Tabs.prototype.setup = function () {
  var $module = this.$module
  var $tabs = this.$tabs
  var $mobileTabs = this.$mobileTabs
  var $tabList = $module.querySelector('.idsk-tabs__list')
  var $tabListItems = $module.querySelectorAll('.idsk-tabs__list-item')

  if (!$tabs || !$tabList || !$tabListItems) {
    return
  }

  $tabList.setAttribute('role', 'tablist')

  nodeListForEach($tabListItems, function ($item) {
    $item.setAttribute('role', 'presentation')
  })

  nodeListForEach($mobileTabs, function ($item) {
    $item.setAttribute('role', 'presentation')
  })

  nodeListForEach($tabs, function ($tab, i) {
    // Set HTML attributes
    this.setAttributes($tab)

    // Save bounded functions to use when removing event listeners during teardown
    $tab.boundTabClick = this.onTabClick.bind(this)
    $tab.boundTabKeydown = this.onTabKeydown.bind(this)

    // Handle events
    $tab.addEventListener('click', $tab.boundTabClick, true)
    $mobileTabs[i].addEventListener('click', $tab.boundTabClick, true)
    $tab.addEventListener('keydown', $tab.boundTabKeydown, true)

    // Remove old active panels
    this.hideTab($tab)
  }.bind(this))

  // Show either the active tab according to the URL's hash or the first tab
  var $activeTab = this.getTab(window.location.hash) || this.$tabs[0]
  this.showTab($activeTab)

  // Handle hashchange events
  $module.boundOnHashChange = this.onHashChange.bind(this)
  window.addEventListener('hashchange', $module.boundOnHashChange, true)
}


Tabs.prototype.onHashChange = function (e) {
  var hash = window.location.hash
  var $tabWithHash = this.getTab(hash)
  if (!$tabWithHash) {
    return
  }

  // Prevent changing the hash
  if (this.changingHash) {
    this.changingHash = false
    return
  }

  // Show either the active tab according to the URL's hash or the first tab
  var $previousTab = this.getCurrentTab()

  this.hideTab($previousTab)
  this.showTab($tabWithHash)
  $tabWithHash.focus()
}

Tabs.prototype.hideTab = function ($tab) {
  this.unhighlightTab($tab)
  this.hidePanel($tab)
}

Tabs.prototype.showTab = function ($tab) {
  this.highlightTab($tab)
  this.showPanel($tab)
}

Tabs.prototype.getTab = function (hash) {
  return this.$module.querySelector('.idsk-tabs__tab[href="' + hash + '"]')
}

Tabs.prototype.setAttributes = function ($tab) {
  // set tab attributes
  var panelId = this.getHref($tab).slice(1)
  $tab.setAttribute('id', 'tab_' + panelId)
  $tab.setAttribute('role', 'tab')
  $tab.setAttribute('aria-controls', panelId)
  $tab.setAttribute('aria-selected', 'false')
  $tab.setAttribute('tabindex', '-1')

  // set panel attributes
  var $panel = this.getPanel($tab)
  $panel.setAttribute('role', 'tabpanel')
  $panel.setAttribute('aria-labelledby', $tab.id)
  $panel.classList.add(this.jsHiddenClass)
}

Tabs.prototype.unsetAttributes = function ($tab) {
  // unset tab attributes
  $tab.removeAttribute('id')
  $tab.removeAttribute('role')
  $tab.removeAttribute('aria-controls')
  $tab.removeAttribute('aria-selected')
  $tab.removeAttribute('tabindex')

  // unset panel attributes
  var $panel = this.getPanel($tab)
  $panel.removeAttribute('role')
  $panel.removeAttribute('aria-labelledby')
  $panel.classList.remove(this.jsHiddenClass)
}

Tabs.prototype.onTabClick = function (e) {
  if (!(e.target.classList.contains('idsk-tabs__tab') || e.target.classList.contains('idsk-tabs__mobile-tab'))) {
  // Allow events on child DOM elements to bubble up to tab parent
    return false
  }
  e.preventDefault()
  var $newTab = e.target
  if ($newTab.nodeName == 'DIV'){
    $newTab = this.$tabs[$newTab.getAttribute('item')]
  }
  var $currentTab = this.getCurrentTab()
  this.hideTab($currentTab)
  this.showTab($newTab)
  this.createHistoryEntry($newTab)
}

Tabs.prototype.createHistoryEntry = function ($tab) {
  var $panel = this.getPanel($tab)

  // Save and restore the id
  // so the page doesn't jump when a user clicks a tab (which changes the hash)
  var id = $panel.id
  $panel.id = ''
  this.changingHash = true
  window.location.hash = this.getHref($tab).slice(1)
  $panel.id = id
}

Tabs.prototype.onTabKeydown = function (e) {
  switch (e.keyCode) {
    case this.keys.left:
    case this.keys.up:
      this.activatePreviousTab()
      e.preventDefault()
      break
    case this.keys.right:
    case this.keys.down:
      this.activateNextTab()
      e.preventDefault()
      break
  }
}

Tabs.prototype.activateNextTab = function () {
  var currentTab = this.getCurrentTab()
  var nextTabListItem = currentTab.parentNode.nextElementSibling
  if (nextTabListItem) {
    var nextTab = nextTabListItem.querySelector('.idsk-tabs__tab')
  }
  if (nextTab) {
    this.hideTab(currentTab)
    this.showTab(nextTab)
    nextTab.focus()
    this.createHistoryEntry(nextTab)
  }
}

Tabs.prototype.activatePreviousTab = function () {
  var currentTab = this.getCurrentTab()
  var previousTabListItem = currentTab.parentNode.previousElementSibling
  if (previousTabListItem) {
    var previousTab = previousTabListItem.querySelector('.idsk-tabs__tab')
  }
  if (previousTab) {
    this.hideTab(currentTab)
    this.showTab(previousTab)
    previousTab.focus()
    this.createHistoryEntry(previousTab)
  }
}

Tabs.prototype.getPanel = function ($tab) {
  var $panel = this.$module.querySelector(this.getHref($tab))
  return $panel
}

Tabs.prototype.showPanel = function ($tab) {
  var $panel = this.getPanel($tab)
  $panel.classList.remove(this.jsHiddenClass)
}

Tabs.prototype.hidePanel = function (tab) {
  var $panel = this.getPanel(tab)
  $panel.classList.add(this.jsHiddenClass)
}

Tabs.prototype.unhighlightTab = function ($tab) {
  $tab.setAttribute('aria-selected', 'false')
  $tab.parentNode.classList.remove('idsk-tabs__list-item--selected')
  $tab.setAttribute('tabindex', '-1')
}

Tabs.prototype.highlightTab = function ($tab) {
  $tab.setAttribute('aria-selected', 'true')
  $tab.parentNode.classList.add('idsk-tabs__list-item--selected')
  $tab.setAttribute('tabindex', '0')
}

Tabs.prototype.getCurrentTab = function () {
  return this.$module.querySelector('.idsk-tabs__list-item--selected .idsk-tabs__tab')
}

// this is because IE doesn't always return the actual value but a relative full path
// should be a utility function most prob
// http://labs.thesedays.com/blog/2010/01/08/getting-the-href-value-with-jquery-in-ie/
Tabs.prototype.getHref = function ($tab) {
  var href = $tab.getAttribute('href')
  var hash = href.slice(href.indexOf('#'), href.length)
  return hash
}

export default Tabs
