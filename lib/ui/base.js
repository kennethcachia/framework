/**
 * @module lib/ui/base
 */
define([

  'lib/events/eventable',
  'lib/base/inherit',
  'lib/render/abstract-renderable',
  'lib/base/object-observer',
  'lib/base/assert'

], function (Eventable, inherit, AbstractRenderable, ObjectObserver, Assert) {

  /**
   * Implements a base object for UI components.
   * Allows DOM events to be attached to it and 
   * keeps it in sync with a given context.
   * 
   * @alias module:lib/ui/base
   * @class
   * @extends Eventable
   * @params {AbstractRenderable} renderable The renderable.
   * @params {Object} context The context.
   */
  var Base = function (renderable, context) {
    Base.superClass.call(this);

    this._initContext(context);
    this._initRenderable(renderable);
    this._initObservers();

    this._sync();
  };

  inherit(Base, Eventable);


  /**
   * Initializes the internal context.
   *
   * @method
   * @private
   * @param {Object} context The context passed in via
   *                         the constructor.
   */
  Base.prototype._initContext = function (context) {
    Assert.isObject(context);

    this._context = context;
    this._localContext = {};
  };


  /**
   * Initializes the renderable.
   * 
   * @method
   * @private
   * @param {AbstractRenderable} renderable The renderable passed in
   *                                        via the constructor.
   */
  Base.prototype._initRenderable = function (renderable) {
    Assert.isInstanceOf(renderable, AbstractRenderable);

    this._renderable = renderable;
    this._renderable.on('destroyed', this.destroy, this);

    this.addObjectToDestroy(this._renderable);
  };


  /**
   * Initializes the context observers.
   * 
   * @method
   * @private
   */
  Base.prototype._initObservers = function () {
    this._localObserver = new ObjectObserver(this._localContext);
    this._globalObserver = new ObjectObserver(this._context);

    this._localObserver.on('updated', this._updateRenderable, this);
    this._globalObserver.on('updated', this._sync, this);

    this.addObjectToDestroy(this._localObserver);
    this.addObjectToDestroy(this._globalObserver);
  };


  /**
   * Syncs the internal context and re-renders 
   * the renderable unless updateView is false.
   * This method should only be invoked from 
   * within the component.
   *
   * @method
   * @private
   * @param {Boolean} updateView If false, the renderable
   *                             is not be re-rendered.
   */
  Base.prototype._sync = function (updateView) {
    //TODO: can this be avoided?
    for (var key in this._context) {
      this._localContext[key] = this._context[key];
    }

    if (updateView === false) {
      this._localObserver.discard();
    }

    this._globalObserver.globalSync();
  };


  /**
   * Renders the renderable.
   * 
   * @method
   * @private
   */
  Base.prototype._updateRenderable = function () {
    console.log('* Render * ');
    this._renderable.render(this._context);
  };


  /* override */
  Base.prototype.destructor = function () {
    this._renderable = null;
    this._context = null;
    this._localContext = null;

    this._localObserver = null;
    this._globalObserver = null;

    Base.super.destructor.call(this);
  };


  return Base;

});