/**
 * @module lib/events/listeners
 */
define([

  'lib/base/abstract-destructable',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check'

], function (AbstractDestructable, inherit, Assert, Check) {

  /**
   * A list of callback functions organized
   * by event names.
   *
   * @alias module:lib/events/listeners
   * @class
   * @extends AbstractDestructable
   */
  var Listeners = function () {
    Listeners.superClass.call(this);
    this._callbacks = {};
  };

  inherit(Listeners, AbstractDestructable);

  /**
   * Adds an item to the list of callback functions
   * associated with an event name.
   *
   * @method
   * @param {String} eventName The event name.
   * @param {Function} callback The callback function.
   * @param {Object=} context The context to be applied to the
   *                          callback function. Null if undefined.
   */
  Listeners.prototype.add = function (eventName, callback, context) {
    Assert.isString(eventName);
    Assert.isFunction(callback);

    if (Check.not.isUndefined(context)) {
      Assert.isObject(context);
    } else {
      context = null;
    }

    if (Check.isUndefined(this._callbacks[eventName])) {
      this._callbacks[eventName] = [];
    }

    this._callbacks[eventName].push({
      fn: callback,
      context: context
    });
  };

  /**
   * Executes all the callback functions
   * associated with an event name.
   *
   * @method
   * @param {String} eventName The event name.
   */
  Listeners.prototype.executeAll = function (eventName) {
    Assert.isString(eventName);

    var callbacks = this._callbacks[eventName];

    if (Check.not.isUndefined(callbacks)) {
      callbacks.forEach(function (c) {
        c.fn.call(c.context);
      });
    }
  };

  /**
   * Removes all the callback functions that
   * match both the event name and context.
   *
   * @method
   * @param {String} eventName The event name.
   * @param {Function} callback The callback function.
   * @param {Object=} context The context to be applied to the
   *                          callback function. Null if undefined.
   * @throws Will throw an error if callback does not exist.
   */
  Listeners.prototype.remove = function (eventName, callback, context) {
    Assert.isString(eventName);
    Assert.isFunction(callback);

    if (Check.not.isUndefined(context) && Check.not.isNull(context)) {
      Assert.isObject(context);
    } else {
      context = null;
    }

    var callbacks = this._callbacks[eventName];

    if (Check.not.isUndefined(callbacks)) {
      var found = false;

      callbacks.forEach(function (c, i) {
        if (c.fn === callback && c.context === context) {
          callbacks.splice(i, 1);
          found = true;
        }
      });

      if (found === false) {
        throw new Error('Callback does not exist');
      }

      if (callbacks.length === 0) {
        delete this._callbacks[eventName];
      }
    }
  };

  /* override */
  Listeners.prototype.destructor = function () {
    Listeners.super.destructor.call(this);
    this._callbacks = null;
  };


  return Listeners;

});