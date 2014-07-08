/**
 * @module lib/ui/base
 */
define([

  'lib/controller/controller',
  'lib/base/inherit',
  'lib/render/template-renderer',
  'lib/base/properties',
  'lib/base/assert',
  'lib/base/check'

], function (Controller, inherit, TemplateRenderer, Properties, Assert, Check) {

  // TODO: Add and detach events (destroy).

  /**
   * A base object for UI components.
   * 
   * @alias module:lib/ui/base
   * @class
   * @extends Controller
   * @param {DOMNode} domNode The component's host.
   * @param {String} template The template to compile.
   * @param {Object} context The context.
   * @param {String=} key The context item to be updated.
   */
  var UIBase = function (domNode, template, context, key) {
    Properties.defineImmutableProperty(
      this, 'template', template);

    Properties.defineImmutableProperty(
      this, 'renderer', new TemplateRenderer(template));

    Properties.defineImmutableProperty(
      this, 'className', this.className);

    Properties.defineImmutableProperty(
      this, 'hiddenClass', this.hiddenClass);

    this.renderer.host = domNode;

    if (Check.isString(this.className)) {
      this.renderer.host.addClass(this.className);
    }

    this.renderer.host.addClass('ui');

    UIBase.superClass.call(this, this.renderer, context, key);

    this.after('attached', this.bindEvents, this);
  };

  inherit(UIBase, Controller);


  // TODO make template and hiddenClass private?

  /**
   * @readOnly
   * @property {String} template
   *           The template to compile.
   */
  UIBase.prototype.template = null;


  /**
   * @readOnly
   * @property {TemplateRenderer} renderer
   *           The TemplateRenderer used by this component.
   */
  UIBase.prototype.renderer = null;


  /**
   * @readOnly
   * @default ui
   * @property {String} className
   *           The className added on the component's host.
   */
  UIBase.prototype.className = null;


  /**
   * @default
   * @readOnly
   * @property {String} hiddenClass 
   *           The class added to the host when hidden.
   */
  UIBase.prototype.hiddenClass = 'ui-hidden';


  /**
   * An optional method that can be used
   * to bind DOM events.
   * 
   * @method
   */
  UIBase.prototype.bindEvents = function () {};


  /**
   * Adds the hidden class on the renderer's host.
   *
   * @method
   */
  UIBase.prototype.hide = function () {
    Assert.isTruthy(this._isAttached);
    this.renderer.host.addClass(this.hiddenClass);
  };


  /**
   * Removes the hidden class from the renderer's host.
   *
   * @method
   */
  UIBase.prototype.show = function () {
    Assert.isTruthy(this._isAttached);
    this.renderer.host.removeClass(this.hiddenClass);
  };


  return UIBase;

});