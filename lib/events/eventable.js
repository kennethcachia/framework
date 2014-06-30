/**
 * @module lib/events/eventable
 */
define([

  'lib/base/abstract-destructable',
  'lib/base/inherit',
  'lib/events/listeners',
  'lib/base/assert',
  'lib/base/check'

], function (AbstractDestructable, inherit, Listeners, Assert, Check) {

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
   * @property {String} Before The prefix used by before().
   */
  Eventable.prototype.BEFORE = 'before-';


  /**
   * @property {String} After The prefix used by after().
   */
  Eventable.prototype.AFTER = 'after-';


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
    this.on(this.BEFORE + eventName, callback, context);
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
    this.on(this.AFTER + eventName, callback, context);
  };


  /**
   * Removes a callback that was previously associated
   * with an event name and a context.
   * 
   * @method
   * @param {String} eventName The event name.
   * @param {Function} callback The callback function.
   * @param {Object=} context The context to be applied to the
   *                          callback function. Null if undefined.
   * @param {String=} type The before or after prefix.
   * @throws Will throw an error if type is incorrect.
   */
  Eventable.prototype.off = function (eventName, callback, context, type) {
    if (Check.not.isUndefined(type)) {
      if (type !== this.AFTER && type !== this.BEFORE) {
        throw new Error('Incorrect type');
      } else {
        eventName = type + eventName;
      }
    }

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
    this._listeners.executeAll(this.BEFORE + eventName);
    this._listeners.executeAll(eventName);
    this._listeners.executeAll(this.AFTER + eventName);
  };


  /* override */
  Eventable.prototype.destructor = function () {
    this.fire('destroyed');
    this._listeners = null;
  };


  return Eventable;

});