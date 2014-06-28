/**
 * @module lib/base/assert
 */
define(['lib/base/check'], function (Check) {

  /**
   * @alias module:lib/base/assert
   */
  var Assert = {
    /**
     * Asserts that it's a function.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @throws Will throw an error if not a function.
     */
    isFunction: function (check) {
      if (!Check.isFunction(check)) {
        this._throwError('Not a Function');
      }
    },

    /**
     * Asserts that it's an object.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @throws Will throw an error if not an object.
     */
    isObject: function (check) {
      if (!Check.isObject(check)) {
        this._throwError('Not an object');
      }
    },

    /**
     * Asserts that it's defined.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @throws Will throw an error if not defined.
     */
    isDefined: function (check) {
      if (Check.isUndefined(check)) {
        this._throwError('Not defined');
      }
    },

    /**
     * Asserts that it's undefined.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @throws Will throw an error if not undefined.
     */
    isUndefined: function (check) {
      if (!Check.isUndefined(check)) {
        this._throwError('Not undefined');
      }
    },

    /**
     * Asserts that it's null.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @throws Will throw an error if not null.
     */
    isNull: function (check) {
      if (!Check.isNull(check)) {
        this._throwError('Not null');
      }
    },

    /**
     * Asserts that it's a string.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @throws Will throw an error if not a string.
     */
    isString: function (check) {
      if (!Check.isString(check)) {
        this._throwError('Not a string');
      }
    },

    /**
     * Throws a new error message.
     * 
     * @method
     * @private
     * @param {String} msg Error message to be thrown.
     * @throws Error.
     */
    _throwError: function (msg) {
      throw new Error(msg);
    }
  };


  return Assert;

});