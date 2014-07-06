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
   * @param {DOMNode} domNode The component's host.
   */
  var Tabs = function (tabs, domNode) {
    Assert.isInteger(tabs);

    Properties.defineImmutableProperty(
      this, 'activeClass', this.activeClass);

    Tabs.superClass.call(
      this, domNode, this.template, {
        tabs: new Array(tabs)
      });

    this._activate(0);
  };

  inherit(Tabs, UIBase);


  /**
   * @property {String} activeClass
   *           The class added on the active 
   *           trigger and tab.
   */
  Tabs.prototype.activeClass = 'ui-tabs-active';


  /**
   * Activates one tab and hides the rest.
   *
   * @method
   * @private
   * @param {Integer} index The tab to activate.
   */
  Tabs.prototype._activate = function (index) {
    var triggers = this._getTriggers();
    var tabs = this._getTabs();

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
   * Returns all tabs.
   *
   * @method
   * @private
   * @returns {Array}
   *          An array of DOMNodes, one for each tab.
   */
  Tabs.prototype._getTabs = function () {
    return this.renderer.host.all('.ui-tabs-content');
  };


  /**
   * Returns all triggers.
   *
   * @method
   * @private
   * @returns {Array}
   *          An array of DOMNodes, one for each trigger.
   */
  Tabs.prototype._getTriggers = function () {
    return this.renderer.host.all('.ui-tabs-triggers li');
  };


  /* override */
  Tabs.prototype.template =
    '<ul class="ui-tabs-triggers">' +
      '{{#tabs}}<li></li>{{/tabs}}' +
    '</ul>' +
    '{{#tabs}}' +
      '<div class="ui-tabs-content"></div>' +
    '{{/tabs}}';


  /* override */
  Tabs.prototype.className = 'ui-tabs';


  /* override */
  Tabs.prototype.bindEvents = function () {
    Tabs.super.bindEvents.call(this);

    var tabs = this._getTabs();

    // TODO: improve and destroy.
    tabs.forEach(function (tab, i) {
      tab._node.addEventListener(
        'click', this._activate.bind(this, i));
    }, this);
  };


  return Tabs;

});