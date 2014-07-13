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
   * Fires a selected event.
   *
   * @method
   * @private
   * @param {Integer} index The item index.
   */
  Grid.prototype._selectItem = function (index) {
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

    // TODO: improve and destroy + delegate
    var items = this.findDOMNodes('.ui-grid-item');

    items.forEach(function (item, index) {
      item._node.addEventListener(
        'click', this._selectItem.bind(this, index));
    }, this);
  };


  return Grid;

});