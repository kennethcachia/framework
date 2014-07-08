/**
 * @module lib/ui/input-box
 */
define([

  'lib/ui/input-base',
  'lib/base/inherit'

], function (InputBase, inherit) {

  /**
   * An Input Box.
   * 
   * @alias module:lib/ui/input-box
   * @class
   * @extends InputBase
   * @param {DOMNode} domNode The component's host.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var InputBox = function (domNode, context, key) {
    InputBox.superClass.call(
      this, domNode, context, key);
  };

  inherit(InputBox, InputBase);


  /* override */
  InputBox.prototype.template = '<input value="{{@}}" />';


  /* override */
  InputBox.prototype.className = 'ui-input-box';


  return InputBox;

});