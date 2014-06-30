/**
 * @module lib/render/template-renderer
 */
define([

  'lib/render/abstract-renderable',
  'lib/base/inherit',
  'lib/third-party/mustache',
  'lib/base/assert',
  'lib/base/check',
  'lib/dom/node'

], function (AbstractRenderable, inherit, Mustache, Assert, Check, DOMNode) {

  /**
   * Renders a template into a DOMNode.
   *
   * @alias module:lib/render/template-renderer
   * @class
   * @extends AbstractRenderable
   * @param {String} template The template to compile.
   * @param {DOMNode} domNode The DOMNode in which the
   *                          compiled template is injected.
   */
  var TemplateRenderer = function (template, domNode, context) {
    TemplateRenderer.superClass.call(this);

    Assert.isString(template);
    Assert.isInstanceOf(domNode, DOMNode);

    if (Check.not.isUndefined(context)) {
      Assert.isObject(context);
    }

    this._context = context;
    this._template = template;
    this._domNode = domNode;

    this._domNode.after('destroyed', this.destroy, this);
  };

  inherit(TemplateRenderer, AbstractRenderable);


  /**
   * Compiles the template using Mustache.
   * 
   * @method
   * @returns {String} The compiled template.
   */
  TemplateRenderer.prototype._compileTemplate = function () {
    return Mustache.render(this._template, this._context);
  };


  /* override */
  TemplateRenderer.prototype._render = function () {
    this._domNode.innerHTML = this._compileTemplate();
  };


  /* override */
  TemplateRenderer.prototype.destructor = function () {
    this._template = null;
    this._domNode.innerHTML = '';
    this._context = null;

    TemplateRenderer.super.destructor.call(this);
  };


  return TemplateRenderer;

});