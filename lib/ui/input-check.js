/**
 * @module lib/ui/input-check
 */
define([

  'lib/ui/input-base',
  'lib/base/inherit',
  'lib/base/assert'

], function (InputBase, inherit, Assert) {

  /**
   * A check box.
   * 
   * @alias module:lib/ui/input-check
   * @class
   * @extends InputBase
   * @param {String} label
   *        A label to be displayed next to the checkbox.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var InputCheck = function (label, context, key) {
    InputCheck.superClass.call(this, context, key);

    Assert.isString(label);
    Assert.isBoolean(context[key]);

    this.addProperty('label', label);
  };

  inherit(InputCheck, InputBase);


  /* override */
  InputCheck.prototype.template =
    '<input {{#@}}checked{{/@}} type="checkbox" />' + 
    '<span>{{label}}</span>';


  /* override */
  InputCheck.prototype.className = 'ui-input-check';


  /* override */
  InputCheck.prototype._onChange = function (target) {
    this._context[this._key] = target._node.checked;
    this._sync(false);
  };


  return InputCheck;

});