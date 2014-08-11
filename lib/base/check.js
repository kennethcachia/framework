/**
 * @module lib/base/check
 */
define(function () {

  /**
   * @alias module:lib/base/check
   */
  var Check = {
    /**
     * Checks for a function.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @returns {Boolean} True if it's a function.
     */
    isFunction: function (check) {
      return (check instanceof Function) ? true : false;
    },


    /**
     * Checks for an object.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @returns {Boolean} True if it's an object.
     */
    isObject: function (check) {
      var notNull = Check.not.isNull(check);
      var notArray = Check.not.isArray(check);

      return notNull && notArray && (typeof check === 'object') ? true : false;
    },


    /**
     * Checks for an array.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @returns {Boolean} True if it's an array.
     */
    isArray: function (check) {
      return (Array.isArray(check));
    },


    /**
     * Checks for an undefined.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @returns {Boolean} True if it's undefined.
     */
    isUndefined: function (check) {
      return (check === undefined) ? true : false;
    },


    /**
     * Checks for a null.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @returns {Boolean} True if it's null.
     */
    isNull: function (check) {
      return (check === null) ? true : false;
    },


    /**
     * Checks for a string.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @returns {Boolean} True if it's a string.
     */
    isString: function (check) {
      return (typeof check === 'string') ? true : false;
    },


    /**
     * Checks for an integer.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @returns {Boolean} True if it's an integer.
     */
    isInteger: function (check) {
      return (check === parseInt(check));
    },


    /**
     * Checks for a number.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @returns {Boolean} True if it's a number.
     */
    isNumber: function (check) {
      return Check.not.isBoolean(check) && Check.not.isNull(check) && !isNaN(check);
    },


    /**
     * Checks for a boolean.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @returns {Boolean} True if it's a boolean.
     */
    isBoolean: function (check) {
      return (check === true || check === false);
    },


    /**
     * Checks for an instanceof.
     *
     * @method
     * @param {*} check The entity to be checked.
     * @param {*} type The type being checked for.
     * @returns {Boolean} True if it's the correct type.
     */
    isInstanceOf: function (check, type) {
      return (check instanceof type) ? true : false;
    },


    /**
     * Checks for empty.
     * 
     * @param  {*} check The entity to be checked.
     * @returns {Boolean} True if it's empty.
     */
    // TODO: add other checks: Array, String
    isEmpty: function (check) {
      var empty = true;

      if (Check.isObject(check)) {
        empty = (Object.keys(check).length === 0);
      }

      return empty;
    },


    /**
     * Checks if a subsequent check is falsy.
     * Can chain any method defined on Check.
     *
     * @example Check.not.isObject(..);
     * @inner
     */
    not: {}
  };


  function not(chained) {
    var args = Array.prototype.slice.call(arguments, 1);
    var result = Check[chained].apply(this, args);

    return (result === false) ? true : false;
  }

  for (var chained in Check) {
    if (chained !== 'not') {
      Check.not[chained] = not.bind(this, chained);
    }
  }


  return Check;

});