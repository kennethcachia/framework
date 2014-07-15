/**
 * @module lib/ui/base
 */
define([

  'lib/controller/controller',
  'lib/base/inherit',
  'lib/render/template-renderer',
  'lib/dom/cache',
  'lib/dom/events',
  'lib/base/properties',
  'lib/base/assert',
  'lib/base/check'

], function (Controller, inherit, TemplateRenderer, DOMCache, DOMEvents, Properties, Assert, Check) {

  // TODO: make template and hiddenClass private?
  // TODO: is template via the constructor necessary?

  /**
   * A base object for UI components.
   * 
   * @alias module:lib/ui/base
   * @class
   * @extends Controller
   * @param {String} template The template to compile.
   * @param {Object} context The context.
   * @param {String=} key The context item to be updated.
   */
  var UIBase = function (template, context, key) {
    Properties.defineImmutableProperty(
      this, 'template', template);

    Properties.defineImmutableProperty(
      this, 'renderer', new TemplateRenderer(template));

    Properties.defineImmutableProperty(
      this, 'className', this.className);

    Properties.defineImmutableProperty(
      this, 'hiddenClass', this.hiddenClass);

    UIBase.superClass.call(this, this.renderer, context, key);

    this._childrenToAttach = [];
    this._attachedChildren = [];
    this._cache = null;
    this._domEvents = null;

    this.renderer.before('rendered', this._addClassNames, this);
    this.after('attached', this._afterAttached, this);
  };

  inherit(UIBase, Controller);


  /**
   * @readOnly
   * @property {String} template
   *           The template to compile.
   */
  UIBase.prototype.template = null;


  /**
   * @readOnly
   * @property {TemplateRenderer} renderer
   *           The TemplateRenderer used by this component.
   */
  UIBase.prototype.renderer = null;


  /**
   * @readOnly
   * @default ui
   * @property {String} className
   *           The className added on the component's host.
   */
  UIBase.prototype.className = null;


  /**
   * @default
   * @readOnly
   * @property {String} hiddenClass 
   *           The class added to the host when hidden.
   */
  UIBase.prototype.hiddenClass = 'ui-hidden';


  /**
   * Attaches a child to itself if it is
   * already attached, or waits until it's
   * attached first.
   * 
   * @method
   * @param {Function} ctor The child's constructor.
   * @param {String} selector
   *        The selector used when constructing the child's host.
   *        Must be a child node of this component.
   * @param {*} arguments
   *        A set of arguments to be used at initialization.
   * @throws Will throw an error if the component uses tokens
   *         in it's template (current limitation).
   */
  UIBase.prototype.attachChild = function () {
    Assert.isTruthy(!this.renderer.hasTokens());

    this._childrenToAttach.push(arguments);

    if (this._isAttached) {
      this._attachChild(arguments);
    }
  };


  /**
   * An optional method that can be used to
   * register DOM events. It's called after
   * the component is attached.
   * 
   * @method
   */
  UIBase.prototype.bindEvents = function () {};


  /**
   * Adds the hidden class to the host.
   *
   * @method
   */
  UIBase.prototype.hide = function () {
    Assert.isTruthy(this._isAttached);
    this._host.addClass(this.hiddenClass);
  };


  /**
   * Removes the hidden class from the host.
   *
   * @method
   */
  UIBase.prototype.show = function () {
    Assert.isTruthy(this._isAttached);
    this._host.removeClass(this.hiddenClass);
  };


  /**
   * Searches for DOMNodes within the
   * component's host.
   *
   * @method
   * @private
   * @param {String} selector The selector.
   * @returns {DOMNode|Array}
   *          A DOMNode or an array of DOMNodes.
   */
  UIBase.prototype.findDOMNodes = function (selector) {
    return this._cache.find(selector);
  };


  /**
   * Adds a new event listener to the component's host.
   * Alternatively, events can be delegated to the
   * host if a selector is specified.
   *
   * @method
   * @param {String} eventName The event to listen for.
   * @param {Function} callback The event's callback function.
   * @param {Object} context
   *        The context applied to the callback function when invoked.
   * @param {String=} selector
   *        If specified, the callback function will only be invoked
   *        if the event's target matches this selector.
   */
  UIBase.prototype.onDOMEvent = function (eventName, callback, context, selector) {
    this._domEvents.add(eventName, callback, context, selector);
  };


  /**
   * Adds ui specific classes to the host.
   *
   * @method
   * @private
   */
  UIBase.prototype._addClassNames = function () {
    if (Check.isString(this.className)) {
      this._host.addClass(this.className);
    }

    this._host.addClass('ui');
  };


  /**
   * Attaches all the children, invokes bindEvents()
   * and fires a ready event.
   *
   * @method
   * @private
   */
  UIBase.prototype._afterAttached = function () {
    this._attachChildren();

    this._cache = new DOMCache(this._host);
    this.addObjectToDestroy(this._cache);

    this._domEvents = new DOMEvents(this._host);
    this.addObjectToDestroy(this._domEvents);

    this.bindEvents();
    this.fire('ready');
  };


  /**
   * Invoked after this component is attached
   * and attaches all of it's children.
   * 
   * @method
   * @private
   */
  UIBase.prototype._attachChildren = function () {
    this._childrenToAttach.forEach(
      this._attachChild, this);
  };


  /**
   * Attaches a single child to itself.
   * 
   * @method
   * @private
   * @param {Array} args
   *        A set of arguments to be used at initialization.
   */
  UIBase.prototype._attachChild = function (args) {
    var Ctor = args[0];
    var selector = args[1];

    Assert.isFunction(Ctor);
    Assert.isString(selector);
    Assert.isTruthy(args.length <= 10);

    var child = new Ctor(args[2], args[3], args[4],
      args[5], args[6], args[7], args[8], args[9]);

    child.attach(this._host.one(selector));

    this._attachedChildren.push(child);

    this.addObjectToDestroy(child);
  };


  /* override */
  UIBase.prototype.destructor = function () {
    this.template = null;
    this.renderer = null;
    this.className = null;
    this.hiddenClass = null;

    this._childrenToAttach = null;
    this._attachedChildren = null;

    this._cache = null;
    this._domEvents = null;

    UIBase.super.destructor.call(this);
  };


  return UIBase;

});