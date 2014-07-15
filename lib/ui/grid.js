/**
 * @module lib/ui/grid
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert'

], function (UIBase, inherit, Assert) {

  /**
   * A grid of items that fires an event
   * on selection.
   * 
   * @alias module:lib/ui/grid
   * @class
   * @extends UIBase
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   */
  var Grid = function (context, key) {
    Assert.isString(key);
    Grid.superClass.call(this, this.template, context, key);
  };

  inherit(Grid, UIBase);


  /**
   * Invoked on click and fires a selected event.
   *
   * @method
   * @private
   * @param {DOMNode} target The event's target.
   */
  Grid.prototype._selectItem = function (target) {
    var item = target.getParent();
    var index = item.getChildIndex();

    this.fire('selected', {
      item: this._context[this._key][index]
    });
  };


  /* override */
  Grid.prototype.template =
    '{{#@}}' +
      '<div class="ui-grid-item">' +
        '<div class="ui-grid-item-intrinsic"></div>' +
      '</div>' +
    '{{/@}}';


  /* override */
  Grid.prototype.className = 'ui-grid';


  /* override */
  Grid.prototype.bindEvents = function () {
    Grid.super.bindEvents.call(this);

    this.onDOMEvent(
      'click', this._selectItem, this, '.ui-grid-item-intrinsic');
  };


  return Grid;

});