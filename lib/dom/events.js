/**
 * @module lib/dom/events
 */
define([

  'lib/base/abstract-destructable',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check',
  'lib/dom/node',
  'lib/dom/browser'

], function (AbstractDestructable, inherit, Assert, Check, DOMNode, Browser) {

  /**
   * Maintains a list of DOM events for a DOMNode.
   *
   * @alias module:lib/dom/events
   * @class
   * @extends Eventable
   * @param {DOMNode} domNode The DOMNode.
   */
  var DOMEvents = function (domNode) {
    Assert.isInstanceOf(domNode, DOMNode);

    DOMEvents.superClass.call(this);

    this._domNode = domNode;
    this._listeners = [];
  };

  inherit(DOMEvents, AbstractDestructable);


  /**
   * Adds a new event listener to the DOMNode. Alternatively, events
   * can be delegated to the DOMNode if a selector is specified.
   *
   * @method
   * @param {Array|String} eventNames The events to listen for.
   * @param {Function} callback The event's callback function.
   * @param {Object} context
   *        The context applied to the callback function when invoked.
   * @param {String=} selector
   *        If specified, the callback function will only be invoked
   *        if the event's target matches this selector.
   */
  DOMEvents.prototype.add = function (eventNames, callback, context, selector) {
    // TODO: use array check
    if (Check.isString(eventNames)) {
      eventNames = [eventNames];
    }

    eventNames.forEach(function (name) {
      this._register(name, callback, context, selector);
    }, this);
  };


  /**
   * Detaches all the callbacks.
   * 
   * @method
   */
  DOMEvents.prototype.purge = function () {
    this._listeners.forEach(function (listener) {
      Browser.removeEventListener(
        listener.node, listener.eventName, listener.fn);
    });

    this._listeners = [];
  };


  /**
   * Registers a new callback function for a given event.
   * 
   * @method
   * @param {String} eventName The event name.
   * @param {Function} callback The event's callback function.
   * @param {Object} context
   *        The context applied to the callback function when invoked.
   * @param {String=} selector
   *        If specified, the callback function will only be invoked
   *        if the event's target matches this selector.
   */
  DOMEvents.prototype._register = function (eventName, callback, context, selector) {
    Assert.isString(eventName);
    Assert.isFunction(callback);
    Assert.isObject(context);

    if (Check.not.isUndefined(selector)) {
      Assert.isString(selector);
    }

    var fn = this._delegator.bind(
      this, callback, context, selector);

    Browser.addEventListener(this._domNode._node, eventName, fn);

    this._listeners.push({
      node: this._domNode._node,
      eventName: eventName,
      fn: fn
    });
  };


  /**
   * Executes the callback function. If a selector is specified,
   * it first checks if the event's target matches the
   * selector before invoking the callback function.
   *
   * @method
   * @private
   * @param {Function} callback The event's callback function.
   * @param {Object} context
   *        The context applied to the callback function when invoked.
   * @param {String=} selector
   *        If specified, the callback function will only be invoked
   *        if the event's target matches this selector.
   * @param {Event} e The event's object.
   */
  DOMEvents.prototype._delegator = function (callback, context, selector, e) {
    var executeFn = false;

    if (Check.not.isUndefined(selector)) {
      executeFn = Browser.matches(e.target, selector);
    } else {
      executeFn = true;
    }

    if (executeFn) {
      callback.call(context, new DOMNode(e.target), e);
    }
  };


  /* override */
  DOMEvents.prototype.destructor = function () {
    this.purge();

    this._domNode = null;
    this._listeners = null;
  };


  return DOMEvents;

});