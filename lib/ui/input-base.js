/**
 * @module lib/ui/input-base
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert'

], function (UIBase, inherit, Assert) {

  /**
   * An base input UI element. This class 
   * should not be used directly.
   * 
   * @alias module:lib/ui/input-base
   * @class
   * @extends UIBase
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var InputBase = function (context, key) {
    Assert.isDefined(key);

    InputBase.superClass.call(
      this, this.template, context, key);
  };

  inherit(InputBase, UIBase);


  /**
   * The callback for the DOM onChange event.
   *
   * @method
   * @private
   * @param {DOMNode} target The event's target.
   */
  InputBase.prototype._onChange = function (target) {
    this._context[this._key] = target._node.value;
    this._sync(false);
  };


  /* override */
  InputBase.prototype.bindEvents = function () {
    InputBase.super.bindEvents.call(this);
    this.onDOMEvent('change', this._onChange, this);
  };


  return InputBase;

});