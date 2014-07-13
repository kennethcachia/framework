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
    Assert.isString(template);

    TemplateRenderer.superClass.call(this);

    this._tokens = {};
    this._template = template;
    this._findTokens();
  };

  inherit(TemplateRenderer, AbstractRenderable);


  /**
   * Finds all the tokens in a template.
   * 
   * @method
   * @private
   */
  TemplateRenderer.prototype._findTokens = function () {
    var output = Mustache.parse(this._template);

    this._tokens = {};

    output.forEach(function (item) {
      if (item[0] === 'name' || item[0] === '#') {
        this._tokens[item[1]] = true;
      }
    }, this);
  };


  /**
   * Replaces all the old tokens with a new one.
   *
   * @method
   * @param {String} oldToken The token to be replaced.
   * @param {String} newToken The new value.
   *
   * @example
   *  var t = new TemplateRenderer('&lt;div&gt;{{name}}&lt;/div&gt;');
   *  t.replaceToken('name', 'surname');
   *  // &lt;div&gt;{{surname}}&lt;/div&gt;
   */
  TemplateRenderer.prototype.replaceToken = function (oldToken, newToken) {
    Assert.isString(oldToken);
    Assert.isString(newToken);

    var r = new RegExp(oldToken, 'g');

    // TODO: Improve - this will also replace non-tokens.
    this._template = this._template.replace(r, newToken);
    this._findTokens();
  };


  /**
   * Checks if the current template
   * uses any tokens.
   * 
   * @method
   * @returns {Boolean} True if it has tokens.
   */
  TemplateRenderer.prototype.hasTokens = function () {
    return (!Check.isEmpty(this._tokens));
  };


  /**
   * Determines if a token is being used.
   *
   * @method
   * @param {String} token The token to search for.
   * @returns {Boolean} True if it's being used.
   */
  TemplateRenderer.prototype.isTokenUsed = function (token) {
    var match = false;

    Object.keys(this._tokens).some(function (item) {
      match = (item === token) ? true : false;
      return match;
    });

    return match;
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
    this._tokens = null;

    TemplateRenderer.super.destructor.call(this);
  };


  return TemplateRenderer;

});