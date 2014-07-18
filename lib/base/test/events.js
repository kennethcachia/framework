/**
 * @module lib/base/test/events
 */
define(function () {

  function _createHTMLEvent(name) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(name, true, true);
    return e;
  }


  /**
   * @alias module:lib/base/test/events
   */
  var Events = {

    /**
     * Creates a change event.
     *
     * @method
     * @returns {Event} The Event object.
     */
    createChangeEvent: function () {
      return _createHTMLEvent('change');
    },


    /**
     * Creates a click event.
     *
     * @method
     * @returns {Event} The Event object.
     */
    createClickEvent: function () {
      return _createHTMLEvent('click');
    },


    /**
     * Creates a mousedown event.
     *
     * @method
     * @returns {Event} The Event object.
     */
    createMouseDownEvent: function () {
      return _createHTMLEvent('mousedown');
    }
  };


  return Events;

});