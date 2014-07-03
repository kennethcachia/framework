/**
 * @module lib/render/template-renderer
 */
define([

  'lib/render/abstract-renderable',
  'lib/base/inherit',
  'lib/third-party/mustache',
  'lib/base/properties',
  'lib/base/assert',
  'lib/base/check',
  'lib/dom/node'

], function (AbstractRenderable, inherit, Mustache, Properties, Assert, Check, DOMNode) {

  /**
   * Renders a template.
   *
   * @alias module:lib/render/template-renderer
   * @class
   * @extends AbstractRenderable
   * @param {String} template The template to compile.
   */
  var TemplateRenderer = function (template) {
    TemplateRenderer.superClass.call(this);

    this._template = template;

    Properties.defineMutableAccessor(this, 'host',
      this.host, this._hostGetter, this._hostSetter);
  };

  inherit(TemplateRenderer, AbstractRenderable);


  /**
   * @default
   * @property {DOMNode|null} host The DOMNode in which the template
   *                                will be rendered. Required by the 
   *                                time render() is called.
   */
  TemplateRenderer.prototype.host = null;


  /**
   * Getter for host.
   *
   * @method
   * @private
   * @param {*} val The current value.
   * @return {DOMNode|null} The host's current value or null.
   */
  TemplateRenderer.prototype._hostGetter = function (val) {
    if (Check.not.isNull(val)) {
      Assert.isInstanceOf(val, DOMNode);
    }

    return val;
  };


  /**
   * Setter for host.
   *
   * @method
   * @private
   * @param {*} val The new value.
   * @return {DOMNode|null} The host's new value or null.
   */
  TemplateRenderer.prototype._hostSetter = function (val) {
    this._cleanHost();

    if (Check.not.isNull(val)) {
      Assert.isInstanceOf(val, DOMNode);      
      val.after('destroyed', this.destroy, this);
    }

    return val;
  };


  /**
   * Compiles the template using Mustache.
   * 
   * @method
   * @private
   * @param {Object|undefined} context The context to be applied.
   * @returns {String} The compiled template.
   */
  TemplateRenderer.prototype._compileTemplate = function (context) {
    Assert.isString(this._template);

    if (Check.not.isUndefined(context)) {
      Assert.isObject(context);
    }

    return Mustache.render(this._template, context);
  };


  /**
   * Resets the host's content and detaches
   * the destroy event.
   * 
   * @method
   * @private
   */
  TemplateRenderer.prototype._cleanHost = function () {
    if (Check.not.isNull(this.host)) {
      this.host.off('destroyed', this.destroy, this, this.host.AFTER);
      this.host.innerHTML = '';
    }
  };


  /* override */
  TemplateRenderer.prototype._render = function (context) {
    Assert.isInstanceOf(this.host, DOMNode);
    this.host.innerHTML = this._compileTemplate(context);
  };


  /* override */
  TemplateRenderer.prototype.destructor = function () {
    this._template = null;
    this._cleanHost();

    TemplateRenderer.super.destructor.call(this);
  };


  return TemplateRenderer;

});