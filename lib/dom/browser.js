/**
 * @module lib/dom/browser
 */
define(['lib/base/assert'], function (Assert) {

  /**
   * @method _isIOS
   * @private
   */
  function _isIOS() {
    return (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
  }


  /**
   * @method _supportsTouch
   * @private
   */
  function _supportsTouch() {
    return ('ontouchstart' in document.documentElement);
  }


  /**
   * @method _getGestureEvents
   * @private
   */
  function _getGestureEvents(type) {
    var mouse;
    var touch;

    switch (type) {
      case 'start':
        mouse = 'mousedown';
        touch = 'touchstart';
        break;
      case 'move':
        mouse = 'mousemove';
        touch = 'touchmove';
        break;
      case 'end':
        mouse = 'mouseup';
        touch = 'touchend';
        break;
    }

    return _supportsTouch() ? [mouse, touch] : [mouse];
  }


  /**
   * @method _getFastClickEvent
   * @private
   */
  function _getFastClickEvent() {
    return _isIOS() ? 'touchend' : 'click';
  }


  /**
   * @alias module:lib/dom/browser
   */
  var Browser = {
    /**
     * Adds an event listener to a node.
     *
     * @method
     * @param {Node} node The node.
     * @param {String} eventName The event name.
     * @param {Function} fn The callback function.
     */
    addEventListener: function (node, eventName, fn) {
      Assert.isInstanceOf(node, Node);
      Assert.isString(eventName);
      Assert.isFunction(fn);

      node.addEventListener(eventName, fn, false);
    },


    /**
     * Removes an event listener from a node.
     *
     * @method
     * @param {Node} node The node.
     * @param {String} eventName The event name.
     * @param {Function} fn The callback function.
     */
    removeEventListener: function (node, eventName, fn) {
      Assert.isInstanceOf(node, Node);
      Assert.isString(eventName);
      Assert.isFunction(fn);

      node.removeEventListener(eventName, fn, false);
    },


    /**
     * Checks if a node matches a given selector.
     *
     * @method
     * @param {Node} node The node to be checked.
     * @param {String} selector The selector.
     */
    matches: function (node, selector) {
      Assert.isInstanceOf(node, Node);
      Assert.isString(selector);

      var fn = node.matches || node.webkitMatchesSelector ||
               node.mozMatchesSelector || node.msMatchesSelector;

      return fn.call(node, selector);
    },


    /**
     * Checks if it's running on iOS.
     * 
     * @returns {Boolean} True if it's iOS.
     */
    isIOS: _isIOS,


    /**
     * Checks if it's running on IE.
     * 
     * @returns {Boolean} True if it's IE.
     */
    isIE: function () {
      return (navigator.userAgent.match(/(MSIE|Trident)/g) ? true : false);
    },


    /**
     * Checks if the current browser is running on a device
     * that supports touch events.
     * 
     * @returns {Boolean} True if supported.
     */
    supportsTouch: _supportsTouch,


    /**
     * @property {Array} GESTURE_START The gesture start event name(s).
     */
    GESTURE_START: _getGestureEvents.call(this, 'start'),


    /**
     * @property {Array} GESTURE_MOVE The gesture move event name(s).
     */
    GESTURE_MOVE: _getGestureEvents.call(this, 'move'),


    /**
     * @property {Array} GESTURE_END The gesture end event name(s).
     */
    GESTURE_END: _getGestureEvents.call(this, 'end'),


    /**
     * @property {String} FAST_CLICK Touchstart on iOS devices, click otherwise
     */
    FAST_CLICK: _getFastClickEvent.call(this)
  };


  return Browser;

});