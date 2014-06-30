/**
 * @module lib/events/eventable
 */
define([

  'lib/base/abstract-destructable',
  'lib/base/inherit',
  'lib/events/listeners'

], function (AbstractDestructable, inherit, Listeners) {

  var BEFORE = 'before-';
  var AFTER = 'after-';

  /**
   * Fires and listens for custom events.
   *
   * @alias module:lib/events/eventable
   * @class
   * @extends AbstractDestructable
   */
  var Eventable = function () {
    Eventable.superClass.call(this);

    this._listeners = new Listeners();
    this.addObjectToDestroy(this._listeners);
  };

  inherit(Eventable, AbstractDestructable);

  /**
   * Associates a callback function with
   * an event name.
   *
   * @method
   * @param {String} eventName The event name.
   * @param {Function} callback The callback function.
   * @param {Object=} context The context to be applied to the
   *                          callback function. Null if undefined.
   */
  Eventable.prototype.on = function (eventName, callback, context) {
    this._listeners.add(eventName, callback, context);
  };

  /**
   * Associates a callback function with
   * an event name. Such callback will
   * be invoked before those registered
   * using on().
   *
   * @method
   * @param {String} eventName The event name.
   * @param {Function} callback The callback function.
   * @param {Object=} context The context to be applied to the
   *                          callback function. Null if undefined.
   */
  Eventable.prototype.before = function (eventName, callback, context) {
    this.on(BEFORE + eventName, callback, context);
  };

  /**
   * Associates a callback function with
   * an event name. Such callback will
   * be invoked after those registered
   * using on().
   *
   * @method
   * @param {String} eventName The event name.
   * @param {Function} callback The callback function.
   * @param {Object=} context The context to be applied to the
   *                          callback function. Null if undefined.
   */
  Eventable.prototype.after = function (eventName, callback, context) {
    this.on(AFTER + eventName, callback, context);
  };

  /**
   * Removes a callback that was associated with
   * an event name and a context.
   * 
   * @method
   * @param {String} eventName The event name.
   * @param {Function} callback The callback function.
   * @param {Object=} context The context to be applied to the
   *                          callback function. Null if undefined.
   */
  Eventable.prototype.off = function (eventName, callback, context) {
    this._listeners.remove(eventName, callback, context);
  };

  /**
   * Executes all the callback functions that
   * are associated with an event name.
   * 
   * @method
   * @param {String} eventName The event name.
   */
  Eventable.prototype.fire = function (eventName) {
    this._listeners.executeAll(BEFORE + eventName);
    this._listeners.executeAll(eventName);
    this._listeners.executeAll(AFTER + eventName);
  };

  /* override */
  Eventable.prototype.destructor = function () {
    Eventable.super.destructor.call(this);
    this._listeners = null;
  };


  return Eventable;

});