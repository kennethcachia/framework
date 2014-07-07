/**
 * @module lib/ui/abstract-input
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert'

], function (UIBase, inherit, Assert) {

  /**
   * An abstract input UI element. This class 
   * should not be used directly.
   * 
   * @alias module:lib/ui/abstract-input
   * @class
   * @extends UIBase
   * @param {DOMNode} domNode The component's host.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   * @param {Object=} properties The properties.
   */
  var AbstractInput = function (domNode, context, key, properties) {
    Assert.isDefined(key);

    AbstractInput.superClass.call(
      this, domNode, this.template, context, key, properties);
  };

  inherit(AbstractInput, UIBase);


  /**
   * The callback for the DOM onChange event.
   *
   * @method
   * @private
   * @param {Object} e The event object.
   */
  AbstractInput.prototype._onChange = function (e) {
    this._context[this._key] = e.target.value;
    this._sync(false);
  };


  /* override */
  AbstractInput.prototype.bindEvents = function () {
    AbstractInput.super.bindEvents.call(this);

    // TODO: improve and destroy.
    this.renderer.host._node.addEventListener(
      'change', this._onChange.bind(this));
  };


  return AbstractInput;

});