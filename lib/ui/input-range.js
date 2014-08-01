/**
 * @module lib/ui/input-range
 */
define([

  'lib/ui/input-base',
  'lib/base/inherit',
  'lib/base/assert'

], function (InputBase, inherit, Assert) {

  /**
   * An input range.
   * 
   * @alias module:lib/ui/input-range
   * @class
   * @extends InputBase
   * @param {Integer} min The range's minimum value.
   * @param {Integer} max The range's maximum value.
   * @param {Integer} step The range's step.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var InputRange = function (min, max, step, context, key) {
    this._validateProperties(min, max, step);

    InputRange.superClass.call(this, context, key);

    this.addProperty('min', min);
    this.addProperty('max', max);
    this.addProperty('step', step);
  };

  inherit(InputRange, InputBase);


  /**
   * Validates the properties passed in
   * via the constructor.
   *
   * @method
   * @private
   * @param {Integer} min The range's minimum value.
   * @param {Integer} max The range's maximum value.
   * @param {Integer} step The range's step.
   */
  InputRange.prototype._validateProperties = function (min, max, step) {
    Assert.isNumber(min);
    Assert.isNumber(max);
    Assert.isNumber(step);
    Assert.isTruthy(max > min);
    Assert.isTruthy(step < max);
  };


  /* override */
  InputRange.prototype.template =
    '<input min="{{min}}" max="{{max}}" step="{{step}}" value="{{@}}" type="range" />';


  /* override */
  InputRange.prototype.className = 'ui-input-range';


  return InputRange;

});