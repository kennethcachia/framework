/**
 * @module lib/ui/abstract-movables-container
 */
define([

  'lib/ui/selectables-container',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check',
  'lib/dom/browser'

], function (SelectablesContainer, inherit, Assert, Check, Browser) {

  /**
   * Transforms all of its child DOMNodes that match
   * a given selector to movable objects. Supports both
   * mouse and touch events.
   * 
   * @alias module:lib/ui/abstract-movables-container
   * @class
   * @extends SelectablesContainer
   * @param {String} movables
   *        The selector a child DOMNode must match in order
   *        to be taken into consideration.
   * @param {String} template The template to compile.
   * @param {Object} context The context.
   * @param {String=} key The context item to be updated.
   */
  var AbstractMovablesContainer = function (movables, template, context, key) {
    AbstractMovablesContainer.superClass.call(
      this, movables, template, context, key);

    this._hasGesture = false;
    this._offset = null;
  };

  inherit(AbstractMovablesContainer, SelectablesContainer);


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


  /* override */
  AbstractMovablesContainer.prototype._onStart = function (domNode, e) {
    AbstractMovablesContainer.super._onStart.call(this, domNode, e);

    var parentRect = domNode.getParent().getRect();
    var rect = domNode.getRect();

    this._offset = {
      x: parentRect.left - ((rect.width / 2) - (e.pageX - rect.left)),
      y: parentRect.top - ((rect.height / 2) - (e.pageY - rect.top))
    };

    this._hasGesture = true;
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
    var hasActiveChild = Check.not.isNull(this._activeChild);

    if (hasActiveChild && this._hasGesture) {
      var isMovable = e.currentTarget !== e.target;

      if (isMovable) {
        var x = e.pageX - this._offset.x;
        var y = e.pageY - this._offset.y;

        this.move(this._activeChild, x, y);
      }
    }
  };


  /**
   * The callback function for the gesture's end event.
   *
   * @method
   * @private
   */
  AbstractMovablesContainer.prototype._onEnd = function () {
    this._hasGesture = false;
    this._offset = null;
  };


  /* override */
  AbstractMovablesContainer.prototype.bindEvents = function () {
    AbstractMovablesContainer.super.bindEvents.call(this);

    this.onDOMEvent(
      Browser.GESTURE_MOVE, this._onMove, this);

    this.onDOMEvent(
      Browser.GESTURE_END, this._onEnd, this);
  };


  return AbstractMovablesContainer;

});