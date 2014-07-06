/**
 * @module lib/ui/base
 */
define([

  'lib/controller/controller',
  'lib/base/inherit',
  'lib/render/template-renderer',
  'lib/base/properties'

], function (Controller, inherit, TemplateRenderer, Properties) {

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
      this, 'hiddenClass', this.hiddenClass);

    Properties.defineImmutableProperty(
      this, 'renderer', new TemplateRenderer(template));

    this.renderer.host = domNode;

    UIBase.superClass.call(this, this.renderer, context, key);

    this.bindEvents();
  };

  inherit(UIBase, Controller);


  /**
   * @default
   * @readOnly
   * @property {String} hiddenClass 
   *           The class added to the host when hidden.
   */
  UIBase.prototype.hiddenClass = 'ui-hidden';


  /**
   * @readOnly
   * @property {TemplateRenderer} renderer
   *           The TemplateRenderer used by this component.
   */
  UIBase.prototype.renderer = null;


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
    this.renderer.host.addClass(this.hiddenClass);
  };


  /**
   * Removes the hidden class from the renderer's host.
   *
   * @method
   */
  UIBase.prototype.show = function () {
    this.renderer.host.removeClass(this.hiddenClass);
  };


  return UIBase;

});