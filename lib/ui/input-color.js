/**
 * @module lib/ui/input-color
 */
define([

  'lib/ui/input-base',
  'lib/base/inherit'

], function (InputBase, inherit) {

  /**
   * A color picker.
   * 
   * @alias module:lib/ui/input-color
   * @class
   * @extends InputBase
   * @param {DOMNode} domNode The component's host.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var InputColor = function (domNode, context, key) {
    InputColor.superClass.call(
      this, domNode, context, key);
  };

  inherit(InputColor, InputBase);


  /* override */
  InputColor.prototype.template = '<input value="{{@}}" type="color" />';


  /* override */
  InputColor.prototype.className = 'ui-input-color';


  return InputColor;

});