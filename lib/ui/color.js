/**
 * @module lib/ui/color
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/ui/input-labeled-range',
  'lib/ui/input-color'

], function (UIBase, inherit, Assert, InputLabeledRange, InputColor) {

  /**
   * A color UI that manages the value of a color using a 
   * color picker and its opacity by using an input range.
   * 
   * @alias module:lib/ui/color
   * @class
   * @extends UIBase
   * @param {String} label The color's label.
   * @param {Object} context The context.
   * @param {String} opacity
   *        The context item that holds the opacity value.
   * @param {String} color
   *        The context item that holds the color value.
   */
  var Color = function (label, context, opacity, color) {
    Assert.isString(opacity);
    Assert.isString(color);

    Color.superClass.call(this, this.template, context);

    this.attachChild(
      InputLabeledRange, '.ui-color-opacity', label,
      0, 100, 1, context, opacity);

    this.attachChild(
      InputColor, '.ui-color-value', context, color);
  };

  inherit(Color, UIBase);


  /* override */
  Color.prototype.template =
    '<div class="ui-color-opacity"></div>' +
    '<div class="ui-color-value"></div>';


  /* override */
  Color.prototype.className = 'ui-color';


  return Color;

});