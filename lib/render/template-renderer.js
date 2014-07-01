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
   * Renders a template.
   *
   * @alias module:lib/render/template-renderer
   * @class
   * @extends AbstractRenderable
   * @param {String} template The template to compile.
   */
  var TemplateRenderer = function (template) {
    TemplateRenderer.superClass.call(this);

    Assert.isString(template);
    this._template = template;
  };

  inherit(TemplateRenderer, AbstractRenderable);


  /**
   * @property {DOMNode} anchor The DOMNode in which the template
   *                            will be rendered.
   */
  TemplateRenderer.prototype.anchor = null;


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
  TemplateRenderer.prototype._render = function (anchor, context) {
    Assert.isInstanceOf(anchor, DOMNode);

    if (Check.not.isUndefined(context)) {
      Assert.isObject(context);
    }

    this._context = context;
    this.anchor = anchor;

    this.anchor.innerHTML = this._compileTemplate();
    this.anchor.after('destroyed', this.destroy, this);
  };


  /* override */
  TemplateRenderer.prototype.destructor = function () {
    this._template = null;
    this._context = null;

    if (Check.not.isNull(this.anchor)) {
      this.anchor.innerHTML = '';
    }

    TemplateRenderer.super.destructor.call(this);
  };


  return TemplateRenderer;

});