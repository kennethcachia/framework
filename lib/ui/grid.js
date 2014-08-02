/**
 * @module lib/ui/grid
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check'

], function (UIBase, inherit, Assert, Check) {

  // TODO: use selectable container.

  /**
   * A grid of items that fires an event
   * on selection.
   * 
   * @alias module:lib/ui/grid
   * @class
   * @extends UIBase
   * @param {Object} context The context.
   * @param {String} key The context item to be updated.
   * @param {String=} content The key to be used when embedding content.
   */
  var Grid = function (context, key, content) {
    Assert.isString(key);

    Grid.superClass.call(this, this.template, context, key);
    this._initContent(content);
  };

  inherit(Grid, UIBase);


  /**
   * Initializes the embedded content if a content key is specified.
   *
   * @method
   * @private
   * @param {String=} content The key to be used when embedding content.
   */
  Grid.prototype._initContent = function (content) {
    var embedFn = this._embedContent;
    
    if (Check.not.isUndefined(content)) {
      Assert.isString(content);
      this.renderer.replaceToken('embed-content', content);

      this.addProperty('embed', function () {
        return function (text, render) {
          return embedFn(render(text));
        };
      });
    }
  };


  /**
   * Can be used to modify the content before it's embedded.
   *
   * @method
   * @private
   * @param {String} input The original content to be embedded.
   * @return {String} Raw HTML.
   */
  Grid.prototype._embedContent = function (input) {
    return input;
  };


  /**
   * Invoked on click and fires a selected event.
   *
   * @method
   * @private
   * @param {DOMNode} target The event's target.
   */
  Grid.prototype._selectItem = function (target) {
    var item = target.getParent();
    var index = item.getSiblingIndex();

    this.fire('selected', {
      item: this._context[this._key][index]
    });
  };


  /* override */
  Grid.prototype.template =
    '{{#@}}' +
      '<div class="ui-grid-item">' +
        '<div class="ui-grid-item-intrinsic">{{#embed}}{{{embed-content}}}{{/embed}}</div>' +
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