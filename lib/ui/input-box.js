/**
 * @module lib/ui/input-box
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert'

], function (UIBase, inherit, Assert) {

  /**
   * An Input Box.
   * 
   * @alias module:lib/ui/input-box
   * @class
   * @extends UIBase
   * @param {DOMNode} domNode The component's host.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var InputBox = function (domNode, context, key) {
    Assert.isDefined(key);

    InputBox.superClass.call(
      this, domNode, this.template, context, key);
  };

  inherit(InputBox, UIBase);


  /**
   * The callback for the DOM onChange event.
   *
   * @method
   * @private
   * @param {Object} e The event object.
   */
  InputBox.prototype._onChange = function (e) {
    this._context[this._key] = e.target.value;
    this._sync(false);
  };


  /* override */
  InputBox.prototype.template = '<input value="{{@}}" />';


  /* override */
  InputBox.prototype.className = 'ui-input';


  /* override */
  InputBox.prototype.bindEvents = function () {
    InputBox.super.bindEvents.call(this);

    // TODO: improve and destroy.
    this.renderer.host._node.addEventListener(
      'change', this._onChange.bind(this));
  };


  return InputBox;

});