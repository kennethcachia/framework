/**
 * @module lib/controller/controller
 */
define([

  'lib/events/eventable',
  'lib/base/inherit',
  'lib/render/abstract-renderable',
  'lib/base/object-observer',
  'lib/base/assert',
  'lib/base/check'

], function (Eventable, inherit, AbstractRenderable, ObjectObserver, Assert, Check) {

  /**
   * Maintains a renderable and keeps it 
   * in sync with a given context.
   * 
   * @alias module:lib/controller/controller
   * @class
   * @extends Eventable
   * @param {AbstractRenderable} renderable The renderable.
   * @param {Object} context The context.
   * @param {String=} key The context item to be updated.
   */
  var Controller = function (renderable, context, key) {
    Controller.superClass.call(this);

    this._initRenderable(renderable);
    this._initContext(context, key);
    this._initObservers();

    this._sync();
  };

  inherit(Controller, Eventable);


  /**
   * Initializes the internal context.
   *
   * @method
   * @private
   * @param {Object}
   *        context
   *        The context passed in via the constructor.
   * @param {String=}
   *        key 
   *        The context item passed in via the constructor.
   */
  Controller.prototype._initContext = function (context, key) {
    Assert.isObject(context);

    if (Check.not.isUndefined(key)) {
      Assert.isString(key);
      this._key = key;

      var template = this._renderable._template;
      template = template.replace(/@/g, key);

      this._renderable._template = template;
    }

    this._context = context;
    this._localContext = {};
  };


  /**
   * Initializes the renderable.
   * 
   * @method
   * @private
   * @param {AbstractRenderable}
   *        renderable
   *        The renderable passed in via the constructor.
   */
  Controller.prototype._initRenderable = function (renderable) {
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
  Controller.prototype._initObservers = function () {
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
   * @param {Boolean} 
   *        [updateView=true]
   *        Set to false to skip a re-render.
   */
  Controller.prototype._sync = function (updateView) {
    // TODO: sync is called twice after a globalSync.
    // Double check this is ok.
    // TODO: can this be avoided?
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
  Controller.prototype._updateRenderable = function () {
    console.log('* Render *');
    this._renderable.render(this._context);
  };


  /* override */
  Controller.prototype.destructor = function () {
    this._renderable = null;

    this._context = null;
    this._localContext = null;
    this._key = null;

    this._localObserver = null;
    this._globalObserver = null;

    Controller.super.destructor.call(this);
  };


  return Controller;

});