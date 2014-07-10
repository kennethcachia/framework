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
  };

  inherit(TemplateRenderer, AbstractRenderable);


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


  /* override */
  TemplateRenderer.prototype._render = function (host, context, properties) {
    Assert.isInstanceOf(host, DOMNode);
    host.innerHTML = this._compileTemplate(context, properties);
  };


  /* override */
  TemplateRenderer.prototype.destructor = function () {
    this._template = null;
    TemplateRenderer.super.destructor.call(this);
  };


  return TemplateRenderer;

});