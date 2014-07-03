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
    this._localContext = {};

    this._initRenderable(renderable);
    this._initObservers();

    this._syncLocalContext();
  };

  inherit(AbstractController, Eventable);


  /**
   * Updates the context. Triggers a global sync 
   * to keep any other controllers that are
   * sharing the same context in sync, but
   * does not update the local context to
   * avoid an unecessary re-render.
   * 
   * @method
   * @param {String} key The item to be updated.
   * @parem {*} value The new value.
   */
  AbstractController.prototype.updateContext = function (key, value) {
    Assert.isString(key);

    this._context[key] = value;
    this._syncLocalContext(true);
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
    this._localObserver = new ObjectObserver(this._localContext);
    this._globalObserver = new ObjectObserver(this._context);

    this._localObserver.on('updated', this._render, this);
    this._globalObserver.on('updated', this._syncLocalContext, this);

    this.addObjectToDestroy(this._localObserver);
    this.addObjectToDestroy(this._globalObserver);
  };


  /**
   * Updates the local context.
   * 
   * @param {Boolean} broadcastChanges If true, the change summary for
   *                                   the local context is not delivered
   *                                   and a re-render is not triggered.
   */
  AbstractController.prototype._syncLocalContext = function (discardChanges) {
    var output = this._updateRenderable(this._context);

    //TODO: can this be avoided?
    for (var key in output) {
      this._localContext[key] = output[key];
    }

    if (discardChanges === true) {
      this._localObserver.discard();
    }

    this._globalObserver.globalSync();
  };


  /**
   * Re-renders the renderable.
   * 
   * @method
   * @private
   */
  AbstractController.prototype._render = function () {
    console.log('render');
    this._renderable.render(this._localContext);
  };


  /**
   * Used to keep the local context in sync with the
   * global context value. Must be implemented
   * on all subclasses of AbstractContoller.
   * 
   * @method
   * @abstract
   * @private
   * @param {Object} context The current global context.
   */
  AbstractController.prototype._updateRenderable = function () {
    throw new Error('_updateRenderable() not implemented');
  };


  /* override */
  AbstractController.prototype.destructor = function () {
    this._localObserver = null;
    this._globalObserver = null;

    this._renderable = null;
    this._context = null;

    AbstractController.super.destructor.call(this);
  };


  return AbstractController;

});