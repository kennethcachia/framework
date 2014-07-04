/**
 * @module lib/ui/base
 */
define([

  'lib/controller/controller',
  'lib/base/inherit'

], function (Controller, inherit) {

  /**
   * Implements a base object for UI components.
   * 
   * @alias module:lib/ui/base
   * @class
   * @extends Controller
   * @param {AbstractRenderable} renderable The renderable.
   * @param {Object} context The context.
   */
  var UIBase = function (renderable, context, key) {
    UIBase.superClass.call(this, renderable, context, key);
    this.bindEvents();
  };

  inherit(UIBase, Controller);


  /**
   * An optional method that can be used
   * to register any DOM events.
   * 
   * @method
   */
  UIBase.prototype.bindEvents = function () {};


  return UIBase;

});