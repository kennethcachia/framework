/**
 * @module lib/ui/range
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert'

], function (UIBase, inherit, Assert) {

  /**
   * An input range.
   * 
   * @alias module:lib/ui/range
   * @class
   * @extends UIBase
   * @param {DOMNode} domNode The component's host.
   * @param {Integer} min The range's minimum value.
   * @param {Integer} max The range's maximum value.
   * @param {Integer} step The range's step.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var Range = function (domNode, min, max, step, context, key) {
    Assert.isDefined(key);

    this._validateProperties(min, max, step);

    var properties = {
      min: min,
      max: max,
      step: step
    };

    Range.superClass.call(
      this, domNode, this.template, context, key, properties);
  };

  inherit(Range, UIBase);


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
  Range.prototype._validateProperties = function (min, max, step) {
    Assert.isInteger(min);
    Assert.isInteger(max);
    Assert.isInteger(step);
    Assert.isTruthy(max > min);
    Assert.isTruthy(min >= 0);
    Assert.isTruthy(step < max);
  };


  /**
   * The callback for the DOM onChange event.
   *
   * @method
   * @private
   * @param {Object} e The event object.
   */
  Range.prototype._onChange = function (e) {
    console.log(e.target.value);
    this._context[this._key] = e.target.value;
    this._sync(false);
  };


  /* override */
  Range.prototype.template = '<input min="{{min}}" max="{{max}}" step="{{step}}" value="{{@}}" type="range" />';


  /* override */
  Range.prototype.className = 'ui-range';


  /* override */
  Range.prototype.bindEvents = function () {
    Range.super.bindEvents.call(this);

    // TODO: improve and destroy.
    this.renderer.host._node.addEventListener(
      'change', this._onChange.bind(this));
  };


  return Range;

});