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
   * @abstract
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

    this._currentPos = null;
  };

  inherit(AbstractMovablesContainer, SelectablesContainer);


  /**
   * Use this method to move the currently active DOMNode.
   * Must be implemented on all subclasses.
   *
   * @method
   * @abstract
   * @param {DOMNode} child The currently active DOMNode.
   * @param {Object} current
   *        The current position {x, y}.
   * @param {Object} delta
   *        The delta from the current value {x, y}.
   */
  AbstractMovablesContainer.prototype.move = function () {
    throw new Error('move() not implemented');  
  };


  /**
   * Keeps track of the current position.
   *
   * @method
   * @private
   * @param {Event} e The event's object.
   */
  AbstractMovablesContainer.prototype._setCurrentPos = function (e) {
    this._currentPos = {
      x: e.clientX,
      y: e.clientY
    };
  };


  /* override */
  AbstractMovablesContainer.prototype._onStart = function (domNode, e) {
    AbstractMovablesContainer.super._onStart.call(this, domNode, e);
    this._setCurrentPos(e);
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
    var hasCurrentPos = Check.not.isNull(this._currentPos);

    if (hasActiveChild && hasCurrentPos) {
      var isMovable = e.currentTarget !== e.target;

      if (isMovable) {
        var delta = {
          x: this._currentPos.x - e.clientX,
          y: this._currentPos.y - e.clientY
        };

        this.move(this._activeChild, this._currentPos, delta);
        this._setCurrentPos(e);
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
    this._currentPos = null;
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