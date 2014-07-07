/**
 * @module lib/ui/input-range
 */
define([

  'lib/ui/abstract-input',
  'lib/base/inherit',
  'lib/base/assert'

], function (AbstractInput, inherit, Assert) {

  /**
   * An input range.
   * 
   * @alias module:lib/ui/input-range
   * @class
   * @extends AbstractInput
   * @param {DOMNode} domNode The component's host.
   * @param {Integer} min The range's minimum value.
   * @param {Integer} max The range's maximum value.
   * @param {Integer} step The range's step.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var InputRange = function (domNode, min, max, step, context, key) {
    Assert.isDefined(key);

    this._validateProperties(min, max, step);

    var properties = {
      min: min,
      max: max,
      step: step
    };

    InputRange.superClass.call(
      this, domNode, context, key, properties);
  };

  inherit(InputRange, AbstractInput);


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
    Assert.isInteger(min);
    Assert.isInteger(max);
    Assert.isInteger(step);
    Assert.isTruthy(max > min);
    Assert.isTruthy(min >= 0);
    Assert.isTruthy(step < max);
  };


  /* override */
  InputRange.prototype.template = '<input min="{{min}}" max="{{max}}" step="{{step}}" value="{{@}}" type="range" />';


  /* override */
  InputRange.prototype.className = 'ui-range';


  return InputRange;

});