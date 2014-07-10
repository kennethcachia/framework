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
   * @param {Object} e The event object.
   */
  InputBase.prototype._onChange = function (e) {
    this._context[this._key] = e.target.value;
    this._sync(false);
  };


  /* override */
  InputBase.prototype.bindEvents = function () {
    InputBase.super.bindEvents.call(this);

    // TODO: improve and destroy.
    this._host._node.addEventListener(
      'change', this._onChange.bind(this));
  };


  return InputBase;

});