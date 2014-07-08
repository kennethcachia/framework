/**
 * @module lib/ui/input-color
 */
define([

  'lib/ui/abstract-input',
  'lib/base/inherit'

], function (AbstractInput, inherit) {

  /**
   * A color picker.
   * 
   * @alias module:lib/ui/input-color
   * @class
   * @extends AbstractInput
   * @param {DOMNode} domNode The component's host.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var InputColor = function (domNode, context, key) {
    InputColor.superClass.call(
      this, domNode, context, key);
  };

  inherit(InputColor, AbstractInput);


  /* override */
  InputColor.prototype.template = '<input value="{{@}}" type="color" />';


  /* override */
  InputColor.prototype.className = 'ui-input-color';


  return InputColor;

});