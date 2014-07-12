/**
 * @module lib/controller/controller
 */
define([

  'lib/events/eventable',
  'lib/base/inherit',
  'lib/render/abstract-renderable',
  'lib/base/object-observer',
  'lib/dom/node',
  'lib/base/assert',
  'lib/base/check'

], function (Eventable, inherit, AbstractRenderable, ObjectObserver, DOMNode, Assert, Check) {

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

    this._isAttached = false;
    this._properties = {};

    this._initRenderable(renderable);
    this._initContext(context, key);
    this._initObservers();
  };

  inherit(Controller, Eventable);


  /**
   * Syncs the controller. Should be called
   * when the renderable needs to be
   * rendered for the first time.
   *
   * @method
   * @param {DOMNode} host
   *        The host for this controller's renderable.
   */
  Controller.prototype.attach = function (host) {
    if (this._isAttached === false) {
      this._initHost(host);
      this._isAttached = true;
      this._sync();
      this.fire('attached');
    }
  };


  /**
   * Adds an item on the properties object.
   *
   * @method
   * @param {String} key The property name.
   * @param {*} value The property value.
  */
  Controller.prototype.addProperty = function (key, value) {
    Assert.isString(key);
    this._properties[key] = value;
  };


  /**
   * Initializes the internal context.
   *
   * @method
   * @private
   * @param {Object} context
   *        The context passed in via the constructor.
   * @param {String=} key
   *        The context item passed in via the constructor.
   */
  Controller.prototype._initContext = function (context, key) {
    Assert.isObject(context);
    Assert.isNotEmpty(context);

    if (Check.not.isNull(key) && Check.not.isUndefined(key)) {
      Assert.isString(key);

      this._key = key;
      this._renderable.replaceToken('@', this._key);
    }

    this._context = context;
    this._localContext = {};
  };


  /**
   * Initializes the host.
   * 
   * @method
   * @private
   * @param {DOMNode} host The host passed in via attach().
   */
  Controller.prototype._initHost = function (host) {
    Assert.isInstanceOf(host, DOMNode);

    this._host = host;
    this._host.on('destroyed', this.destroy, this);
    this.addObjectToDestroy(host);
  };


  /**
   * Initializes the renderable.
   * 
   * @method
   * @private
   * @param {AbstractRenderable} renderable
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

    this._localObserver.on('updated', this._processLocalChanges, this);
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
   * @param {Boolean} [updateView=true]
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
   * Receives a change summary from the local observer
   * and determines if the renderable needs
   * to re-render.
   *
   * @method
   * @private
   * @param {Array} summary The change summary.
   */
  Controller.prototype._processLocalChanges = function (summary) {
    var isRendered = this._renderable._isRendered;
    var render;

    if (isRendered === false) {
      render = true;
    } else {
      //console.log(this._host._node);
      render = this._affectsRenderable(summary);      
      //console.log(render);
    }

    if (render) {
      this._updateRenderable();
    }
  };


  /**
   * Processes a change summary and determines if
   * any of the changes made affect the renderable.
   *
   * @method
   * @private
   * @param {Array} summary
   *        The change summary to be processed.
   * @returns {Boolean}
   *          True if the renderable needs to be updated.
   */
  Controller.prototype._affectsRenderable = function (summary) {
    var hasChanged = false;

    summary.map(function (current) {
      Object.keys(current).some(function (key) {
        hasChanged = this._renderable.isTokenUsed(key);
        return hasChanged;
      }, this);
    }, this);

    return hasChanged;
  };


  /**
   * Renders the renderable.
   * 
   * @method
   * @private
   */
  Controller.prototype._updateRenderable = function () {
    this._renderable.render(
      this._host, this._context, this._properties);
  };


  /* override */
  Controller.prototype.destructor = function () {
    this._host = null;
    this._isAttached = null;
    this._renderable = null;

    this._properties = null;
    this._context = null;
    this._localContext = null;
    this._key = null;

    this._localObserver = null;
    this._globalObserver = null;

    Controller.super.destructor.call(this);
  };


  return Controller;

});