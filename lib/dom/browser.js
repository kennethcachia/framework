/**
 * @module lib/dom/browser
 */
define(['lib/base/assert'], function (Assert) {

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
     * @returns {Boolean} True if iOS.
     */
    isIOS: function () {
      return (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
    },


    /**
     * Checks if the current browser is running on a device
     * that supports touch events.
     * 
     * @returns {Boolean} True if supported.
     */
    supportsTouch: function () {
      return ('ontouchstart' in document.documentElement);
    },


    /**
     * Returns a list of event names. By default, [mouse*] is returned but
     * touch* is appended to the list if the browser supports touch events.
     * 
     * @param {String} type Up, down or move.
     * @returns {Array} A list of event names.
     * @example
     *   Browser.getInteractionEvents('down');
     *   // returns ['mousedown', 'touchdown']
     */
    getInteractionEvents: function (type) {
      Assert.isTruthy(['up', 'down', 'move'].indexOf(type) !== -1);

      var standard = 'mouse' + type;
      var touch = 'touch' + type;

      var events = [standard];

      if (this.supportsTouch()) {
        events.push(touch);
      }

      return events;
    }
  };


  return Browser;

});