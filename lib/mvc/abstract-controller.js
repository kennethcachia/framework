/**
 * @module lib/mvc/abstract-controller
 */
define([

  'lib/events/eventable',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/render/abstract-renderable',
  'lib/base/object-observer'

], function (Eventable, inherit, Assert, AbstractRenderable, ObjectObserver) {

  /**
   * Renders an AbstractRenderable and keeps
   * it in sync with context changes.
   *
   * @alias module:lib/mvc/abstract-controller
   * @class
   * @extends Eventable
   * @param {AbstractRenderable} renderable The renderable that will
   *                                        be maintained by this controller.
   * @param {Object} context The controller's initial context.
   */
  var AbstractController = function (renderable, context) {
    AbstractController.superClass.call(this);

    Assert.isObject(context);
    this._context = context;

    this._initRenderable(renderable);
    this._initObservers();
    this._update();
  };

  inherit(AbstractController, Eventable);


  /**
   * Updates the context. Triggers a global sync 
   * to keep any other controllers that are
   * sharing the same context in sync.
   * 
   * @method
   * @param {String} key The item to be updated.
   * @parem {*} value The new value.
   */
  AbstractController.prototype.updateContext = function (key, value) {
    Assert.isString(key);

    this._context[key] = value;
    this._contextObserver.globalSync();
  };


  /**
   * Initializes the renderable.
   * 
   * @method
   * @private
   * @param {AbstractRenderable} renderable The renderable.
   */
  AbstractController.prototype._initRenderable = function (renderable) {
    Assert.isInstanceOf(renderable, AbstractRenderable);

    this._renderable = renderable;
    this._renderable.on('destroyed', this.destroy, this);

    this.addObjectToDestroy(this._renderable);
  };


  /**
   * Initializes the object observers.
   * 
   * @method
   * @private
   */
  AbstractController.prototype._initObservers = function () {
    this._renderableObserver = new ObjectObserver(this._renderable);
    this._contextObserver = new ObjectObserver(this._context);

    this._renderableObserver.on('updated', this._render, this);
    this._contextObserver.on('updated', this._update, this);

    this.addObjectToDestroy(this._renderableObserver);
    this.addObjectToDestroy(this._contextObserver);
  };


  /**
   * Called after initialization and each time the
   * context changes. Invokes _update() if any
   * changes are made on the renderable.
   * 
   * @method
   * @private
   */
  AbstractController.prototype._update = function () {
    this._updateRenderable(this._renderable, this._context);
    this._renderableObserver.sync();
  };


  /**
   * Re-renders the renderable.
   * 
   * @method
   * @private
   */
  AbstractController.prototype._render = function () {
    this._renderable.render();
  };


  /**
   * Used to keep the renderable in sync with the
   * current context value. Must be implemented
   * on all subclasses of AbstractContoller.
   * 
   * @method
   * @abstract
   * @private
   * @param {AbstractRenderable} renderable The renderable that's being
   *                                        maintained by this controller.
   * @param {Object} context The current context.
   */
  AbstractController.prototype._updateRenderable = function () {
    throw new Error('_updateRenderable() not implemented');
  };


  /* override */
  AbstractController.prototype.destructor = function () {
    this._renderableObserver = null;
    this._contextObserver = null;

    this._renderable = null;
    this._context = null;

    AbstractController.super.destructor.call(this);
  };


  return AbstractController;

});