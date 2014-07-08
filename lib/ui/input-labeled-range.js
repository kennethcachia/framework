/**
 * @module lib/ui/input-labelled-range
 */
define([

  'lib/ui/input-range',
  'lib/base/inherit'

], function (InputRange, inherit) {

  /**
   * A labeled input range.
   * 
   * @alias module:lib/ui/input-labelled-range
   * @class
   * @extends InputRange
   * @param {DOMNode} domNode The component's host.
   * @param {String} label The range's label.
   * @param {Integer} min The range's minimum value.
   * @param {Integer} max The range's maximum value.
   * @param {Integer} step The range's step.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var InputLabeledRange = function (domNode, label, min, max, step, context, key) {
    InputLabeledRange.superClass.call(
      this, domNode, min, max, step, context, key);

    this.addProperty('label', label);
  };

  inherit(InputLabeledRange, InputRange);


  /* override */
  InputLabeledRange.prototype.template =
    '<div class="ui-input-range-label">{{label}}</div>' +
    '<input min="{{min}}" max="{{max}}" step="{{step}}" value="{{@}}" type="range" />' +
    '<div class="ui-input-range-min">{{min}}</div>' +
    '<div class="ui-input-range-max">{{max}}</div>';


  return InputLabeledRange;

});