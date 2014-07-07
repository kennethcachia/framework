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
   * @param {Object=} context The context to be applied.
   * @param {Object=} properties The properties to be applied.
   * @returns {String} The compiled template.
   */
  TemplateRenderer.prototype._compileTemplate = function (context, properties) {
    Assert.isString(this._template);

    if (Check.not.isUndefined(context)) {
      Assert.isObject(context);
    }

    var merged;

    if (Check.not.isUndefined(properties)) {
      Assert.isObject(properties);
      merged = Object.create(context);

      Object.keys(properties).forEach(function (key) {
        merged[key] = properties[key];
      });
    } else {
      merged = context;
    }

    return Mustache.render(this._template, merged);
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
  TemplateRenderer.prototype._render = function (context, properties) {
    Assert.isInstanceOf(this.host, DOMNode);
    this.host.innerHTML = this._compileTemplate(context, properties);
  };


  /* override */
  TemplateRenderer.prototype.destructor = function () {
    this._template = null;
    this._cleanHost();

    TemplateRenderer.super.destructor.call(this);
  };


  return TemplateRenderer;

});