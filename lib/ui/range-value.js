/**
 * @module lib/ui/range-value
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/ui/input-range',
  'lib/ui/label',
  'lib/ui/input-box'

], function (UIBase, inherit, Assert, InputRange, Label, InputBox) {

  /**
   * An input UI that renders an InputRange, a Label and
   * an InputBox for a context value.
   * 
   * @alias module:lib/ui/range-value
   * @class
   * @extends UIBase
   * @param {String} label The component's label.
   * @param {Integer} min The range's minimum value.
   * @param {Integer} max The range's maximum value.
   * @param {Integer} step The range's step.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var RangeValue = function (label, min, max, step, context, key) {
    RangeValue.superClass.call(this, this.template, context);

    this.attachChild(
      InputRange, '.ui-range-value-range', min, max, step, context, key);

    this.attachChild(
      Label, '.ui-range-value-label', label);

    this.attachChild(
      InputBox, '.ui-range-value-value', context, key);
  };

  inherit(RangeValue, UIBase);


  /* override */
  RangeValue.prototype.template =
    '<div class="ui-range-value-range"></div>' +
    '<div class="ui-range-value-label"></div>' +
    '<div class="ui-range-value-value"></div>';


  /* override */
  RangeValue.prototype.className = 'ui-range-value';


  return RangeValue;

});