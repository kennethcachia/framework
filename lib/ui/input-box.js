/**
 * @module lib/ui/input-box
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/render/template-renderer',
  'lib/base/assert'

], function (UIBase, inherit, TemplateRenderer, Assert) {

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

    this._renderer = new TemplateRenderer(this.template);
    this._renderer.host = domNode;

    InputBox.superClass.call(this, this._renderer, context, key);

    this.addObjectToDestroy(this._renderer);
  };

  inherit(InputBox, UIBase);


  /**
   * @default &lt;input value="{{@}}" /&gt;
   * @property {String} template The component's template.
   */
  InputBox.prototype.template = '<input id="{{@}}" value="{{@}}" />';


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
  InputBox.prototype.bindEvents = function () {
    InputBox.super.bindEvents.call(this);

    // TODO: improve and destroy.
    this._renderer.host._node.addEventListener(
      'change', this._onChange.bind(this));
  };


  /* override */
  InputBox.prototype.destructor = function () {
    this._renderer = null;
    InputBox.super.destructor.call(this);
  };


  return InputBox;

});