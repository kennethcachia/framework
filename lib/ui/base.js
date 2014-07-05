/**
 * @module lib/ui/base
 */
define([

  'lib/controller/controller',
  'lib/base/inherit',
  'lib/base/properties'

], function (Controller, inherit, Properties) {

  // TODO: Add and detach events (destroy).

  /**
   * A base object for UI components.
   * 
   * @alias module:lib/ui/base
   * @class
   * @extends Controller
   * @param {AbstractRenderable} renderable The renderable.
   * @param {Object} context The context.
   */
  var UIBase = function (renderable, context, key) {
    this._renderable = renderable;

    Properties.defineImmutableProperty(
      this, 'hiddenClass', this.hiddenClass);

    UIBase.superClass.call(this, renderable, context, key);

    this.bindEvents();
  };

  inherit(UIBase, Controller);


  /**
   * @default
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
   * Adds the hidden class on the renderable's host.
   *
   * @method
   */
  UIBase.prototype.hide = function () {
    this._renderable.host.addClass(this.hiddenClass);
  };


  /**
   * Removes the hidden class from the renderable's host.
   *
   * @method
   */
  UIBase.prototype.show = function () {
    this._renderable.host.removeClass(this.hiddenClass);
  };


  return UIBase;

});