/**
 * @module lib/ui/label
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert'

], function (UIBase, inherit, Assert) {

  /**
   * A label.
   * 
   * @alias module:lib/ui/label
   * @class
   * @extends Base
   * @param {String} label
   *        A label to be displayed next to the checkbox.
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var Label = function (label) {
    Label.superClass.call(this, this.template, {});

    Assert.isString(label);
    this.addProperty('label', label);
  };

  inherit(Label, UIBase);


  /* override */
  Label.prototype.template = '<span>{{label}}</span>';


  /* override */
  Label.prototype.className = 'ui-label';


  return Label;

});