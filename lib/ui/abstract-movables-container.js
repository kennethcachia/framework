/**
 * @module lib/ui/abstract-movables-container
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check',
  'lib/dom/browser'

], function (UIBase, inherit, Assert, Check, Browser) {

  /**
   * Transforms all of its child DOMNodes that match
   * a given selector to movable objects.
   * 
   * @alias module:lib/ui/abstract-movables-container
   * @class
   * @extends UIBase
   * @param {String} movables
   *        The selector a child DOMNode must match in order
   *        to be taken into consideration.
   * @param {String} template The template to compile.
   * @param {Object} context The context.
   * @param {String=} key The context item to be updated.
   */
  var AbstractMovablesContainer = function (movables, template, context, key) {
    Assert.isString(movables);
    AbstractMovablesContainer.superClass.call(this, template, context, key);

    this._reset();
    this._movables = movables;
  };

  inherit(AbstractMovablesContainer, UIBase);


  /**
   * Use this method to move the currently active DOMNode.
   * Must be implemented on all subclasses.
   *
   * @method
   * @abstract
   * @param {DOMNode} child The currently active DOMNode.
   * @param {Integer} x
   *        The DOMNode's x position relative to its parent.
   * @param {Integer} y
   *        The DOMNode's y position relative to its parent.
   */
  AbstractMovablesContainer.prototype.move = function () {
    throw new Error('move() not implemented');  
  };


  /**
   * The callback function for the gesture's start event.
   *
   * @method
   * @private
   * @param {DOMNode} domNode The selected DOMNode.
   * @param {Event} e The event's object.
   */
  AbstractMovablesContainer.prototype._onStart = function (domNode, e) {
    var parentRect = domNode.getParent().getRect();
    var rect = domNode.getRect();

    this._offset = {
      x: parentRect.left - ((rect.width / 2) - (e.pageX - rect.left)),
      y: parentRect.top - ((rect.height / 2) - (e.pageY - rect.top))
    };

    this._activeMovable = domNode;

    this.fire('selected', {
      domNode: domNode
    });
  };


  /**
   * The callback function for the gesture's move event.
   *
   * @method
   * @private
   * @param {DOMNode} domNode The selected DOMNode.
   * @param {Event} e The event's object.
   */
  AbstractMovablesContainer.prototype._onMove = function (domNode, e) {
    var isMovable = e.currentTarget !== e.target;

    if (Check.not.isNull(this._activeMovable) && isMovable) {
      var x = e.pageX - this._offset.x;
      var y = e.pageY - this._offset.y;

      this.move(this._activeMovable, x, y);
    }
  };


  /**
   * The callback function for the gesture's end event.
   *
   * @method
   * @private
   */
  AbstractMovablesContainer.prototype._onEnd = function () {
    this._reset();
    this.fire('deselected');
  };


  /**
   * Resets internal variables.
   *
   * @method
   * @private
   */
  AbstractMovablesContainer.prototype._reset = function () {
    this._offset = null;
    this._activeMovable = null;
  };


  /* override */
  AbstractMovablesContainer.prototype.bindEvents = function () {
    AbstractMovablesContainer.super.bindEvents.call(this);

    this.onDOMEvent(
      Browser.GESTURE_START, this._onStart, this, this._movables);

    this.onDOMEvent(
      Browser.GESTURE_MOVE, this._onMove, this);

    this.onDOMEvent(
      Browser.GESTURE_END, this._onEnd, this);
  };


  /* override */
  AbstractMovablesContainer.prototype.destructor = function () {
    this._reset();
    this._movables = null;

    AbstractMovablesContainer.super.destructor.call(this);
  };


  return AbstractMovablesContainer;

});