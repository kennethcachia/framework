/**
 * @module lib/base/test/simulate
 */
define([

  'lib/dom/node',
  'lib/base/assert',
  'lib/base/check'

], function (DOMNode, Assert, Check) {

  /**
   * @alias module:lib/base/test/simulate
   */
  var Simulate = {
    /**
     * Simulates a DOM Event.
     *
     * @method
     * @param {DOMNode|Node} node
     *        The DOMNode or Node on which the event will be dispatched.
     * @param {String} eventName The event to be simulated.
     */
    event: function (node, eventName) {
      if (Check.isInstanceOf(node, DOMNode)) {
        node = node._node;
      }

      Assert.isInstanceOf(node, Node);
      Assert.isString(eventName);

      _dispatchEvent(node, _createEvent(eventName));
    }
  };


  /**
   * Creates a new Event.
   *
   * @method
   * @private
   * @param {String} eventName The event to be created.
   * @returns {Event} The Event object.
   */
  function _createEvent(eventName) {
    var e;

    if (eventName.indexOf('mouse') === 0 || eventName === 'click') {
      e = _createMouseEvent(eventName);
    } else if (eventName.indexOf('touch') === 0) {
      e = _createTouchEvent(eventName);
    } else {
      e = _createHTMLEvent(eventName);
    }

    return e;
  }


  /**
   * Dispatches a previously created Event.
   *
   * @method
   * @private
   * @param {Node} node A DOM node.
   * @param {Event} e The event to be dispatched.
   */
  function _dispatchEvent(node, e) {
    node.dispatchEvent(e);
  }


  /**
   * Creates a Mouse Event.
   *
   * @method
   * @private
   * @param {String} eventName The event to be created.
   */
  function _createMouseEvent(eventName) {
    var e = document.createEvent('MouseEvent');

    e.initMouseEvent(
      // type, canBubble, cancelable, view and detail
      eventName, true, true, window, 0,
      // screenX and screen Y
      0, 0,
      // clientX and clientY
      0, 0,
      // keys pressed: CTRL, ALT, SHIFT and META
      0, 0, 0, 0,
      // Button
      0,
      // Related target
      null);

    return e;
  }


  /**
   * Creates a Touch Event.
   *
   * @method
   * @private
   * @param {String} eventName The event to be created.
   */
  function _createTouchEvent(eventName) {
    var e = document.createEvent('TouchEvent');
    e.initUIEvent(eventName, true, true);
    return e;
  }


  /**
   * Creates an HTML Event.
   *
   * @method
   * @private
   * @param {String} eventName The event to be created.
   */
  function _createHTMLEvent(eventName) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(eventName, true, true);
    return e;    
  }


  return Simulate;

});