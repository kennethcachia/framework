/**
 * @module lib/base/inherit
 */
define(function () {

  /**
   * Inherits an object.
   *
   * @alias module:lib/base/inherit
   * @param {Object} ctor The object to augment.
   * @param {Object} base The object that's being inherited.
   */
  var Inherit = function (ctor, base) {
    var Final = ctor;
    var Temp = function () {};

    Temp.prototype = base.prototype;
    Temp.prototype = new Temp();

    Final.prototype = Temp.prototype;

    return Final;
  };


  return Inherit;

});