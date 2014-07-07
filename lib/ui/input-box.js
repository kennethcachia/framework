/**
 * @module lib/ui/input-box
 */
define([

  'lib/ui/abstract-input',
  'lib/base/inherit',
  'lib/base/assert'

], function (AbstractInput, inherit, Assert) {

  /**
   * An Input Box.
   * 
   * @alias module:lib/ui/input-box
   * @class
   * @extends AbstractInput
   * @param {DOMNode} domNode The component's host.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var InputBox = function (domNode, context, key) {
    Assert.isDefined(key);

    InputBox.superClass.call(
      this, domNode, context, key);
  };

  inherit(InputBox, AbstractInput);


  /* override */
  InputBox.prototype.template = '<input value="{{@}}" />';


  /* override */
  InputBox.prototype.className = 'ui-input';


  return InputBox;

});