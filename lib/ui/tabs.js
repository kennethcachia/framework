/**
 * @module lib/ui/tabs
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/properties'

], function (UIBase, inherit, Assert, Properties) {

  /**
   * A simple Tabbed UI that activates
   * one tab at a time.
   * 
   * @alias module:lib/ui/tabs
   * @class
   * @extends UIBase
   * @param {Integer} tabs The number of tabs.
   */
  var Tabs = function (tabs) {
    Assert.isInteger(tabs);

    Properties.defineImmutableProperty(
      this, 'activeClass', this.activeClass);

    Tabs.superClass.call(this, this.template, {});

    this._totalTabs = tabs;

    this.on('attached', this._generateMarkup, this);
  };

  inherit(Tabs, UIBase);


  /**
   * @property {String} activeClass
   *           The class added on the active 
   *           trigger and tab.
   */
  Tabs.prototype.activeClass = 'ui-tabs-active';


  /**
   * Attaches a child component to one of the tabs.
   *
   * @method
   * @param {Integer} index The tab index.
   * @param {Function} ctor The child's constructor.
   * @param {Object} context The context.
   */
  Tabs.prototype.attachToTab = function (index, ctor, context) {
    Assert.isTruthy(index > 0);
    Assert.isTruthy(index <= this._totalTabs);

    var selector = '[data-tab="' + index + '"]';
    this.attachChild(ctor, selector, context);
  };


  /**
   * Activates one tab and hides the rest.
   *
   * @method
   * @private
   * @param {Integer} index The tab to activate.
   */
  Tabs.prototype._activate = function (index) {
    var triggers = this.findDOMNodes('.ui-tabs-triggers li');
    var tabs = this.findDOMNodes('.ui-tabs-content');

    tabs.forEach(function (tab, i) {
      if (i === index) {
        triggers[i].addClass(this.activeClass);
        tab.addClass(this.activeClass);
      } else {
        triggers[i].removeClass(this.activeClass);
        tab.removeClass(this.activeClass);
      }
    }, this);
  };


  /**
   * Invoked on click.
   * 
   * @param {DOMNode} target The event's target.
   */
  Tabs.prototype._onClick = function (target) {
    var index = target.getSiblingIndex();
    this._activate(index);
  };


  // TODO: improve this
  /**
   * Generates the tab triggers and content placeholders.
   * This approach (vs. using a template) is a workaround
   * against the controller's limitation.
   *
   * @method
   * @private
   */
  Tabs.prototype._generateMarkup = function () {
    var html = '<ul class="ui-tabs-triggers">';

    for (var t = 0; t < this._totalTabs; t++) {
      html += '<li></li>';
    }

    html += '</ul>';

    for (t = 0; t < this._totalTabs; t++) {
      html += '<div class="ui-tabs-content" data-tab="' + (t + 1) + '"></div>';
    }

    this._host.innerHTML = html;
  };


  /* override */
  Tabs.prototype.template = '';


  /* override */
  Tabs.prototype.className = 'ui-tabs';


  /* override */
  Tabs.prototype.bindEvents = function () {
    Tabs.super.bindEvents.call(this);

    this.onDOMEvent(
      'click', this._onClick, this, '.ui-tabs-triggers li');

    this.after('ready', this._activate.bind(this, 0), this);
  };


  /* override */
  Tabs.prototype.destructor = function () {
    this._totalTabs = null;
    Tabs.super.destructor.call(this);
  };


  return Tabs;

});