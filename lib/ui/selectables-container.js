/**
 * @module lib/ui/selectables-container
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check',
  'lib/dom/browser'

], function (UIBase, inherit, Assert, Check, Browser) {

  /**
   * Transforms all of its child DOMNodes that match
   * a given selector to selectable objects. Supports
   * both mouse and touch events.
   * 
   * @alias module:lib/ui/selectables-container
   * @class
   * @extends UIBase
   * @param {String} selectables
   *        The selector a child DOMNode must match in order
   *        to be taken into consideration.
   * @param {String} template The template to compile.
   * @param {Object} context The context.
   * @param {String=} key The context item to be updated.
   */
  var SelectablesContainer = function (selectables, template, context, key) {
    Assert.isString(selectables);

    SelectablesContainer.superClass.call(this, template, context, key);

    this._activeChild = null;
    this._selectables = selectables;
  };

  inherit(SelectablesContainer, UIBase);


  /**
   * The callback function for the gesture's start event.
   *
   * @method
   * @private
   */
  SelectablesContainer.prototype._onStart = function (domNode) {
    // TODO: avoid ._node
    if (Browser.matches(domNode._node, this._selectables)) {
      this._selectChild(domNode);
    } else {
      this._deselectChild();
    }
  };


  /**
   * Selects a child DOMNode and fires a selected event.
   *
   * @method
   * @private
   * @param {DOMNode} domNode The selected child.
   */
  SelectablesContainer.prototype._selectChild = function (domNode) {
    this._activeChild = domNode;

    this.fire('selected', {
      domNode: domNode
    });
  };


  /**
   * Resets the selected child and fires a deselected event.
   *
   * @method
   * @private
   */
  SelectablesContainer.prototype._deselectChild = function () {
    this._activeChild = null;
    this.fire('deselected');
  };


  /* override */
  SelectablesContainer.prototype.bindEvents = function () {
    SelectablesContainer.super.bindEvents.call(this);

    this.onDOMEvent(
      Browser.GESTURE_START, this._onStart, this);
  };


  /* override */
  SelectablesContainer.prototype.destructor = function () {
    this._activeChild = null;
    this._selectables = null;

    SelectablesContainer.super.destructor.call(this);
  };


  return SelectablesContainer;

});