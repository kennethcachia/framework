/**
 * @module lib/render/abstract-renderable
 */
define([

  'lib/events/eventable',
  'lib/base/inherit'

], function (Eventable, inherit) {

  /**
   * Implements a basic rendering cycle.
   *
   * @alias module:lib/render/abstract-renderable
   * @class
   * @extends Eventable
   */
  var AbstractRenderable = function () {
    AbstractRenderable.superClass.call(this);
    this._isRendered = false;
  };

  inherit(AbstractRenderable, Eventable);


  /**
   * Triggers the render process and
   * fires an event on completion.
   * 
   * @method
   */
  AbstractRenderable.prototype.render = function () {
    try {
      this._isRendered = true;
      this._render.apply(this, arguments);
      this.fire('rendered');
    } catch (e) {
      this._isRendered = false;
      throw e;
    }
  };


  /**
   * An abstract method that's meant to be
   * implemented by all the subclasses. Should
   * be used to handle local rendering.
   * 
   * @method
   * @abstract
   * @private
   */
  AbstractRenderable.prototype._render = function () {
    throw new Error('_render() not implemented');
  };

  
  /* override */
  AbstractRenderable.prototype.destructor = function () {
    this._isRendered = null;
    AbstractRenderable.super.destructor.call(this);
  };


  return AbstractRenderable;

});