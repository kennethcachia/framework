/**
 * @module lib/base/assert
 */
define(function () {

  /**
   * @alias module:lib/base/assert
   */
  var Assert = {
    /**
     * Asserts that fn is a function.
     *
     * @method
     * @param {Function} fn The function to be checked.
     */
    isFunction: function (fn) {
      if (!(fn instanceof Function)) {
        this._throwError('fn is not a Function');
      }
    },

    /**
     * Asserts that the obj is defined.
     * 
     * @method
     * @param {Object} obj The object to be checked.
     */
    isDefined: function (obj) {
      if (obj === undefined) {
        this._throwError('obj is not defined');
      }
    },

    /**
     * Asserts that str is a string.
     *
     * @method
     * @param {String} str The string to be checked.
     */
    isString: function (str) {
      if (typeof str !== 'string') {
        this._throwError('str is not a string');
      }
    },

    /**
     * Throws a new error message.
     * 
     * @method
     * @private
     * @param {String} msg Error message to be thrown.
     */
    _throwError: function (msg) {
      throw new Error(msg);
    }
  };


  return Assert;

});